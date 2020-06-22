import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfilePage from '@bufferapp/profile-page';
import {
  profilePages,
  profileTabPages,
  profileChildTabPages,
  getProfilesParams,
} from '@bufferapp/publish-routes';

const ProfilePages = ({ profiles, location, profileRouteLoaded }) => {
  const { pathname } = location;
  const params = getProfilesParams({
    pathname,
  });
  const { profileId, tabId } = params;

  const profile =
    profileId && profiles && [...profiles].find(p => p.id === profileId);

  useEffect(() => {
    if (profile) {
      profileRouteLoaded({ profile, tabId });
    }
  }, []);

  return (
    <Switch>
      {profile && (
        <Route path={profileChildTabPages.route} component={ProfilePage} />
      )}
      {profile && (
        <Route path={profileTabPages.route} component={ProfilePage} />
      )}
      {profile && (
        <Redirect
          from={profilePages.route}
          to="/profile/:profileId/tab/queue"
        />
      )}
      <Redirect to="/" />
    </Switch>
  );
};

ProfilePages.propTypes = {
  profiles: PropTypes.arrayOf(PropTypes.object).isRequired,
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  profileRouteLoaded: PropTypes.func.isRequired,
};

export default ProfilePages;
