import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actions as modalActions } from '@bufferapp/publish-modals';
import { actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => { // eslint-disable-line
  next(action);

  switch (action.type) {
    case actionTypes.START_PRO_TRIAL:
      dispatch(dataFetchActions.fetch({ name: 'startTrial' }));
      break;
    case `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Awesome! You’re now starting your free 7-day Pro trial',
      }));
      dispatch(dataFetchActions.fetch({ name: 'user' }));
      dispatch(modalActions.hideInstagramFirstCommentProTrialModal());
      break;
    case `startTrial_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: 'Uh oh, something went wrong. Please get in touch if this problem persists.',
      }));
      break;
    default:
      break;
  }
};
