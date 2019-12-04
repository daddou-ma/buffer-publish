import deepFreeze from 'deep-freeze';
import reducer, { actions, initialState, actionTypes } from './reducer';

describe('reducer', () => {
  // Tests the default case in the reducer switch statement
  it('initializes default state', () => {
    const action = {
      type: '',
    };
    // Protects state and actions from mutation
    deepFreeze(initialState);
    deepFreeze(action);

    // When state is undefined, it's supposed to return initial state
    expect(reducer(undefined, action)).toEqual(initialState);
  });

  it('handles user_FETCH_SUCCESS action type, if user saw onboarding page', () => {
    const stateBefore = {
      ...initialState,
      canSeeOnboardingPage: true,
    };
    const stateAfter = {
      ...initialState,
      canSeeOnboardingPage: false,
    };
    const action = {
      type: 'user_FETCH_SUCCESS',
      result: {
        messages: ['user_saw_onboarding_page'],
      },
    };
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles user_FETCH_SUCCESS action type, if user did not see onboarding page', () => {
    const stateBefore = {
      ...initialState,
      canSeeOnboardingPage: null,
    };
    const stateAfter = {
      ...initialState,
      canSeeOnboardingPage: true,
    };
    const action = {
      type: 'user_FETCH_SUCCESS',
      result: {
        messages: [],
      },
    };
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles SKIP_STEP action type', () => {
    const stateBefore = {
      ...initialState,
      canSeeOnboardingPage: true,
    };
    const stateAfter = {
      ...initialState,
      canSeeOnboardingPage: false,
    };
    const action = {
      type: actionTypes.SKIP_STEP,
    };
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // Test action creators:
  describe('action creators', () => {
    it('triggers a CONNECT_SOCIAL_ACCOUNT_ONBOARDING action', () => {
      expect(actions.handleConnectSocialAccountOnboardingClick()).toEqual({
        type: actionTypes.CONNECT_SOCIAL_ACCOUNT_ONBOARDING,
      });
    });

    it('triggers a SKIP_STEP action', () => {
      expect(actions.handleSkipStep()).toEqual({
        type: actionTypes.SKIP_STEP,
      });
    });

    it('triggers a MANAGE_SOCIAL_ACCOUNT action', () => {
      expect(actions.handleManageSocialAccountClick()).toEqual({
        type: actionTypes.MANAGE_SOCIAL_ACCOUNT,
      });
    });

    it('triggers a CONNECT_SOCIAL_ACCOUNT_SIDEBAR action', () => {
      expect(actions.handleConnectSocialAccountSidebarClick()).toEqual({
        type: actionTypes.CONNECT_SOCIAL_ACCOUNT_SIDEBAR,
      });
    });
  });
});
