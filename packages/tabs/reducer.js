import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

export const actionTypes = keyWrapper('TABS', {
  SELECT_TAB: 0,
  UPDATE_COUNTER: 0,
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
    case actionTypes.UPDATE_COUNTER: {
      if (action.needsApproval && action.draftAction === 'draftCreated') {
        return {
          ...state,
          draftsNeedApprovalCount: state.draftsNeedApprovalCount + 1,
        };
      }
      if (!action.needsApproval && action.draftAction === 'draftCreated') {
        return {
          ...state,
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
  updateCounter: ({ needsApproval, draftAction }) => ({
    type: actionTypes.UPDATE_COUNTER,
    needsApproval,
    draftAction,
  }),
};
