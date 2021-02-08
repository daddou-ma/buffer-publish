import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  preferencesPage,
  profilePages,
  plansPage,
  newBusinessTrialists,
  newConnection,
  campaignsPage,
} from '@bufferapp/publish-routes';
import { filterProfilesByOrg } from '@bufferapp/publish-profile-sidebar/utils';
import PagesWithSidebar from '@bufferapp/publish-app-pages/components/PagesWithSidebar';
import ProfilePages from '@bufferapp/publish-app-pages/components/ProfilePages';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';
import { useUser, useOrgSwitcher } from '@bufferapp/app-shell';

const AppPages = ({
  unfilteredProfiles,
  showBusinessTrialistsOnboarding,
  profileRouteLoaded,
  setCurrentOrganization,
  orgIdFromRoute,
}) => {
  // Get current selected org from appshell
  const user = useUser();
  const selectedOrgId = user?.currentOrganization?.id;

  // se nesta altura não houver resposta do pedido de graphql isto lixa-se tudo
  const currentOrgId = orgIdFromRoute || selectedOrgId;
  const needsToSetNewCurrentOrg = selectedOrgId !== orgIdFromRoute;

  // Filters profiles by current org selected
  const profiles = filterProfilesByOrg(unfilteredProfiles, {
    id: currentOrgId,
  });

  console.log({
    user,
    selectedOrgId,
    currentOrgId,
    orgIdFromRoute,
    needsToSetNewCurrentOrg,
    unfilteredProfiles,
    profiles,
  });

  const switchOrganization = useOrgSwitcher();
  // If org coming from route doesn't match the last org stored, select and store the new value
  useEffect(() => {
    if (needsToSetNewCurrentOrg) {
      switchOrganization(currentOrgId, {
        onCompleted: id => {
          console.info(`organization selected ${id}`);
          setCurrentOrganization(currentOrgId);
        },
      });
    }
  }, [currentOrgId]);

  const redirectToQueue = () => {
    const selectedProfileId =
      Array.isArray(profiles) && !!profiles.length && profiles[0].id;
    const newPath = profilePages.getRoute({ profileId: selectedProfileId });
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
