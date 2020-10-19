import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import InstagramPersonalProfileNotification from '@bufferapp/publish-ig-personal-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';

import Notification from '../Notification';
import ProfileHeader from '../ProfileHeader';

/**
 * Lazy load the Analyze components and their deps - this helps
 * prevent us from loading a lot of unecessary code for non-biz
 * profiles / users.
 */
const LazyAnalyticsList = lazy(() =>
  import(/* webpackChunkName: "analyze" */ '../AnalyticsList')
);
const ErrorBoundary = getErrorBoundary(true);

const AnalyticsList = ({
  profile,
  isAnalyticsSupported,
  isLockedProfile,
  hasBitlyFeature,
  isInstagramBusiness,
  fetchProfiles,
  selectProfile,
  linkShortening,
  hasBitlyPosts,
  shouldDisplayIGPersonalNotification,
}) => {
  if (shouldDisplayIGPersonalNotification) {
    return <InstagramPersonalProfileNotification />;
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  if (isAnalyticsSupported) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <LazyAnalyticsList
            hasBitlyFeature={hasBitlyFeature}
            profile={profile}
            isInstagramBusiness={isInstagramBusiness}
            fetchProfiles={fetchProfiles}
            selectProfile={selectProfile}
            linkShortening={linkShortening}
            hasBitlyPosts={hasBitlyPosts}
          />
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <Notification
      isInstagramBusiness={isInstagramBusiness}
      service={profile.service}
    />
  );
};

AnalyticsList.propTypes = {
  hasBitlyFeature: PropTypes.bool.isRequired,
  isAnalyticsSupported: PropTypes.bool,
  profile: PropTypes.shape(ProfileHeader.propTypes),
  isLockedProfile: PropTypes.bool,
  isInstagramBusiness: PropTypes.bool.isRequired,
  fetchProfiles: PropTypes.func.isRequired,
  selectProfile: PropTypes.func.isRequired,
  linkShortening: PropTypes.shape({
    isBitlyConnected: PropTypes.bool,
  }).isRequired,
  hasBitlyPosts: PropTypes.bool.isRequired,
  shouldDisplayIGPersonalNotification: PropTypes.bool,
};

AnalyticsList.defaultProps = {
  isAnalyticsSupported: null,
  profile: null,
  isLockedProfile: false,
  shouldDisplayIGPersonalNotification: false,
};

export default AnalyticsList;
