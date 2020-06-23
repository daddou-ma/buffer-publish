import keyWrapper from '@bufferapp/keywrapper';

const orgData = window?.bufferData?.organizations;

export const actionTypes = keyWrapper('ORGANIZATIONS', {
  SET_CURRENT_ORGANIZATION: 0,
});

export default (state = orgData || {}, action) => {
  switch (action.type) {
    case `ORGANIZATIONS_INITIALIZED`: {
      const { organizations, selectedOrganization } = action;
      return {
        list: organizations,
        selected: selectedOrganization,
      };
    }
    case `ORGANIZATION_SELECTED`: {
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
