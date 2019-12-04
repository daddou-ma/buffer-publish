import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('TRIAL_COMPLETE_MODAL', {
  CANCEL_TRIAL: 0,
  COMPLETE_UPGRADE_TRIAL: 0,
});

export const initialState = {
  hasExpiredProTrial: null,
  hasExpiredBusinessTrial: null,
  isPremiumBusiness: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        hasExpiredProTrial: action.result.shouldShowProTrialExpiredModal,
        hasExpiredBusinessTrial:
          action.result.shouldShowBusinessTrialExpiredModal,
        isPremiumBusiness:
          action.result.trial &&
          action.result.trial.trialPlan === 'premium_business',
      };
    default:
      return state;
  }
};

export const actions = {
  cancelTrial: () => ({
    type: actionTypes.CANCEL_TRIAL,
  }),
  completeAndUpgrade: () => ({
    type: actionTypes.COMPLETE_UPGRADE_TRIAL,
  }),
};
