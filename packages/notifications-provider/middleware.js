import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';

import getNotificationMessage from './utils/getNotificationMessage';

export default ({ dispatch, getState }) => next => action => {
  next(action);
  switch (action.type) {
    case 'APP_INIT': {
      /**
       * APP_INIT also includes the query params at the time of load
       * so we'll put those in the global window object for use later.
       */
      let notification = null;
      const { queryParams: query } = action;
      const type = query.get('nt');
      const key = query.get('nk');
      const variable = query.get('nv');
      if (type && key) {
        notification = {
          type: query.get('nt'), // Notification Type
          key: query.get('nk'), // Notification Key
        };
        if (variable) {
          notification.variable = variable; // Notification Variable
        }
      }
      window._notification = notification;
      break;
    }
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const profilesLoaded = getState().profileSidebar.loading === false;
      if (!profilesLoaded) {
        break;
      }

      if (window._notification) {
        const notificationType = window._notification.type;

        const message = getNotificationMessage(
          notificationType,
          window._notification.key,
          window._notification.variable
        );

        if (message) {
          dispatch(
            notificationActions.createNotification({
              notificationType,
              message,
            })
          );
        }
      }
      break;
    }
    default:
      break;
  }
};
