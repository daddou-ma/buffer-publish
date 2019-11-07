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

  describe('UPDATE_DRAFT_COUNTER action type', () => {
    describe('When DRAFT_CREATED', () => {
      it('updates counter if draft needs approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 0,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 1,
          draftsCount: 0,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: true,
          draftAction: 'DRAFTS__DRAFT_CREATED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });

      it('updates counter if draft does not need approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 0,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 1,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: false,
          draftAction: 'DRAFTS__DRAFT_CREATED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });
    });

    describe('When DRAFT_DELETED', () => {
      it('updates counter if draft needs approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 2,
          draftsCount: 0,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 1,
          draftsCount: 0,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: true,
          draftAction: 'DRAFTS__DRAFT_DELETED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });

      it('updates counter if draft does not need approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 2,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 1,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: false,
          draftAction: 'DRAFTS__DRAFT_DELETED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });
    });

    describe('When DRAFT_APPROVED', () => {
      it('updates counter if draft needs approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 2,
          draftsCount: 0,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 1,
          draftsCount: 0,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: true,
          draftAction: 'DRAFTS__DRAFT_APPROVED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });

      it('updates counter if draft does not need approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 2,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 1,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: false,
          draftAction: 'DRAFTS__DRAFT_APPROVED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });
    });

    describe('When DRAFT_MOVED', () => {
      it('updates counter if draft needs approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 1,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 1,
          draftsCount: 0,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: true,
          draftAction: 'DRAFTS__DRAFT_MOVED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });

      it('updates counter if draft does not need approval', () => {
        const stateBefore = {
          ...initialState,
          draftsNeedApprovalCount: 1,
          draftsCount: 0,
        };
        const stateAfter = {
          ...initialState,
          draftsNeedApprovalCount: 0,
          draftsCount: 1,
        };
        const action = {
          type: actionTypes.UPDATE_DRAFT_COUNTER,
          needsApproval: false,
          draftAction: 'DRAFTS__DRAFT_MOVED',
        };

        deepFreeze(stateBefore);
        deepFreeze(action);

        expect(reducer(stateBefore, action)).toEqual(stateAfter);
      });
    });
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

    it('creates a UPDATE_DRAFT_COUNTER action', () => {
      const expectedAction = {
        type: actionTypes.UPDATE_DRAFT_COUNTER,
        needsApproval: true,
        draftAction: 'action',
      };
      expect(
        actions.updateDraftCounter({
          needsApproval: true,
          draftAction: 'action',
        })
      ).toEqual(expectedAction);
    });
  });
});
