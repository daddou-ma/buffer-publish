export const getSelectedOrganization = orgs => {
  const selected = orgs?.filter(org => org.selected);
  return selected.length > 0 ? selected[0] : orgs[0];
};

export const mapSelectedOrganization = ({id, orgs}) => {
  return orgs.map(org => ({
    ...org,
    selected: org.id === id,
  }));
};
