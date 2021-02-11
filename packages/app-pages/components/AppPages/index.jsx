import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  campaignsPage,
  newBusinessTrialists,
  newConnection,
  plansPage,
  preferencesPage,
  profilePages,
} from '@bufferapp/publish-routes';
import { filterProfilesByOrg } from '@bufferapp/publish-profile-sidebar/utils';
import PagesWithSidebar from '@bufferapp/publish-app-pages/components/PagesWithSidebar';
import ProfilePages from '@bufferapp/publish-app-pages/components/ProfilePages';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';
import { useOrgSwitcher, useUser } from '@bufferapp/app-shell';

const AppPages = ({
  unfilteredProfiles,
  showBusinessTrialistsOnboarding,
  profileRouteLoaded,
  orgIdFromRoute,
  routeChangedFromAppShell,
}) => {
  // Get current selected org from appshell
  const user = useUser();
  const selectedOrgInAppShell = user?.currentOrganization?.id;

  const currentOrgId = orgIdFromRoute || selectedOrgInAppShell;
  const needsToSelectNewOrgInAppShell =
    selectedOrgInAppShell !== orgIdFromRoute && !!orgIdFromRoute;

  // Filters profiles by current org selected
  const profiles = filterProfilesByOrg(unfilteredProfiles, {
    id: currentOrgId,
  });

  console.log({
    selectedOrgInAppShell,
    currentOrgId,
    orgIdFromRoute,
    needsToSelectNewOrgInAppShell,
    profiles,
    routeChangedFromAppShell,
  });

  const switchOrganization = useOrgSwitcher();
  // If org coming from route doesn't match the last org stored, select and store the new value
  useEffect(() => {
    if (needsToSelectNewOrgInAppShell && !routeChangedFromAppShell) {
      switchOrganization(currentOrgId, {
        onCompleted: id => {
          console.info(`organization selected ${id}`);
          // add tracking here;
        },
      });
    }
  }, [needsToSelectNewOrgInAppShell]);

  const redirectToQueue = () => {
    const selectedProfileId =
      Array.isArray(profiles) && !!profiles.length && profiles[0].id;
    const newPath = profilePages.getRoute({ profileId: selectedProfileId });
    return (
      <Redirect
        to={{
          pathname: newPath,
          state: { routeChangedFromAppShell },
        }}
      />
    );
  };
  const hasProfiles = profiles && profiles.length > 0;

  return (
    <Switch>
      <Route path={preferencesPage.route} component={Preferences} />
      <Route path={plansPage.route} component={Plans} />

      {!hasProfiles && (
        <Route
          path={newBusinessTrialists.route}
          component={OnboardingManager}
        />
      )}
      {!hasProfiles && showBusinessTrialistsOnboarding && (
        <Redirect to={newBusinessTrialists.route} />
      )}

      {!hasProfiles && (
        <Route path={newConnection.route} component={DefaultPage} />
      )}
      {!hasProfiles && <Redirect to={newConnection.route} />}

      <Route path={campaignsPage.route} component={PagesWithSidebar} />
      <Route
        path={profilePages.route}
        render={props => (
          <ProfilePages
            profiles={profiles}
            profileRouteLoaded={profileRouteLoaded}
            {...props}
          />
        )}
      />

      <Route>{redirectToQueue()}</Route>
    </Switch>
  );
};

AppPages.propTypes = {
  unfilteredProfiles: PropTypes.arrayOf(PropTypes.object),
  showBusinessTrialistsOnboarding: PropTypes.bool,
  profileRouteLoaded: PropTypes.func.isRequired,
  needsToSetCurrentOrg: PropTypes.bool,
  orgIdFromRoute: PropTypes.string,
  setCurrentOrganization: PropTypes.func,
};

AppPages.defaultProps = {
  showBusinessTrialistsOnboarding: false,
  unfilteredProfiles: [],
  needsToSetCurrentOrg: false,
  orgIdFromRoute: null,
  setCurrentOrganization: () => {},
};

export default AppPages;
