import deepFreeze from 'deep-freeze';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import reducer, { initialState, actionTypes, actions } from './reducer';

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

  it('handles SELECT_TAB action type', () => {
    const stateBefore = {
      ...initialState,
      tabId: null,
    };
    const stateAfter = {
      ...initialState,
      tabId: 'drafts',
    };
    const action = {
      type: actionTypes.SELECT_TAB,
      tabId: 'drafts',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles SELECT_PROFILE action type', () => {
    const stateBefore = {
      ...initialState,
      draftsNeedApprovalCount: null,
      draftsCount: null,
    };
    const stateAfter = {
      ...initialState,
      draftsNeedApprovalCount: 1,
      draftsCount: 2,
    };
    const action = {
      type: profileActionTypes.SELECT_PROFILE,
      profile: {
        draftsNeedApprovalCount: 1,
        draftsCount: 2,
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // Test action creators:
  describe('action creators', () => {
    it('creates a SELECT_TAB action', () => {
      const expectedAction = {
        type: actionTypes.SELECT_TAB,
        tabId: 'tab',
        profileId: 'id',
      };
      expect(actions.selectTab({ tabId: 'tab', profileId: 'id' })).toEqual(
        expectedAction
      );
    });
  });
});
