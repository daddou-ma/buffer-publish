import React from 'react';
import PropTypes from 'prop-types';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import HourlyChart from '@bufferapp/hourly-chart';
import PostsTable from '@bufferapp/posts-table';
import SummaryTable from '@bufferapp/summary-table';
import { LockedProfileNotification } from '@bufferapp/publish-shared-components';
import Toolbar from '../Toolbar';
import Notification from '../Notification';
import ProfileHeader from '../ProfileHeader';
import './analytics.css';

const AnalyticsList = ({
  profile,
  isAnalyticsSupported,
  isLockedProfile,
  onClickUpgradeToPro,
}) => {
  if (isLockedProfile) {
    return (
      <LockedProfileNotification onClickUpgradeToPro={onClickUpgradeToPro} />
    );
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
  isAnalyticsSupported: PropTypes.bool,
  profile: PropTypes.shape(ProfileHeader.propTypes),
  isLockedProfile: PropTypes.bool,
  onClickUpgradeToPro: PropTypes.func.isRequired,
};

AnalyticsList.defaultProps = {
  isAnalyticsSupported: null,
  profile: null,
  isLockedProfile: false,
};

export default AnalyticsList;
