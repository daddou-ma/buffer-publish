/* global Stripe */

import { getURL } from '@bufferapp/publish-server/formatters/src';
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
    case actionTypes.HANDLE_CARD_SETUP_REQUEST:
      break;
    case actionTypes.HANDLE_CARD_SETUP_SUCCESS:
      break;
    case actionTypes.HANDLE_CARD_SETUP_ERROR:
      break;
    case actionTypes.CREATE_SETUP_INTENT_REQUEST:
      dispatch(
        asyncDataFetchActions.fetch({
          name: 'createSetupIntent',
          args: {},
        }),
      );
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
