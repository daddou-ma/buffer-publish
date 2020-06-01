export const getSelectedOrganization = organizations => {
  const selected = organizations?.filter(org => org.selected);
  return selected.length > 0 ? selected[0] : organizations[0];
};

export const mapSelectedOrganization = ({ id, organizations }) => {
  return organizations.map(org => ({
    ...org,
    selected: org.id === id,
  }));
};
