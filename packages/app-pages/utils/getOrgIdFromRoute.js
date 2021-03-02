import {
  getParams,
  organization,
  getProfilesParams,
} from '@bufferapp/publish-routes';

const getOrgIdFromRoute = ({ currentPath, profiles }) => {
  // Verify if it is an org route and get id param
  const orgRouteParams = getParams({
    pathname: currentPath,
    route: organization.route,
  });

  // Verify if it is a profile route and get profileId param
  const profileRouteParams = getProfilesParams({
    pathname: currentPath,
  });

  // Get profile object matching the profileId, to then access the organizationId prop
  const profileFromRoute =
    profileRouteParams &&
    profiles?.filter(profile => profile.id === profileRouteParams.profileId)[0];

  // Get org from either org or profile route
  const orgIdFromRoute = orgRouteParams?.id || profileFromRoute?.organizationId;

  return orgIdFromRoute;
};
export default getOrgIdFromRoute;
