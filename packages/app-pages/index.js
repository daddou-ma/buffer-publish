import { connect } from 'react-redux';
import { actions as orgActions } from '@bufferapp/publish-data-organizations/reducer';
import { actions as profileActions } from '@bufferapp/publish-profile-sidebar';
import {
  getParams,
  organization,
  getProfilesParams,
} from '@bufferapp/publish-routes';

import { filterProfilesByOrg } from '@bufferapp/publish-profile-sidebar/utils';
import AppPages from './components/AppPages';

export default connect(
  state => {
    const selectedOrgId = state.organizations?.selected?.id;
    const currentPath = state.router.location?.pathname;
    const profiles = state.publishProfiles;
    const { hasOrgSwitcherFeature } = state.user;

    // Verify if it is an org route and get id param
    const orgRouteParams = getParams({
      pathname: currentPath,
      route: organization.route,
    });

    // Verify if it is a profile route and get profileId param
    const profileRouteParams = getProfilesParams({
      pathname: currentPath,
    });

    // Get profile object matching the profileId
    const profileFromRoute =
      profileRouteParams &&
      profiles?.filter(
        profile => profile.id === profileRouteParams.profileId
      )[0];

    // Get org from either org or profile route
    const orgIdFromRoute =
      orgRouteParams?.id || profileFromRoute?.organizationId;

    const currentOrgId = orgIdFromRoute || selectedOrgId;

    const filteredProfiles = filterProfilesByOrg(
      profiles,
      { id: currentOrgId },
      hasOrgSwitcherFeature
    );

    return {
      profiles: filteredProfiles,
      showBusinessTrialistsOnboarding:
        state.user.showBusinessTrialistsOnboarding,
      needsToSetCurrentOrg: selectedOrgId !== currentOrgId,
      currentOrgId,
    };
  },
  dispatch => ({
    setCurrentOrganization: currentOrg => {
      dispatch(orgActions.setCurrentOrganization(currentOrg));
    },
    profileRouteLoaded: ({ profile, tabId }) => {
      dispatch(
        profileActions.handleProfileRouteLoaded({
          selectedProfile: profile,
          tabId,
        })
      );
    },
  })
)(AppPages);
