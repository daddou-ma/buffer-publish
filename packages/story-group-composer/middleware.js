import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as storiesActions } from '@bufferapp/publish-stories';
import { actionTypes, actions } from './reducer';

const refreshStoryGroups = (dispatch, selectedProfileId) => {
  dispatch(dataFetchActions.fetch({
    name: 'getStoryGroups',
    profileId: selectedProfileId,
  }));
};

export default ({ getState, dispatch }) => next => (action) => {
  next(action);
  const { selectedProfileId } = getState().profileSidebar;
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      const { stories } = getState().storyGroupComposer.draft;
      const { scheduledAt } = action;
      if (scheduledAt) {
        dispatch(dataFetchActions.fetch({
          name: 'createStoryGroup',
          args: {
            profileId: selectedProfileId,
            scheduledAt,
            stories,
          },
        }));
      }
      break;
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      const { stories, storyGroupId } = getState().storyGroupComposer.draft;
      dispatch(dataFetchActions.fetch({
        name: 'updateStoryGroup',
        args: {
          profileId: selectedProfileId,
          scheduledAt: action.scheduledAt,
          stories,
          storyGroupId,
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
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(storiesActions.handleCloseStoriesComposer());
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Great! This story has been added to your queue.',
      }));
      break;
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(actions.setScheduleLoading(false));
      dispatch(storiesActions.handleCloseStoriesComposer());
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Great! This story has been updated.',
      }));
      break;
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
      if (selectedProfileId) {
        refreshStoryGroups(dispatch, selectedProfileId);
      }
      break;
    default:
      break;
  }
};
