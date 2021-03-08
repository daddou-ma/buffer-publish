import { connect } from 'react-redux';
import { actions as profileActions } from '@bufferapp/publish-profile-sidebar';
import { actions as orgActions } from '@bufferapp/publish-data-organizations';
import getOrgIdFromRoute from './utils/getOrgIdFromRoute';

import AppPages from './components/AppPages';

export default connect(
  state => {
    const currentPath = state.router.location?.pathname;
    const profiles = state.profileSidebar.profileList;
    const orgIdFromRoute = getOrgIdFromRoute({ currentPath, profiles });

    return {
      unfilteredProfiles: profiles,
      showBusinessTrialistsOnboarding:
        state.organizations.selected?.showBusinessTrialistsOnboarding,
      orgIdFromRoute,
    };
  },
  dispatch => ({
    profileRouteLoaded: ({ profile, tabId }) => {
      dispatch(
        profileActions.handleProfileRouteLoaded({
          selectedProfile: profile,
          tabId,
        })
      );
    },
    storeSelectedOrg: currentOrgId => {
      dispatch(orgActions.setCurrentOrganization(currentOrgId));
    },
  })
)(AppPages);
