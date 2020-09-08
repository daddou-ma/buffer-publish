import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// Analyze Components
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import PostsTable from '@bufferapp/posts-table';
import SummaryTable from '@bufferapp/summary-table';
import { BitlyClickNotification } from '@bufferapp/publish-shared-components';

import Toolbar from '../Toolbar';

import './analytics.css';
import './store'; // Injects reducers and middlewares

const AnalyticsList = ({
  hasBitlyFeature,
  profile,
  isInstagramBusiness,
  fetchProfiles,
  selectProfile,
  linkShortening,
  hasBitlyPosts,
}) => {
  useEffect(() => {
    // We need to re-fetch profiles to get them into the analyze stores
    // (the stores are lazy-loaded and didn't exist for the initial profile fetch)
    fetchProfiles();
  }, []);

  useEffect(() => {
    // Set selected profile
    selectProfile(profile);
  }, [selectProfile, profile]);

  return (
    <div id="analytics">
      <Toolbar profile={profile} />
      <BitlyClickNotification
        hasBitlyPosts={hasBitlyPosts}
        isBitlyConnected={!!linkShortening.isBitlyConnected}
        isFreeUser={hasBitlyFeature}
        marginAfter
      />
      {!isInstagramBusiness && <SummaryTable />}
      <CompareChart />
      {!isInstagramBusiness && (
        <>
          <AverageTable />
          <PostsTable />
        </>
      )}
    </div>
  );
};

AnalyticsList.propTypes = {
  profile: PropTypes.object.isRequired, // eslint-disable-line
  isInstagramBusiness: PropTypes.bool.isRequired,
  fetchProfiles: PropTypes.func.isRequired,
  selectProfile: PropTypes.func.isRequired,
  hasBitlyFeature: PropTypes.bool.isRequired,
  linkShortening: PropTypes.shape({
    isBitlyConnected: PropTypes.bool,
  }).isRequired,
  hasBitlyPosts: PropTypes.bool.isRequired,
};

export default AnalyticsList;
