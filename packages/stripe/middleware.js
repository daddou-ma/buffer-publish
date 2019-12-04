import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions as notification } from '@bufferapp/notifications';
import {
  actions as asyncDataFetchActions,
  actionTypes as asyncDataFetchActionTypes,
} from '@bufferapp/async-data-fetch';
import getCtaFromSource from '@bufferapp/publish-switch-plan-modal/utils/tracking';
import { actions, actionTypes } from './reducer';

export default ({ dispatch }) => next => action => {
  switch (action.type) {
    case actionTypes.CREATE_SETUP_INTENT_REQUEST:
      dispatch(
        asyncDataFetchActions.fetch({
          name: 'createSetupIntent',
          args: {},
        })
      );
      break;
    case actionTypes.HANDLE_SETUP_CARD_REQUEST: {
      const { stripe, setupIntentClientSecret, source, plan, cycle } = action;

      stripe.handleCardSetup(setupIntentClientSecret).then(result => {
        if (result.error) {
          dispatch(actions.handleCardSetupError(result.error.message));
          dispatch(
            notification.createNotification({
              notificationType: 'error',
              message: result.error.message,
            })
          );
        } else {
          dispatch(
            actions.handleCardSetupSuccess(
              cycle,
              source,
              plan,
              result.setupIntent.payment_method
            )
          );
        }
      });
      break;
    }
    case actionTypes.HANDLE_SETUP_CARD_SUCCESS: {
      const { cycle, source, plan, paymentMethodId } = action;

      dispatch(
        asyncDataFetchActions.fetch({
          name: 'switchPlan',
          args: {
            cycle,
            cta: getCtaFromSource(source),
            plan,
            paymentMethodId,
          },
        })
      );
      break;
    }
    case `createSetupIntent_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      dispatch(
        actions.createSetupIntentSuccess(
          action.result.setup_intent.client_secret
        )
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
