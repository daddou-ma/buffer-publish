import React from 'react';
import PropTypes from 'prop-types';

// Analyze Components
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import PostsTable from '@bufferapp/posts-table';
import SummaryTable from '@bufferapp/summary-table';

import Toolbar from '../Toolbar';

import './analytics.css';
import './store'; // Injects reducers and middlewares

const AnalyticsList = ({ profile, isInstagramBusiness }) => {
  return (
    <div id="analytics">
      <Toolbar profile={profile} />
      {!isInstagramBusiness && <SummaryTable />}
      <CompareChart />
      {!isInstagramBusiness && (
        <React.Fragment>
          <AverageTable />
          <PostsTable />
        </React.Fragment>
      )}
    </div>
  );
};

AnalyticsList.propTypes = {
  profile: PropTypes.object.isRequired, // eslint-disable-line
  isInstagramBusiness: PropTypes.bool.isRequired,
};

export default AnalyticsList;
