import Pusher from 'pusher-js';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actionTypes as tabsActionTypes } from '@bufferapp/publish-tabs/reducer';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue/reducer';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts/reducer';
import { actionTypes as storiesActionTypes } from '@bufferapp/publish-stories/reducer';
import { postParser, storyGroupParser } from '@bufferapp/publish-server/parsers/src';

const PUSHER_APP_KEY = 'bd9ba9324ece3341976e';

const profileEventActionMap = {
  sent_update: queueActionTypes.POST_SENT,
  updated_update: queueActionTypes.POST_UPDATED,
};

const bindProfileUpdateEvents = (channel, profileId, dispatch) => {
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

const bindProfileStoryGroupEvents = (channel, profileId, dispatch) => {
  channel.bind('sent_story_group', (data) => {
    dispatch({
      type: storiesActionTypes.STORY_SENT,
      profileId,
      storyGroup: storyGroupParser(data.story_group),
    });
  });
};

export default ({ dispatch }) => {
  const pusher = new Pusher(PUSHER_APP_KEY, { authEndpoint: '/pusher/auth' });
  window.__pusher = pusher;
  const channelsByProfileId = {};

  return next => (action) => {
    next(action);
    if (action.type === tabsActionTypes.SELECT_TAB) {
      const { profileId, tabId } = action;
      if (profileId) {
        if (!channelsByProfileId[profileId]) {
          channelsByProfileId[profileId] = {
            updates: pusher.subscribe(`private-updates-${profileId}`),
            storyGroups: pusher.subscribe(`private-story-groups-${profileId}`),
          };
          bindProfileUpdateEvents(channelsByProfileId[profileId].updates, profileId, dispatch);
          if (tabId === 'stories') {
            bindProfileStoryGroupEvents(channelsByProfileId[profileId].storyGroups, profileId, dispatch);
          }
        }
      }
    }
  };
};
