import React from 'react';
import PropTypes from 'prop-types';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import PostsTable from '@bufferapp/posts-table';
import SummaryTable from '@bufferapp/summary-table';
import { BusinessTrialOrUpgradeCard } from '@bufferapp/publish-shared-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { trackAction } from '@bufferapp/publish-data-tracking';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';

import Toolbar from '../Toolbar';
import Notification from '../Notification';
import ProfileHeader from '../ProfileHeader';

import './analytics.css';

const ErrorBoundary = getErrorBoundary(true);

const AnalyticsList = ({
  features,
  profile,
  isAnalyticsSupported,
  isLockedProfile,
  canStartBusinessTrial,
  isBusinessAccount,
  isInstagramBusiness,
}) => {
  // user is either a free or pro and is not a team member
  if (!isBusinessAccount && (features.isProUser() || features.isFreeUser())) {
    const startTrial = () =>
      window.location.assign(`${getURL.getStartTrialURL({
        trialType: 'small',
        cta: SEGMENT_NAMES.ANALYTICS_OVERVIEW_SBP_TRIAL,
        nextUrl: 'https://publish.buffer.com',
      })}`);
    const goToBilling = () => window.location.assign(`${getURL.getBillingURL({
      cta: SEGMENT_NAMES.ANALYTICS_OVERVIEW_BUSINESS_UPGRADE,
    })}`);
    const trackAndGo = ({ location, action, afterTracked }) => {
      trackAction({
        location,
        action,
      }, {
        success: afterTracked,
        error: afterTracked,
      });
    };
    if (canStartBusinessTrial) {
      return (<BusinessTrialOrUpgradeCard
        heading="Unlock Great Insights"
        body="Gain a deeper understanding of how you are performing on social media with advanced analytics."
        cta="Start a Free 14-Day Trial of the Business Plan"
        onCtaClick={() => {
          trackAndGo({
            location: 'analytics',
            action: 'unlock_insights_b4b_trial_start_click',
            afterTracked: startTrial,
          });
        }}
        backgroundImage="circles"
      />);
    }
    return (<BusinessTrialOrUpgradeCard
      heading="Unlock Great Insights"
      body="Gain a deeper understanding of how you are performing on social media with advanced analytics."
      cta="Upgrade to Buffer for Business"
      onCtaClick={() => {
        trackAndGo({
          location: 'analytics',
          action: 'unlock_insights_b4b_upgrade_click',
          afterTracked: goToBilling,
        });
      }}
      backgroundImage="circles"
    />);
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  if (isAnalyticsSupported) {
    return (
      <ErrorBoundary>
        <div id="analytics">
          <Toolbar profile={profile} />
          {!isInstagramBusiness &&
            <SummaryTable />
          }
          <CompareChart />
          {!isInstagramBusiness &&
            <React.Fragment>
              <AverageTable />
              <PostsTable />
            </React.Fragment>
          }
        </div>
      </ErrorBoundary>
    );
  }

  return <Notification isInstagramBusiness={isInstagramBusiness} service={profile.service} />;
};

AnalyticsList.propTypes = {
  features: PropTypes.object.isRequired, // eslint-disable-line
  canStartBusinessTrial: PropTypes.bool.isRequired,
  isAnalyticsSupported: PropTypes.bool,
  profile: PropTypes.shape(ProfileHeader.propTypes),
  isLockedProfile: PropTypes.bool,
  isBusinessAccount: PropTypes.bool.isRequired,
  isInstagramBusiness: PropTypes.bool.isRequired,
};

AnalyticsList.defaultProps = {
  isAnalyticsSupported: null,
  profile: null,
  isLockedProfile: false,
};

export default WithFeatureLoader(AnalyticsList);
