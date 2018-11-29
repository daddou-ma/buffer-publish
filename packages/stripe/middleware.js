/* global Stripe */

import { getURL } from '@bufferapp/publish-formatters';
import { actions as notification } from '@bufferapp/notifications';
import { actions as asyncDataFetchActions, actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actions, actionTypes } from './reducer';

const getErrorMessage = (response, errorMessages) => {
  let message = null;
  if (response.error) {
    message = response.error.message;
  } else if (!response.card.name) {
    message = errorMessages.noNameError;
  } else if (response.card.country === 'US') {
    if (!response.card.address_zip) {
      message = errorMessages.noZipError;
    } else if (response.card.address_zip_check === 'fail') {
      message = errorMessages.invalidZipError;
    }
  }

  return message;
};

export default ({ dispatch, getState }) => next => (action) => {
  const errorMessages = getState().i18n.translations.stripe;
  switch (action.type) {
    case actionTypes.CREDIT_CARD_VALIDATING:
      Stripe.createToken(action.card, (status, response) => {
        const errorMessage = getErrorMessage(response, errorMessages);
        if (errorMessage) {
          dispatch(actions.throwValidationError(errorMessage));
          dispatch(notification.createNotification({
            notificationType: 'error',
            message: errorMessage,
          }));
        } else {
          dispatch(asyncDataFetchActions.fetch({
            name: 'upgradeToPro',
            args: {
              cycle: getState().upgradeModal.cycle,
              source: getState().upgradeModal.source,
              token: response.id,
            },
          }));
        }
      });
      break;
    case `upgradeToPro_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      window.location.assign(getURL.getClassicBufferURL());
      break;
    default:
      break;
  }

  next(action);
};
