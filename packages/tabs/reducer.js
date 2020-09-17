import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('TABS', {
  SELECT_TAB: 0,
  UPDATE_DRAFT_COUNTER: 0,
});

export const initialState = {
  profiles: [],
  tabId: 'queue',
  selectedProfileId: '',
  selectedProfile: {},
  draftsNeedApprovalCount: null,
  draftsCount: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_TAB: {
      return {
        ...state,
        tabId: action.tabId,
      };
    }

    case `getCounts_${dataFetchActionTypes.FETCH_START}`: {
      return {
        ...state,
        draftsNeedApprovalCount: null,
        draftsCount: null,
      };
    }

    case `getCounts_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        draftsNeedApprovalCount:
          action.result.counts.drafts_needs_approval_true,
        draftsCount:
          action.result.counts.drafts_needs_approval_false ||
          action.result.counts.drafts,
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
