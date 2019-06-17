import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actionTypes } from './reducer';
import { actions as notificationActions } from '@bufferapp/notifications';

export default ({ dispatch }) => next => (action) => { // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.START_PRO_TRIAL:
      dispatch(dataFetchActions.fetch({ name: 'startTrial' }));
      break;
    case `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'success',
      }));
      dispatch(dataFetchActions.fetch({ name: 'user' }));
      break;
    case `startTrial_${dataFetchActionTypes.FETCH_FAILURE}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'failure',
        message: 'failure',
      }));
      break;
    default:
      break;
  }
};
