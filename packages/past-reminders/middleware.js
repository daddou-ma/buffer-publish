import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import { actions as dataFetchActions, actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';

export default ({ dispatch }) => next => (action) => { // eslint-disable-line no-unused-vars
  next(action);
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      dispatch(dataFetchActions.fetch({
        name: 'pastReminders',
        args: {
          profileId: action.profile.id,
          isFetchingMore: false,
        },
      }));
      break;
    case actionTypes.POST_MOBILE_REMINDER:
      dispatch(dataFetchActions.fetch({
        name: 'mobileReminder',
        args: {
          updateId: action.updateId,
        },
      }));
      break;
    case `mobileReminder${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: action.message,
      }));
      break;
    default:
      break;
  }
};
