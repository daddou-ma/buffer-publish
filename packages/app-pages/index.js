import { connect } from 'react-redux';
import { actions as orgActions } from '@bufferapp/publish-data-organizations/reducer';
import { actions as profileActions } from '@bufferapp/publish-profile-sidebar';
import getOrgIdFromRoute from './utils/getOrgIdFromRoute';

import AppPages from './components/AppPages';

export default connect(
  state => {
    const currentPath = state.router.location?.pathname;
    const routeChangedFromAppShell =
      state.router.location?.state?.routeChangedFromAppShell;
    const profiles = state.profileSidebar.profileList;

    const orgIdFromRoute = getOrgIdFromRoute({ currentPath, profiles });

    return {
      unfilteredProfiles: profiles,
      showBusinessTrialistsOnboarding:
        state.organizations.selected?.showBusinessTrialistsOnboarding,
      orgIdFromRoute,
      routeChangedFromAppShell,
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
