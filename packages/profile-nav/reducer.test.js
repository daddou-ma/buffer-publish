import deepFreeze from 'deep-freeze';
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

  it('handles GENERATE_PROFILE_TABS action type', () => {
    const stateBefore = {
      ...initialState,
      profileNavTabs: [],
    };
    const stateAfter = {
      ...initialState,
      profileNavTabs: ['queue', 'analytics', 'settings', 'overview'],
    };
    const action = {
      type: actionTypes.GENERATE_PROFILE_TABS,
      organization: { id: 'org1' },
      profile: { id: 'id1' },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles getCounts_FETCH_START action type', () => {
    const stateBefore = {
      ...initialState,
      draftsNeedApprovalCount: 0,
      draftsCount: 1,
    };
    const stateAfter = {
      ...initialState,
      draftsNeedApprovalCount: 0,
      draftsCount: 0,
    };
    const action = {
      type: 'getCounts_FETCH_START',
      result: {
        counts: {
          drafts_needs_approval_true: 1,
          drafts_needs_approval_false: 2,
        },
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles getCounts_FETCH_SUCCESS action type', () => {
    const stateBefore = {
      ...initialState,
      draftsNeedApprovalCount: 0,
      draftsCount: 0,
    };
    const stateAfter = {
      ...initialState,
      draftsNeedApprovalCount: 1,
      draftsCount: 2,
    };
    const action = {
      type: 'getCounts_FETCH_SUCCESS',
      result: {
        counts: {
          drafts_needs_approval_true: 1,
          drafts_needs_approval_false: 2,
        },
      },
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // Test action creators:
  describe('action creators', () => {
    it('creates a GENERATE_PROFILE_TABS action', () => {
      const expectedAction = {
        type: actionTypes.GENERATE_PROFILE_TABS,
        organization: { id: 'org1' },
        profile: { id: 'id1' },
      };
      expect(
        actions.generateProfileTabs({
          profile: { id: 'id1' },
          organization: { id: 'org1' },
        })
      ).toEqual(expectedAction);
    });
  });
});
