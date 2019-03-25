import React from 'react';
import PropTypes from 'prop-types';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import HourlyChart from '@bufferapp/hourly-chart';
import PostsTable from '@bufferapp/posts-table';
import SummaryTable from '@bufferapp/summary-table';
import { BusinessTrialOrUpgradeCard } from '@bufferapp/publish-shared-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { trackAction } from '@bufferapp/publish-data-tracking';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';

import Toolbar from '../Toolbar';
import Notification from '../Notification';
import ProfileHeader from '../ProfileHeader';

import './analytics.css';

const AnalyticsList = ({
  features,
  profile,
  isAnalyticsSupported,
  isLockedProfile,
  canStartBusinessTrial,
  isBusinessAccount,
}) => {
  // user is either a free or pro and is not a team member
  if (!isBusinessAccount && (features.isProUser() || features.isFreeUser())) {
    const startTrial = () => window.location.assign('https://buffer.com/billing/start-trial?trialType=small&next=https://publish.buffer.com');
    const goToBilling = () => window.location.assign('https://buffer.com/app/account/receipts?content_only=true');
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
        onCtaClick={() => { trackAndGo({ location: 'analytics', action: 'unlock_insights_b4b_trial_start_click', afterTracked: startTrial }); }}
        backgroundImage="circles"
      />);
    }
    return (<BusinessTrialOrUpgradeCard
      heading="Unlock Great Insights"
      body="Gain a deeper understanding of how you are performing on social media with advanced analytics."
      cta="Upgrade to Buffer for Business"
      onCtaClick={() => { trackAndGo({ location: 'analytics', action: 'unlock_insights_b4b_upgrade_click', afterTracked: goToBilling }); }}
      backgroundImage="circles"
    />);
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  if (isAnalyticsSupported) {
    return (
      <div id="analytics">
        <Toolbar profile={profile} />
        <SummaryTable />
        <CompareChart />
        <HourlyChart />
        <AverageTable />
        <PostsTable />
      </div>
    );
  }

  return <Notification />;
};

AnalyticsList.propTypes = {
  features: PropTypes.object.isRequired, // eslint-disable-line
  canStartBusinessTrial: PropTypes.bool.isRequired,
  isAnalyticsSupported: PropTypes.bool,
  profile: PropTypes.shape(ProfileHeader.propTypes),
  isLockedProfile: PropTypes.bool,
  onClickUpgrade: PropTypes.func.isRequired,
  isBusinessAccount: PropTypes.bool.isRequired,
};

AnalyticsList.defaultProps = {
  isAnalyticsSupported: null,
  profile: null,
  isLockedProfile: false,
};

export default WithFeatureLoader(AnalyticsList);
