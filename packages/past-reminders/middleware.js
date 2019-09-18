import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actions as dataFetchActions, actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications/lib/reducer';
import { actionTypes } from './reducer';

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
    case actionTypes.POST_MOBILE_REMINDER:
      dispatch(dataFetchActions.fetch({
        name: 'mobileReminder',
        args: {
          updateId: action.updateId,
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
