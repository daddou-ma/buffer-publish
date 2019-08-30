/* global Stripe */

import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as notification } from '@bufferapp/notifications';
import { actions as asyncDataFetchActions, actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions, actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  switch (action.type) {
    case actionTypes.HANDLE_CARD_SETUP_SUCCESS: {
      const {
        cycle,
        source,
        plan,
        paymentMethodId,
      } = action;

      dispatch(
        asyncDataFetchActions.fetch({
          name: 'switchPlan',
          args: {
            cycle,
            source,
            plan,
            paymentMethodId,
          },
        }),
      );
      break;
    }
    case actionTypes.HANDLE_CARD_SETUP_ERROR:
      // Add notification for error
      break;
    case actionTypes.CREATE_SETUP_INTENT_REQUEST:
      dispatch(
        asyncDataFetchActions.fetch({
          name: 'createSetupIntent',
          args: {},
        }),
      );
      break;
    case `switchPlan_${asyncDataFetchActionTypes.FETCH_ERROR}`:
      dispatch(notification.createNotification({
        notificationType: 'error',
        message: 'RPC Error', // temp error message
      }));
      break;
    case `createSetupIntent_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        actions.createSetupIntentSuccess(action.result.setup_intent.client_secret),
      );
      break;
    case `switchPlan_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      window.location = getURL.getPublishUrl();
      break;
    default:
      break;
  }

  next(action);
};
