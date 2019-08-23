/* global Pusher */
/**
 * Scrape urls to retrieve information about them.
 *
 * Returns a Promise that resolves with the JSON response from WebSocket.url as
 * an object literal.
 *
 * Results are cached, and a same request done simultaneously will be
 * queued to return the same info as the already-running request.
 */

import InternalPusher from 'pusher-js';
import { AppEnvironments } from '@bufferapp/publish-constants';

class WebSocket {
  static PUSHER_API_KEY = 'bd9ba9324ece3341976e';
  static PUSHER_CLUSTER = 'mt1';
  static PUSHER_AUTH_ENDPOINT = '/pusher_receiver/auth';

  static init = (() => {
    let hasWebSocketConnectionOpen = false; // Only one connection's necessary

    return ({ userId, notifiers }) => {
      if (hasWebSocketConnectionOpen) return;

      const handleTranscodedVideo = (data) => {
        notifiers.videoProcessed({
          uploadId: data.upload_id,
          name: data.media.video.title,
          duration: data.media.video.details.duration,
          durationMs: data.media.video.details.duration_millis,
          size: data.media.video.details.file_size,
          width: data.media.video.details.width,
          height: data.media.video.details.height,
          url: data.media.video.details.transcoded_location,
          originalUrl: data.media.video.details.location,
          thumbnail: data.media.thumbnail,
          availableThumbnails: data.media.video.thumbnails,
        });
      };

      const handleCreatedProfileGroup = ({ id, name, profile_ids: profileIds }) => {
        notifiers.profileGroupCreated({
          id,
          name,
          profileIds,
        });
      };

      const handleEditedProfileGroup = ({ id, name, profile_ids: profileIds }) => {
        notifiers.profileGroupUpdated({
          id,
          name,
          profileIds,
        });
      };

      const handleDeletedProfileGroup = ({ id }) => {
        notifiers.profileGroupDeleted({
          id,
        });
      };

      const eventHandlers = new Map([
        ['transcode_done', handleTranscodedVideo],
        ['created_profile_group', handleCreatedProfileGroup],
        ['edited_profile_group', handleEditedProfileGroup],
        ['deleted_profile_group', handleDeletedProfileGroup],
      ]);

      Pusher.channel_auth_endpoint = WebSocket.PUSHER_AUTH_ENDPOINT;
      const pusher = new Pusher(WebSocket.PUSHER_API_KEY, {
        cluster: WebSocket.PUSHER_CLUSTER,
      });
      const pusherInstance = pusher.subscribe(`private-updates-${userId}`);
      eventHandlers.forEach((handler, event) => pusherInstance.bind(event, handler));
      hasWebSocketConnectionOpen = true;
    };
  })();

  static cleanUp = (appEnvironment) => {
    const isDashboardEnv = appEnvironment === AppEnvironments.WEB_DASHBOARD;
    let pusherInstance;

    if (isDashboardEnv) {
      pusherInstance = InternalPusher.instances[0];
    } else {
      pusherInstance = window.__pusher;
    }

    if (pusherInstance) {
      eventHandlers.forEach((handler, event) => pusherInstance.unbind(event, handler));
    }
  };
}

export default WebSocket;
