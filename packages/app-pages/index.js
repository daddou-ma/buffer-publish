import { connect } from 'react-redux';
import { actions as profileActions } from '@bufferapp/publish-profile-sidebar';
import { filterProfilesByOrg } from '@bufferapp/publish-profile-sidebar/utils';
import getOrgIdFromRoute from './utils/getOrgIdFromRoute';

import AppPages from './components/AppPages';

export default connect(
  state => {
    const currentPath = state.router.location?.pathname;
    const profiles = state.profileSidebar.profileList;
    const orgIdFromRoute = getOrgIdFromRoute({ currentPath, profiles });
    const selectedOrgInAppShell =
      window._appShell?.user?.currentOrganization?.id;

    const currentOrgId = orgIdFromRoute || selectedOrgInAppShell;

    // Filters profiles by current org selected
    const filteredProfiles = filterProfilesByOrg(profiles, {
      id: currentOrgId,
    });

    return {
      profiles: filteredProfiles,
      showBusinessTrialistsOnboarding:
        state.organizations.selected?.showBusinessTrialistsOnboarding,
      currentOrgId,
      needsToSelectNewOrgInAppShell:
        selectedOrgInAppShell !== currentOrgId && !!selectedOrgInAppShell,
      selectedOrgInAppShell,
      orgIdFromRoute,
      currentPath,
    };
  },
  dispatch => ({
    switchOrganization: currentOrgId => {
      window._appShell.switchOrganization(currentOrgId, {
        onCompleted: id => {
          console.info(`organization selected ${id}`);
          // add tracking here;
        },
      });
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
