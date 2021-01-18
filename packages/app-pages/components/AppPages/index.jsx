import React, { useEffect, useContext } from 'react';
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
import PagesWithSidebar from '@bufferapp/publish-app-pages/components/PagesWithSidebar';
import ProfilePages from '@bufferapp/publish-app-pages/components/ProfilePages';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';
import { UserContext, useOrgSwitcher } from '@bufferapp/app-shell';

const AppPages = ({
  profiles,
  showBusinessTrialistsOnboarding,
  profileRouteLoaded,
  needsToSetCurrentOrg,
  setCurrentOrganization,
  currentOrgId,
}) => {
  const user = useContext(UserContext);
  console.log(user);
  const switchOrganization = useOrgSwitcher();
  const hasProfiles = profiles && profiles.length > 0;
  // If org coming from route doesn't match the last org stored, select and store the new value
  useEffect(() => {
    if (needsToSetCurrentOrg) {
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
  profiles: PropTypes.arrayOf(PropTypes.object),
  showBusinessTrialistsOnboarding: PropTypes.bool,
  profileRouteLoaded: PropTypes.func.isRequired,
  needsToSetCurrentOrg: PropTypes.bool,
  currentOrgId: PropTypes.string,
  setCurrentOrganization: PropTypes.func,
};

AppPages.defaultProps = {
  showBusinessTrialistsOnboarding: false,
  profiles: [],
  needsToSetCurrentOrg: false,
  currentOrgId: null,
  setCurrentOrganization: () => {},
};

export default AppPages;
