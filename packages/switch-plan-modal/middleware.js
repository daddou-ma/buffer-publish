import { trackAction } from '@bufferapp/publish-data-tracking';
import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';
import { actions as stripeActions } from '@bufferapp/stripe';
import { actions as notificationActions } from '@bufferapp/notifications';
import { actionTypes as modalsActionTypes, actions as modalActions } from '@bufferapp/publish-modals';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  const { source } = getState().switchPlanModal;
  next(action);

  switch (action.type) {
    case actionTypes.UPGRADE: {
      trackAction({
        location: 'MODALS',
        action: 'submit_upgrade_to_pro',
        metadata: { source },
      });
      break;
    }
    case modalsActionTypes.SHOW_SWITCH_PLAN_MODAL: {
      trackAction({
        location: 'MODALS',
        action: 'show_upgrade_to_pro',
        metadata: { source: action.source },
      });
      break;
    }
    case actionTypes.CANCEL_TRIAL: {
      dispatch(dataFetchActions.fetch({ name: 'cancelTrial' }));
      dispatch(modalActions.hideUpgradeModal());
      trackAction({
        location: 'MODALS',
        action: 'cancel_expired_pro_trial',
        metadata: { source },
      });
      break;
    }
    case `cancelTrial_${dataFetchActionTypes.FETCH_FAIL}`: {
      dispatch(notificationActions.createNotification({
        notificationType: 'error',
        message: action.error,
      }));
      break;
    }
    case modalsActionTypes.HIDE_SWITCH_PLAN_MODAL: {
      trackAction({
        location: 'MODALS',
        action: 'hide_upgrade_to_pro',
        metadata: { source },
      });
      break;
    }
    default:
      break;
  }
};
