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
  profileTabPages,
} from '@bufferapp/publish-routes';
import PagesWithSidebar from '@bufferapp/publish-app-pages/components/PagesWithSidebar';
import ProfilePages from '@bufferapp/publish-app-pages/components/ProfilePages';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';

const AppPages = ({
  profiles,
  showBusinessTrialistsOnboarding,
  profileRouteLoaded,
  needsToSelectNewOrgInAppShell,
  currentOrgId,
  selectedOrgInAppShell,
  switchOrganization,
  orgIdFromRoute,
}) => {
  console.log(
    {
      profiles,
      needsToSelectNewOrgInAppShell,
      currentOrgId,
      selectedOrgInAppShell,
      orgIdFromRoute,
    },
    new Date()
  );

  // If org coming from route doesn't match the last org stored, select and store the new value
  useEffect(() => {
    console.log('mudooooou', new Date());
    if (needsToSelectNewOrgInAppShell) {
      switchOrganization(currentOrgId);
    }
  }, [currentOrgId]);

  const redirectToQueue = () => {
    const selectedProfileId =
      Array.isArray(profiles) && !!profiles.length && profiles[0].id;
    const newPath = profileTabPages.getRoute({
      profileId: selectedProfileId,
      tabId: 'queue',
    });
    return <Redirect to={newPath} />;
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
  switchOrganization: PropTypes.func,
};

AppPages.defaultProps = {
  showBusinessTrialistsOnboarding: false,
  unfilteredProfiles: [],
  needsToSetCurrentOrg: false,
  orgIdFromRoute: null,
  switchOrganization: () => {},
};

export default AppPages;
