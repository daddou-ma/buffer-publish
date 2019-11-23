import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import PropTypes from 'prop-types';
import {
  profilePageRoute,
  preferencePageRoute,
  childTabRoute,
  plansPageRoute,
  newBusinessTrialistsRoute,
  newConnectionRoute,
  generateProfilePageRoute,
} from '@bufferapp/publish-routes';
import ProfilePage from '@bufferapp/profile-page';
import Preferences from '@bufferapp/publish-preferences';
import Plans from '@bufferapp/publish-plans';
import DefaultPage from '@bufferapp/default-page';
import OnboardingManager from '@bufferapp/publish-onboarding';

const AppPages = ({ profiles, hasProfiles, isOnBusinessTrial }) => {
  const redirectToQueue = () => {
    const selectedProfileId = profiles[0].id;
    const newPath = generateProfilePageRoute({ profileId: selectedProfileId });
    return <Redirect to={newPath} />;
  };
  return (
    <Switch>
      <Route path={preferencePageRoute} component={Preferences} />
      <Route path={plansPageRoute} component={Plans} />

      {!hasProfiles && isOnBusinessTrial && (
        <Redirect to={newBusinessTrialistsRoute} />
      )}

      {!hasProfiles && <Redirect to={newConnectionRoute} />}

      <Route path={childTabRoute} component={ProfilePage} />
      <Route path={profilePageRoute} component={ProfilePage} />

      <Route path={newConnectionRoute} component={DefaultPage} />
      <Route path={newBusinessTrialistsRoute} component={OnboardingManager} />
      <Route>{redirectToQueue()}</Route>
    </Switch>
  );
};

AppPages.propTypes = {
  profiles: PropTypes.shape,
  hasProfiles: PropTypes.bool,
  isOnBusinessTrial: PropTypes.bool,
};

AppPages.defaultProps = {
  hasProfiles: false,
  isOnBusinessTrial: false,
  profiles: {},
};

export default AppPages;
