const orgData = window?.bufferData?.organizations;

module.exports = (state = orgData || {}, action) => {
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
