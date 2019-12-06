import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';

import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.TOGGLE_NOTIFICATIONS:
      dispatch(
        dataFetchActions.fetch({
          name: 'setNotifications',
          args: action.notifications,
        })
      );
      break;
    case `setNotifications_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: action.result.notice_message,
        })
      );
      break;
    default:
      break;
  }
};
