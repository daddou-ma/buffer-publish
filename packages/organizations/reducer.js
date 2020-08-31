import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('ORGS', {
  INITIALIZED: 0,
  ORGANIZATION_SELECTED: 0,
  SET_CURRENT_ORGANIZATION: 0,
});

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.INITIALIZED: {
      const { organizations, selectedOrganization } = action;
      return {
        list: organizations,
        selected: selectedOrganization,
      };
    }
    case actionTypes.ORGANIZATION_SELECTED: {
      return {
        ...state,
        list: action.organizations,
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
