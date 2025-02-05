import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  campaignsPage,
  newConnection,
  plansPage,
  preferencesPage,
  profilePages,
  profileTabPages,
} from '@bufferapp/publish-routes';
import { filterProfilesByOrg } from '@bufferapp/publish-profile-sidebar/utils';
import PagesWithSidebar from '@bufferapp/publish-app-pages/components/PagesWithSidebar';
import ProfilePages from '@bufferapp/publish-app-pages/components/ProfilePages';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import { useOrgSwitcher, useUser } from '@bufferapp/app-shell';
// import MissingAccessPage from '../../../missing-access-page/index';

const AppPages = ({
  unfilteredProfiles,
  profileRouteLoaded,
  orgIdFromRoute,
  storeSelectedOrg,
}) => {
  // Get current selected org from appshell
  const user = useUser();
  const selectedOrgInAppShell = user?.currentOrganization?.id;

  const currentOrgId = orgIdFromRoute || selectedOrgInAppShell;
  // We need to update the current org in the AppShell if it doesn't
  // match the org from the user's route. This only applies if
  // route has a valid org (not a null, undefined or empty value).
  const needsToSelectNewOrgInAppShell =
    selectedOrgInAppShell !== orgIdFromRoute && !!orgIdFromRoute;

  // Filters profiles by current org selected
  const profiles = filterProfilesByOrg(unfilteredProfiles, {
    id: currentOrgId,
  });

  // const canAccessPublishing =
  //   user?.currentOrganization?.billing?.canAccessPublishing;

  const switchOrganization = useOrgSwitcher();

  // If org coming from route doesn't match the last org stored, select and store the new value
  useEffect(() => {
    if (needsToSelectNewOrgInAppShell) {
      switchOrganization(currentOrgId);
      storeSelectedOrg(currentOrgId);
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
  profileRouteLoaded: PropTypes.func.isRequired,
  needsToSetCurrentOrg: PropTypes.bool,
  orgIdFromRoute: PropTypes.string,
  switchOrganization: PropTypes.func,
  storeSelectedOrg: PropTypes.func.isRequired,
};

AppPages.defaultProps = {
  unfilteredProfiles: [],
  needsToSetCurrentOrg: false,
  orgIdFromRoute: null,
  switchOrganization: () => {},
};

export default AppPages;
