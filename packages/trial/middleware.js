import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import { actions as notificationActions } from '@bufferapp/notifications';
import { AppHooks } from '@bufferapp/publish-composer';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case actionTypes.START_PRO_TRIAL:
      dispatch(dataFetchActions.fetch({
        name: 'startTrial',
        args: {
          source: action.source,
          plan: 'pro',
        },
      }));
      break;
    case `startTrial_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      dispatch(notificationActions.createNotification({
        notificationType: 'success',
        message: 'Awesome! You’re now starting your free 7-day Pro trial',
      }));
      dispatch(dataFetchActions.fetch({ name: 'user' }));
      dispatch(dataFetchActions.fetch({ name: 'features' }));
      break;
    }

    case `startTrial_${dataFetchActionTypes.FETCH_FAIL}`:
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: 'Uh oh, something went wrong. Please get in touch if this problem persists.',
      }));
      break;
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const state = getState();
      // only reset composer userData if the user just started a trial
      if (state.trial.startedTrial) {
        const userData = state.appSidebar.user;
        AppHooks.handleStartTrial({
          message: userData,
          removeScope: state.trial.scope,
        });
      }

      dispatch({ type: actionTypes.CLEAR_SCOPE });
      break;
    }
    default:
      break;
  }
};
