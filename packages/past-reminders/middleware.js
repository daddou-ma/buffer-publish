import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actions as dataFetchActions, actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

const fetchPastReminders = (dispatch, action) => {
  const { viewType } = action;
  const pastRemindersRPC = viewType === 'stories' ? 'getPastRemindersStories' : 'pastRemindersPosts';

  dispatch(dataFetchActions.fetch({
    name: pastRemindersRPC,
    args: {
      profileId: action.profileId || action.profile.id,
      isFetchingMore: false,
    },
  }));
};

export default ({ dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'pastRemindersPosts',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
        },
      }));
      break;
    case actionTypes.TOGGLE_VIEW_TYPE:
      fetchPastReminders(dispatch, action);
      break;
    case actionTypes.POST_MOBILE_REMINDER:
      dispatch(dataFetchActions.fetch({
        name: 'mobileReminder',
        args: {
          updateId: action.updateId,
        },
      }));
      break;
    case actionTypes.STORY_GROUP_MOBILE_REMINDER:
      dispatch(dataFetchActions.fetch({
        name: 'shareStoryGroupNow',
        args: {
          storyGroupId: action.updateId,
        },
      }));
      break;
    case `mobileReminder_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'A push notification to your connected mobile devices has been sent so you can post to Instagram!',
      }));
      break;
    default:
      break;
  }
};
