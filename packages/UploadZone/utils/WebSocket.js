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
import { AppEnvironments, PUSHER } from '@bufferapp/publish-constants';

class WebSocket {
  eventHandlers = [];

  hasWebSocketConnectionOpen = false;

  init = ({ userId, notifiers, appEnvironment }) => {
    this.rebind({ userId, notifiers, appEnvironment: false });
  };

  configureEventHandlers = notifiers => {
    const handleTranscodedVideo = data => {
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

    const handleCreatedProfileGroup = ({
      id,
      name,
      profile_ids: profileIds,
    }) => {
      notifiers.profileGroupCreated({
        id,
        name,
        profileIds,
      });
    };

    const handleEditedProfileGroup = ({
      id,
      name,
      profile_ids: profileIds,
    }) => {
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

    return new Map([
      ['transcode_done', handleTranscodedVideo],
      ['created_profile_group', handleCreatedProfileGroup],
      ['edited_profile_group', handleEditedProfileGroup],
      ['deleted_profile_group', handleDeletedProfileGroup],
    ]);
  };

  rebind = ({ userId, notifiers, appEnvironment }) => {
    if (this.hasWebSocketConnectionOpen) {
      this.cleanUp(appEnvironment);
    }
    this.bind({ userId, notifiers });
  };

  bind = ({ userId, notifiers }) => {
    this.eventHandlers = this.configureEventHandlers(notifiers);
    let { pusher } = this;

    if (!pusher) {
      Pusher.channel_auth_endpoint = PUSHER.AUTH_ENDPOINT;
      pusher = new Pusher(PUSHER.API_KEY, {
        cluster: PUSHER.CLUSTER,
      });

      this.pusher = pusher;
    }

    const pusherInstance = pusher.subscribe(`private-updates-${userId}`);
    this.eventHandlers.forEach((handler, event) =>
      pusherInstance.bind(event, handler)
    );
    this.hasWebSocketConnectionOpen = true;
  };

  cleanUp = appEnvironment => {
    const isDashboardEnv = appEnvironment === AppEnvironments.WEB_DASHBOARD;
    let pusherInstance;

    if (isDashboardEnv) {
      if (InternalPusher && InternalPusher.instances) {
        [pusherInstance] = InternalPusher.instances;
      }
    } else {
      pusherInstance = window.__pusher;
    }

    if (pusherInstance && this.eventHandlers) {
      this.eventHandlers.forEach((handler, event) =>
        pusherInstance.unbind(event, handler)
      );
    }
  };
}

// Making this class available as a singleton
const websocket = new WebSocket();

export default websocket;
