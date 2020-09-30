import deepFreeze from 'deep-freeze';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
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

  it('handles Org selected action type and updates state', () => {
    const stateBefore = {
      ...initialState,
      hasExpiredProTrial: null,
      hasExpiredBusinessTrial: null,
      isPremiumBusiness: null,
    };
    const stateAfter = {
      ...initialState,
      hasExpiredProTrial: false,
      hasExpiredBusinessTrial: true,
      isPremiumBusiness: true,
    };
    const action = {
      type: orgActionTypes.ORGANIZATION_SELECTED,
      selected: {
        shouldShowProTrialExpiredModal: false,
        shouldShowBusinessTrialExpiredModal: true,
        trial: {
          trialPlan: 'premium_business',
        },
      },
    };
    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // Test action creators:
  describe('action creators', () => {
    it('triggers a CANCEL_TRIAL action', () => {
      expect(actions.cancelTrial()).toEqual({
        type: actionTypes.CANCEL_TRIAL,
      });
    });

    it('triggers a COMPLETE_UPGRADE_TRIAL action', () => {
      expect(actions.completeAndUpgrade()).toEqual({
        type: actionTypes.COMPLETE_UPGRADE_TRIAL,
      });
    });
  });
});
