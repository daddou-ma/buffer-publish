const generateOrgSwitcherItems = ({
  canSeeOrgSwitcher,
  selectedOrganizationId,
  switchOrganization,
  organizations = [],
  profiles = [],
}) => {
  /**
   * Only show if user has feature and 2+ organizations
   */
  const shouldShow = canSeeOrgSwitcher;
  if (!shouldShow) {
    return null;
  }

  const orgSwitcherItems = {
    title: 'Organizations',
    menuItems: [],
  };

  organizations.forEach(org => {
    orgSwitcherItems.menuItems.push({
      id: org.id,
      title: org.name,
      selected: selectedOrganizationId === org.id,
      onItemClick: () => switchOrganization(org.id),
      subItems: profiles
        .filter(profile => profile.organizationId === org.id)
        .map(profile => ({
          id: profile.id,
          title: profile.formatted_username,
          network: profile.service,
        })),
    });
  });

  return orgSwitcherItems;
};

export default generateOrgSwitcherItems;
