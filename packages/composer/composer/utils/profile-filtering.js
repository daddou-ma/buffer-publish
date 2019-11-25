/**
 * Returns a filtered list of profiles by their service name.
 *
 * @param {Array} profiles
 * @param {String} service
 */
export const getProfilesByService = ({ profiles, service }) =>
  service
    ? profiles.filter(profile => profile.service.name === service)
    : profiles;

/**
 * Return profiles where user has a given role.
 *
 * @param {Array} profiles
 * @param {String} role 'manager' | 'contributor' | undefined  Will match either role if not defined.
 * @param {String} service Filter by a given service
 *
 */
export const getProfilesWhereUserHasRole = ({ profiles, role, service }) => {
  const filteredProfiles = getProfilesByService({ profiles, service });
  if (role === 'contributor') {
    return filteredProfiles.filter(
      profile => profile.isContributor && profile.isBusinessProfile
    );
  }
  if (role === 'manager') {
    return filteredProfiles.filter(
      profile => profile.isManager && profile.isBusinessProfile
    );
  }
  return filteredProfiles.filter(
    profile =>
      profile.isBusinessProfile && (profile.isContributor || profile.isManager)
  );
};

/**
 * Returns true if they user is manager or contributor of any given profiles.
 *
 * @param {Array} profiles The list of profiles.
 * @param {String} service (optional) Service to filter by.
 */
export const isManagerOrContributorForAnyProfile = ({ profiles, service }) => {
  const filteredProfiles = getProfilesWhereUserHasRole({
    profiles,
    service,
  });
  return filteredProfiles.length > 0;
};
