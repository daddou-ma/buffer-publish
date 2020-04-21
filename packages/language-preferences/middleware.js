import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  next(action);
  switch (action.type) {
    case actionTypes.SET_USER_LANGUAGE:
      dispatch(
        dataFetchActions.fetch({
          name: 'setUserLanguage',
          args: {
            language: action.language,
          },
        })
      );
      break;
    case `setUserLanguage_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'success',
          message: action.result.message,
        })
      );
      break;
    case `setUserLanguage_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(
        notificationActions.createNotification({
          notificationType: 'error',
          message: 'There was an error updating the language setting!',
        })
      );
      break;
    default:
      break;
  }
};
