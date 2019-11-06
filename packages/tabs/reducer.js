import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

export const actionTypes = keyWrapper('TABS', {
  SELECT_TAB: 0,
});

const initialState = {
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
};
