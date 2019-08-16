import deepFreeze from 'deep-freeze';
import reducer, { actions, initialState, actionTypes } from './reducer';

describe('actions', () => {
  test('should handle user_FETCH_SUCCESS action type, if user saw onboarding page', () => {
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
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  test('should handle user_FETCH_SUCCESS action type, if user did not see onboarding page', () => {
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
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  test('should handle CONNECT_SOCIAL_ACCOUNT action type', () => {
    const stateAfter = {
      ...initialState,
      canSeeOnboardingPage: false,
    };
    const action = {
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  test('should handle SKIP_STEP action type', () => {
    const stateAfter = {
      ...initialState,
      canSeeOnboardingPage: false,
    };
    const action = {
      type: actionTypes.SKIP_STEP,
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  test('handleConnectSocialAccountClick triggers a CONNECT_SOCIAL_ACCOUNT action', () => {
    expect(actions.handleConnectSocialAccountClick()).toEqual({
      type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
    });
  });

  test('handleSkipStep triggers a SKIP_STEP action', () => {
    expect(actions.handleSkipStep()).toEqual({
      type: actionTypes.SKIP_STEP,
    });
  });
});
