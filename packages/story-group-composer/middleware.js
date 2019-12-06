import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import cloneDeep from 'lodash.clonedeep';
import { actions as notificationActions } from '@bufferapp/notifications';
import {
  actions as storiesActions,
  actionTypes as storiesActionTypes,
} from '@bufferapp/publish-stories/reducer';
import {
  actions as remindersActions,
  actionTypes as remindersActionTypes,
} from '@bufferapp/publish-past-reminders/reducer';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import {
  dragged,
  nonConfirmingImageUploaded,
} from '@bufferapp/publish-analytics-middleware/transformers/publish/story';
import getCtaProperties from '@bufferapp/publish-analytics-middleware/utils/CtaStrings';
import { formatShareDate } from '@bufferapp/publish-composer/composer/utils/TrackingUtils';
import getAspectRatio, {
  InstagramStoriesAspectRatios,
} from './utils/aspectRatioFinder';
import {
  getSGTrackingData,
  getStory,
  getNoteTrackingData,
} from './utils/Tracking';
import { actionTypes, actions } from './reducer';

const refreshStoryGroups = (dispatch, selectedProfileId) => {
  dispatch(
    dataFetchActions.fetch({
      name: 'getStoryGroups',
      profileId: selectedProfileId,
      isFetchingMore: false,
    })
  );
};

const getTrackingDataForOpenComposer = ({ channel = {} }) => ({
  channel: channel.service,
  channelId: channel.id,
  channelServiceId: channel.serviceId,
  clientName: 'publishWeb',
  clientId: null,
});

const shouldTrackAspectRatio = aspectRatio => {
  return InstagramStoriesAspectRatios.indexOf(aspectRatio) <= 0;
};

export const createImageStory = story => {
  const { _id, note, order, type, asset_url, thumbnail_url } = story;
  return {
    _id,
    note,
    order,
    type,
    asset_url,
    thumbnail_url,
  };
};

export const createVideoStory = story => {
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

const setStoryGroup = ({ editingStoryGroup, dispatch }) => {
  if (editingStoryGroup) {
    dispatch(
      actions.setStoryGroup({
        stories: editingStoryGroup.storyDetails.stories,
        storyGroupId: editingStoryGroup.id,
        scheduledAt: editingStoryGroup.scheduledAt,
        isPastDue: editingStoryGroup.isPastDue,
      })
    );
  }
};

export const getMappedStories = story => {
  if (story.type === 'video') return createVideoStory(story);
  return createImageStory(story);
};

export default ({ getState, dispatch }) => next => action => {
  next(action);
  const state = getState();
  const { selectedProfileId } = state.profileSidebar;
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      const { stories } = state.storyGroupComposer.storyGroup;
      const sendStories = stories.map(getMappedStories);
      const { scheduledAt, shareNow } = action;
      if (scheduledAt || shareNow) {
        dispatch(
          dataFetchActions.fetch({
            name: 'createStoryGroup',
            args: {
              profileId: selectedProfileId,
              scheduledAt,
              shareNow,
              stories: sendStories,
            },
          })
        );
      }
      break;
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      const { stories } = state.storyGroupComposer.storyGroup;
      const { storyGroupId } = state.storyGroupComposer.storyGroup;
      const { scheduledAt, shareNow } = action;
      dispatch(
        dataFetchActions.fetch({
          name: 'updateStoryGroup',
          args: {
            profileId: selectedProfileId,
            scheduledAt,
            storyGroupId,
            shareNow,
            stories,
          },
        })
      );
      break;
    }
    case `createStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      break;
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
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
      dispatch(remindersActions.handleCloseStoriesComposer());
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Great! This story has been added to your queue.',
        })
      );
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
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Great! This story has been updated.',
        })
      );
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
      const editingStoryGroup = cloneDeep(
        currentProfile.storyPosts[editingPostId]
      );
      setStoryGroup({ editingStoryGroup, dispatch });
      const channel = getState().profileSidebar.selectedProfile;
      const metadata = getTrackingDataForOpenComposer({ channel });
      dispatch(
        analyticsActions.trackEvent('Story Group Composer Opened', metadata)
      );
      break;
    }
    case remindersActionTypes.OPEN_STORIES_COMPOSER: {
      const currentProfile = state.pastReminders.byProfileId[selectedProfileId];
      const { editingPostId } = state.pastReminders;
      const editingStoryGroup = cloneDeep(currentProfile.posts[editingPostId]);
      setStoryGroup({ editingStoryGroup, dispatch });
      break;
    }
    case actionTypes.TRACK_DRAG_AND_DROP_STORY: {
      if (selectedProfileId) {
        const currentProfile =
          state.profileSidebar && state.profileSidebar.selectedProfile;
        if (currentProfile) {
          const metadata = dragged({
            channel: currentProfile.service,
            channelId: currentProfile.id,
            channelServiceId: currentProfile.serviceId,
          });
          dispatch(analyticsActions.trackEvent('Story Dragged', metadata));
        }
      }
      break;
    }
    case actionTypes.TRACK_NON_CONFORMING_IMAGE_UPLOADED_STORY: {
      if (selectedProfileId) {
        const currentProfile =
          state.profileSidebar && state.profileSidebar.selectedProfile;
        const imageAspectRatio = getAspectRatio(action.args);
        if (currentProfile && shouldTrackAspectRatio(imageAspectRatio)) {
          const ctaProperties = getCtaProperties(action.args.cta);
          const currentStoriesProfile =
            state.stories.byProfileId[selectedProfileId];
          const { editingPostId } = state.stories;
          const editingStoryGroup =
            currentStoriesProfile.storyPosts[editingPostId];

          const { scheduledAt } = editingStoryGroup || {};

          const metadata = nonConfirmingImageUploaded({
            storyGroupId: editingStoryGroup ? editingPostId : null,
            channel: currentProfile.service,
            channelId: currentProfile.id,
            channelServiceId: currentProfile.serviceId,
            scheduledAt: formatShareDate(scheduledAt),
            imageAspectRatio,
            ...ctaProperties,
          });

          dispatch(
            analyticsActions.trackEvent(
              'Story Nonconforming Image Uploaded',
              metadata
            )
          );
        }
      }
      break;
    }
    case actionTypes.TRACK_NOTE: {
      const { storyGroup } = state.storyGroupComposer;
      const { cta, note, order } = action;
      const story = getStory({ stories: storyGroup.stories, order }) || {};
      if (!story.note || story.note.length === 0) {
        const channel = state.profileSidebar.selectedProfile;
        const metadata = getNoteTrackingData({
          storyGroupId: storyGroup.id,
          channel,
          note,
          cta,
        });
        dispatch(analyticsActions.trackEvent('Story Note Added', metadata));
      }
      break;
    }
    default:
      break;
  }
};
