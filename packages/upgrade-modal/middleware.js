import { trackAction } from '@bufferapp/publish-data-tracking';
import { actions as stripeActions } from '@bufferapp/stripe';
import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  const card = getState().upgradeModal.card;
  const source = getState().upgradeModal.source;

  next(action);

  switch (action.type) {
    case actionTypes.UPGRADE: {
      dispatch(stripeActions.validateCreditCard(card));
      trackAction({
        location: 'MODALS',
        action: 'submit_upgrade_to_pro',
        metadata: { source },
      });
      break;
    }
    case modalsActionTypes.SHOW_UPGRADE_MODAL: {
      trackAction({
        location: 'MODALS',
        action: 'show_upgrade_to_pro',
        metadata: { source: action.source },
      });
      break;
    }
    case actionTypes.CANCEL_TRIAL: {
      dispatch(dataFetchActions.fetch({
        name: 'cancelTrial',
      }));
      trackAction({
        location: 'MODALS',
        action: 'cancel_expired_pro_trial',
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
    case modalsActionTypes.HIDE_UPGRADE_MODAL: {
      trackAction({
        application: 'PUBLISH',
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
