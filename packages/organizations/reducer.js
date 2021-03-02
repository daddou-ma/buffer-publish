import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('ORGS', {
  ORGANIZATION_SELECTED: 0,
  SET_CURRENT_ORGANIZATION: 0,
});

export default (state = { loaded: false }, action) => {
  switch (action.type) {
    case `organizations_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const organizations = action.result;

      return {
        list: organizations,
        selected: null,
        loaded: true,
        canSeeOrgSwitcher: organizations?.length >= 2,
      };
    }
    case actionTypes.ORGANIZATION_SELECTED: {
      return {
        ...state,
        selected: action.selected,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  setCurrentOrganization: organizationId => ({
    type: actionTypes.SET_CURRENT_ORGANIZATION,
    organizationId,
  }),
};
