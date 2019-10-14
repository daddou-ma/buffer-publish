import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as modalActions } from '@bufferapp/publish-modals/reducer';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.CANCEL_TRIAL: {
      dispatch(dataFetchActions.fetch({ name: 'cancelTrial' }));
      dispatch(modalActions.hideUpgradeModal());
      break;
    }
    case `cancelTrial_${dataFetchActionTypes.FETCH_FAIL}`: {
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    }
    default:
      break;
  }
};
