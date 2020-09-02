export const getSelectedOrganization = organizations => {
  return organizations?.find(org => org.selected) || organizations[0];
};

export const getOrgsAlfabeticalOrder = (organizations = {}) =>
  Object.values(organizations)?.sort((a, b) => (a.name > b.name ? 1 : -1));

export const mapSelectedOrganization = ({ id, organizations }) => {
  return organizations.map(org => ({
    ...org,
    selected: org.id === id,
  }));
};
