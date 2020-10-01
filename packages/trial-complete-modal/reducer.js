import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';

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
    case orgActionTypes.ORGANIZATION_SELECTED:
      return {
        ...state,
        hasExpiredProTrial: action.selected.shouldShowProTrialExpiredModal,
        hasExpiredBusinessTrial:
          action.selected.shouldShowBusinessTrialExpiredModal,
        isPremiumBusiness:
          action.selected.trial &&
          action.selected.trial.trialPlan === 'premium_business',
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
