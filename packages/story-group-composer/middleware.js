import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import cloneDeep from 'lodash.clonedeep';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as storiesActions, actionTypes as storiesActionTypes } from '@bufferapp/publish-stories/reducer';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES, SEGMENT_TRACKING } from '@bufferapp/publish-constants';
import { dragged } from '@bufferapp/publish-analytics-middleware/transformers/publish/story';
import getSGTrackingData from './utils/Tracking';
import { actionTypes, actions } from './reducer';

const refreshStoryGroups = (dispatch, selectedProfileId) => {
  dispatch(dataFetchActions.fetch({
    name: 'getStoryGroups',
    profileId: selectedProfileId,
    isFetchingMore: false,
  }));
};

const createImageStory = (story) => {
  const {
    _id,
    note,
    order,
    type,
    asset_url,
    thumbnail_url,
  } = story;
  return {
    _id,
    note,
    order,
    type,
    asset_url,
    thumbnail_url,
  };
};

const createVideoStory = (story) => {
  const {
    _id,
    note,
    order,
    type,
    asset_url,
    thumbnail_url,
    upload_id,
    duration_ms,
    file_size,
    width,
    height,
  } = story;
  return {
    _id,
    note,
    order,
    type,
    asset_url,
    thumbnail_url,
    upload_id,
    duration_ms,
    file_size,
    width,
    height,
  };
};

const getMappedStories = (story) => {
  if (story.type === 'video') return createVideoStory(story);
  return createImageStory(story);
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  const state = getState();
  const { selectedProfileId } = state.profileSidebar;
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      const { stories } = state.storyGroupComposer.storyGroup;
      const sendStories = stories.map(getMappedStories);
      const { scheduledAt } = action;
      if (scheduledAt) {
        dispatch(dataFetchActions.fetch({
          name: 'createStoryGroup',
          args: {
            profileId: selectedProfileId,
            scheduledAt,
            stories: sendStories,
          },
        }));
      }
      break;
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      const { stories } = state.storyGroupComposer.storyGroup;
      const { storyGroupId } = state.storyGroupComposer.storyGroup;
      dispatch(dataFetchActions.fetch({
        name: 'updateStoryGroup',
        args: {
          profileId: selectedProfileId,
          scheduledAt: action.scheduledAt,
          storyGroupId,
          stories,
        },
      }));
      break;
    }
    case `createStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { storyGroup } = action.result;
      const channel = state.profileSidebar.selectedProfile;
      const metadata = getSGTrackingData({
        storyGroup,
        channel,
        cta: SEGMENT_NAMES.STORIES_CREATE_STORY_GROUP,
      });
      /* Future TO-DO: look into refactoring this tracking to the back-end */
      dispatch(analyticsActions.trackEvent('Story Group Created', metadata));
      dispatch(actions.resetStoryGroupState());
      dispatch(storiesActions.handleCloseStoriesComposer());
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Great! This story has been added to your queue.',
      }));
      break;
    }
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { storyGroup } = action.result;
      const channel = state.profileSidebar.selectedProfile;
      const metadata = getSGTrackingData({
        storyGroup,
        channel,
        cta: SEGMENT_NAMES.STORIES_UPDATE_STORY_GROUP,
      });
      /* Future TO-DO: look into refactoring this tracking to the back-end */
      dispatch(analyticsActions.trackEvent('Story Group Updated', metadata));
      dispatch(actions.resetStoryGroupState());
      dispatch(storiesActions.handleCloseStoriesComposer());
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Great! This story has been updated.',
      }));
      break;
    }
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (selectedProfileId) {
        refreshStoryGroups(dispatch, selectedProfileId);
      }
      break;
    case storiesActionTypes.OPEN_STORIES_COMPOSER: {
      const currentProfile = state.stories.byProfileId[selectedProfileId];
      const { editingPostId } = state.stories;
      const editingStoryGroup = cloneDeep(currentProfile.storyPosts[editingPostId]);
      if (editingStoryGroup) {
        dispatch(actions.setStoryGroup({
          stories: editingStoryGroup.storyDetails.stories,
          storyGroupId: editingStoryGroup.id,
          scheduledAt: editingStoryGroup.scheduledAt,
        }));
      }
      break;
    }
    case actionTypes.TRACK_DRAG_AND_DROP_STORY:
      if (selectedProfileId) {
        const state = getState();
        const currentProfile = state.profileSidebar && state.profileSidebar.selectedProfile;
        if (currentProfile) {
          const metadata = dragged({
            channel: currentProfile.service,
            channelId: currentProfile.id,
            channelServiceId: currentProfile.serviceId,
            clientName: SEGMENT_TRACKING.TRACKING_CLIENT_NAME,
          });
          dispatch(analyticsActions.trackEvent('Story Dragged', metadata));
        }
      }
    default:
      break;
  }
};
