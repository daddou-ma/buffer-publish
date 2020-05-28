import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { getSelectedOrganization, mapSelectedOrganization } from './utils';

const orgData =
  typeof window !== 'undefined' &&
  typeof window.bufferData !== 'undefined' &&
  typeof window.bufferData.organizations !== 'undefined' &&
  window.bufferData.organizations;

module.exports = (state = orgData || {}, action) => {
  switch (action.type) {
    case `organizations_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const organizations = action.result;
      const selected = getSelectedOrganization(organizations);
      return {
        list: organizations,
        selected,
      };
    }
    case `ORGANIZATION_SELECTED`: {
      return {
        ...state,
        list: action.orgs,
        selected: action.selected,
      };
    }
    default:
      return state;
  }
};
