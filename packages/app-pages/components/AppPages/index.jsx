import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  profilePageRoute,
  preferencePageRoute,
  childTabRoute,
  plansPageRoute,
  newBusinessTrialistsRoute,
  newConnectionRoute,
  generateProfilePageRoute,
  campaignRoute,
  campaignsCreateRoute,
  campaignsPageRoute,
} from '@bufferapp/publish-routes';
import ProfilePage from '@bufferapp/profile-page';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';
import Campaigns from '@bufferapp/publish-campaigns';

const AppPages = ({ profiles, isOnBusinessTrial }) => {
  const hasProfiles = profiles && profiles.length > 0;
  const redirectToQueue = () => {
    const selectedProfileId =
      Array.isArray(profiles) && !!profiles.length && profiles[0].id;
    const newPath = generateProfilePageRoute({ profileId: selectedProfileId });
    return <Redirect to={newPath} />;
  };
  return (
    <Switch>
      <Route path={preferencePageRoute} component={Preferences} />
      <Route path={plansPageRoute} component={Plans} />
      <Route path={campaignRoute} component={Campaigns} />
      <Route path={campaignsPageRoute} component={Campaigns} />
      <Route path={campaignsCreateRoute} component={Campaigns} />

      {!hasProfiles && (
        <Route path={newBusinessTrialistsRoute} component={OnboardingManager} />
      )}
      {!hasProfiles && isOnBusinessTrial && (
        <Redirect to={newBusinessTrialistsRoute} />
      )}

      {!hasProfiles && (
        <Route path={newConnectionRoute} component={DefaultPage} />
      )}
      {!hasProfiles && <Redirect to={newConnectionRoute} />}

      <Route path={childTabRoute} component={ProfilePage} />
      <Route path={profilePageRoute} component={ProfilePage} />

      <Route>{redirectToQueue()}</Route>
    </Switch>
  );
};

AppPages.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object),
  isOnBusinessTrial: PropTypes.bool,
};

AppPages.defaultProps = {
  isOnBusinessTrial: false,
  profiles: [],
};

export default AppPages;
