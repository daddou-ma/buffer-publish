import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

export const actionTypes = keyWrapper('TABS', {
  SELECT_TAB: 0,
  UPDATE_DRAFT_COUNTER: 0,
});

export const initialState = {
  profiles: [],
  tabId: 'queue',
  selectedProfileId: '',
  selectedProfile: {},
  isBusinessAccount: false,
  draftsNeedApprovalCount: '',
  draftsCount: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TAB: {
      return {
        ...state,
        tabId: action.tabId,
      };
    }

    case profileActionTypes.SELECT_PROFILE: {
      return {
        ...state,
        draftsNeedApprovalCount: action.profile.draftsNeedApprovalCount,
        draftsCount: action.profile.draftsCount,
      };
    }

    case actionTypes.UPDATE_DRAFT_COUNTER: {
      // Updates counter when draft is created
      if (action.draftAction === 'DRAFTS__DRAFT_CREATED') {
        if (action.needsApproval) {
          return {
            ...state,
            draftsNeedApprovalCount: state.draftsNeedApprovalCount + 1,
          };
        }
        return {
          ...state,
          draftsCount: state.draftsCount + 1,
        };
      }
      // Updates counter when draft is deleted or approved
      if (
        action.draftAction === 'DRAFTS__DRAFT_DELETED' ||
        action.draftAction === 'DRAFTS__DRAFT_APPROVED'
      ) {
        if (action.needsApproval) {
          return {
            ...state,
            draftsNeedApprovalCount: state.draftsNeedApprovalCount - 1,
          };
        }
        return {
          ...state,
          draftsCount: state.draftsCount - 1,
        };
      }
      // Updates counter when draft is moved
      if (action.draftAction === 'DRAFTS__DRAFT_MOVED') {
        if (action.needsApproval) {
          return {
            ...state,
            draftsNeedApprovalCount: state.draftsNeedApprovalCount + 1,
            draftsCount: state.draftsCount - 1,
          };
        }
        return {
          ...state,
          draftsNeedApprovalCount: state.draftsNeedApprovalCount - 1,
          draftsCount: state.draftsCount + 1,
        };
      }
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  selectTab: ({ tabId, profileId }) => ({
    type: actionTypes.SELECT_TAB,
    tabId,
    profileId,
  }),
  updateDraftCounter: ({ needsApproval, draftAction }) => ({
    type: actionTypes.UPDATE_DRAFT_COUNTER,
    needsApproval,
    draftAction,
  }),
};
