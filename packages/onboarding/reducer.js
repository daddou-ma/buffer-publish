import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('ONBOARDING_MANAGER', {
  CONNECT_SOCIAL_ACCOUNT: 0,
  SKIP_STEP: 0,
});

const initialState = {
  canSeeOnboardingPage: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        canSeeOnboardingPage: !action.result.messages.includes('user_saw_onboarding_page'),
      };
    case actionTypes.CONNECT_SOCIAL_ACCOUNT:
    case actionTypes.SKIP_STEP:
      return {
        ...state,
        canSeeOnboardingPage: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleConnectSocialAccountClick: () => ({
    type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
  }),
  handleSkipStep: () => ({
    type: actionTypes.SKIP_STEP,
  }),
};
