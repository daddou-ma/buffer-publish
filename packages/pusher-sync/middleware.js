import Pusher from 'pusher-js';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';
import { postParser } from '@bufferapp/publish-server/parsers/src';

const PUSHER_APP_KEY = 'bd9ba9324ece3341976e';

const profileEventActionMap = {
  sent_update: queueActionTypes.POST_SENT,
  updated_update: queueActionTypes.POST_UPDATED,
};

const bindProfileEvents = (channel, profileId, dispatch) => {
  // Bind post related events
  Object.entries(profileEventActionMap).forEach(([pusherEvent, actionType]) => {
    channel.bind(pusherEvent, (data) => {
      dispatch({
        type: actionType,
        profileId,
        post: postParser(data.update),
      });
    });
  });
  // Bind added update events, both for posts and drafts
  channel.bind('added_update', (data) => {
    if (data.update.draft) {
      dispatch({
        type: draftActionTypes.DRAFT_CREATED,
        profileId,
        draft: postParser(data.update),
      });
    } else {
      dispatch({
        type: queueActionTypes.POST_CREATED,
        profileId,
        post: postParser(data.update),
      });
    }
  });
  // Bind deleted update events, both for posts and drafts
  channel.bind('deleted_update', (data) => {
    if (data.update.draft) {
      dispatch({
        type: draftActionTypes.DRAFT_DELETED,
        profileId,
        draft: postParser(data.update),
      });
    } else {
      dispatch({
        type: queueActionTypes.POST_DELETED,
        profileId,
        post: postParser(data.update),
      });
    }
  });
  // Bind approved drafts event
  channel.bind('collaboration_draft_approved', (data) => {
    dispatch({
      type: draftActionTypes.DRAFT_APPROVED,
      profileId,
      draft: postParser(data.draft),
    });
  });
  // Bind updated/ moved drafts event
  channel.bind('collaboration_draft_updated', (data) => {
    dispatch({
      type: draftActionTypes.DRAFT_UPDATED,
      profileId,
      draft: postParser(data.draft),
    });
  });
  // Bind other events
  channel.bind('reordered_updates', (order) => {
    dispatch({
      type: queueActionTypes.REORDERED_UPDATES,
      profileId,
      order,
    });
  });
  channel.bind('queue_paused', (paused) => {
    dispatch({
      type: profileSidebarActionTypes.PUSHER_PROFILE_PAUSED_STATE,
      paused,
      profileId,
    });
  });
};

export default ({ dispatch }) => {
  const pusher = new Pusher(PUSHER_APP_KEY, { authEndpoint: '/pusher/auth' });
  window.__pusher = pusher;
  const channelsByProfileId = {};

  return next => (action) => {
    next(action);
    if (action.type === profileSidebarActionTypes.SELECT_PROFILE) {
      const { profileId } = action;
      if (profileId) {
        if (!channelsByProfileId[profileId]) {
          const channelName = `private-updates-${profileId}`;
          channelsByProfileId[profileId] = pusher.subscribe(channelName);
          bindProfileEvents(channelsByProfileId[profileId], profileId, dispatch);
        }
      }
    }
  };
};
