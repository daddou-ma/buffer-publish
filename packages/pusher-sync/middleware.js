import Pusher from 'pusher-js';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue/reducer';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts/reducer';
import { actionTypes as storiesActionTypes } from '@bufferapp/publish-stories/reducer';
import {
  postParser,
  storyGroupParser,
} from '@bufferapp/publish-server/parsers/src';

const {
  POST_SENT,
  POST_UPDATED,
  POST_CREATED,
  POST_DELETED,
  REORDERED_UPDATES,
} = queueActionTypes;
const {
  DRAFT_APPROVED,
  DRAFT_UPDATED,
  DRAFT_CREATED,
  DRAFT_DELETED,
  DRAFT_MOVED,
} = draftActionTypes;
const {
  PUSHER_PROFILE_PAUSED_STATE,
  SELECT_PROFILE,
} = profileSidebarActionTypes;
const {
  STORY_DELETED,
  STORY_SENT,
  STORY_CREATED,
  STORY_UPDATED,
} = storiesActionTypes;

const PUSHER_APP_KEY = 'bd9ba9324ece3341976e';

function updatePostAction(dispatch, pusherEvent, profileId, type) {
  return data => {
    dispatch({
      type,
      profileId,
      post: postParser(data.update),
    });
  };
}

function updateDraftAction(dispatch, pusherEvent, profileId, type) {
  return data => {
    dispatch({
      type,
      profileId,
      draft: postParser(data.draft),
    });
  };
}

function updateOrDraftAction(dispatch, pusherEvent, profileId, draft, post) {
  const draftFn = updateDraftAction(dispatch, pusherEvent, profileId, draft);
  const postFn = updatePostAction(dispatch, pusherEvent, profileId, post);
  return data => {
    if (data.update.draft) {
      draftFn({ draft: data.update });
    } else {
      postFn(data);
    }
  };
}

function reorderUpdates(dispatch, pusherEvent, profileId, type) {
  return order => {
    dispatch({
      type,
      profileId,
      order,
    });
  };
}
function pauseQueue(dispatch, pusherEvent, profileId, type) {
  return paused => {
    dispatch({
      type,
      paused,
      profileId,
    });
  };
}

function sentStoryGroupUpdate(dispatch, pusherEvent, profileId, type) {
  return data => {
    dispatch({
      type,
      profileId,
      storyGroup: storyGroupParser(data.story_group),
    });
  };
}

function deleteStoryGroupUpdate(dispatch, pusherEvent, profileId, type) {
  return data => {
    dispatch({
      type,
      profileId,
      storyGroupId: data.story_group_id,
    });
  };
}

const storyGroupActionMap = [
  [sentStoryGroupUpdate, 'sent_story_group', STORY_SENT],
  [sentStoryGroupUpdate, 'story_group_created', STORY_CREATED],
  [sentStoryGroupUpdate, 'story_group_updated', STORY_UPDATED],
  [deleteStoryGroupUpdate, 'story_group_deleted', STORY_DELETED],
];

const profileEventActionMap = [
  [updatePostAction, 'sent_update', POST_SENT],
  [updatePostAction, 'updated_update', POST_UPDATED],
  [updateOrDraftAction, 'added_update', DRAFT_CREATED, POST_CREATED],
  [updateOrDraftAction, 'deleted_update', DRAFT_DELETED, POST_DELETED],
  [updateDraftAction, 'collaboration_draft_approved', DRAFT_APPROVED],
  [updateDraftAction, 'collaboration_draft_updated', DRAFT_UPDATED],
  [updateDraftAction, 'collaboration_draft_moved', DRAFT_MOVED],
  [reorderUpdates, 'reordered_updates', REORDERED_UPDATES],
  [pauseQueue, 'queue_paused', PUSHER_PROFILE_PAUSED_STATE],
];

const bindPusherEvents = (events, channel, profileId, dispatch) => {
  events.forEach(([fn, pusherEvent, ...types]) => {
    channel.bind(pusherEvent, fn(dispatch, pusherEvent, profileId, ...types));
  });
};

export default ({ dispatch }) => {
  const pusher = new Pusher(PUSHER_APP_KEY, { authEndpoint: '/pusher/auth' });
  window.__pusher = pusher;
  const channelsByProfileId = {};

  return next => action => {
    next(action);
    if (action.type === SELECT_PROFILE) {
      const { profileId } = action;
      const { service } = action.profile;
      if (profileId) {
        // If the profile is not subscribed to any channels, subscribes to private-updates channel:
        if (typeof channelsByProfileId[profileId] === 'undefined') {
          const newProfileChannels = {
            updates: pusher.subscribe(`private-updates-${profileId}`),
          };
          // If instagram profile and profile is not subscribed to story-groups channel, subscribes to private-story-groups channel:
          if (
            service === 'instagram' &&
            newProfileChannels.storyGroups === undefined
          ) {
            newProfileChannels.storyGroups = pusher.subscribe(
              `private-story-groups-${profileId}`
            );
          }
          channelsByProfileId[profileId] = newProfileChannels;

          bindPusherEvents(
            profileEventActionMap,
            channelsByProfileId[profileId].updates,
            profileId,
            dispatch
          );

          if (channelsByProfileId[profileId].storyGroups) {
            bindPusherEvents(
              storyGroupActionMap,
              channelsByProfileId[profileId].storyGroups,
              profileId,
              dispatch
            );
          }
        }
      }
    }
  };
};
