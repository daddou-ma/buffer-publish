import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      dispatch(
        dataFetchActions.fetch({
          name: 'getStoryGroups',
          args: {
            profileId: action.profileId || action.profile.id,
            isFetchingMore: false,
          },
        })
      );
      break;
    case actionTypes.DELETE_STORY_GROUP:
      dispatch(
        dataFetchActions.fetch({
          name: 'deleteStoryGroup',
          args: {
            storyGroupId: action.storyGroup.id,
          },
        })
      );
      break;
    case `deleteStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: "Okay, we've deleted that Story!",
        })
      );
      break;
    case `deleteStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      break;
    case actionTypes.STORY_GROUP_SHARE_NOW:
      dispatch(
        dataFetchActions.fetch({
          name: 'shareStoryGroupNow',
          args: {
            storyGroupId: action.storyGroup.id,
          },
        })
      );
      break;
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Great! You will receive a reminder to post manually! 🎉',
        })
      );
      break;
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: action.error,
        })
      );
      break;
    default:
      break;
  }
};
