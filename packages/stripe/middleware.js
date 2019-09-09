/* global Stripe */

import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as notification } from '@bufferapp/notifications';
import { actions as asyncDataFetchActions, actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions, actionTypes } from './reducer';

export default ({ dispatch }) => next => (action) => {
  switch (action.type) {
    case actionTypes.CREATE_SETUP_INTENT_REQUEST:
      dispatch(
        asyncDataFetchActions.fetch({
          name: 'createSetupIntent',
          args: {},
        }),
      );
      break;
    case actionTypes.HANDLE_SETUP_CARD_SUCCESS: {
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
