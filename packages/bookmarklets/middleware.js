import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';

const getUrlParameter = name => {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

const getId = () => {
  const pathArray = window.location.pathname.split('/');
  return pathArray[3];
};

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case 'INIT_CHECK_BOOKMARKLET': {
      const id = getId();
      const isRecheck = getUrlParameter('recheck');
      const isQuickAnalytics = getUrlParameter('quick_analytics');

      if (id) {
        if (isRecheck) {
          dispatch(
            dataFetchActions.fetch({
              name: 'updateRecheck',
              args: {
                updateId: id,
              },
            })
          );
        }

        if (isQuickAnalytics) {
          dispatch(
            dataFetchActions.fetch({
              name: 'quickAnalytics',
              args: {
                profileId: id,
              },
            })
          );
        }
      }

      break;
    }
    case `updateRecheck_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Analytics should be updated!',
        })
      );
      break;
    case `updateRecheck_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error updating the analytics for the update!',
        })
      );
      break;
    case `quickAnalytics_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: 'Quick Analytics executed for this profile!',
        })
      );
      break;
    case `quickAnalytics_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message:
            'There was an error with the quick analytics for this profile!',
        })
      );
      break;
    default:
      break;
  }
};
