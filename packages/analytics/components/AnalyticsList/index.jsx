import React from 'react';
import PropTypes from 'prop-types';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import PostsTable from '@bufferapp/posts-table';
import SummaryTable from '@bufferapp/summary-table';
import Toolbar from '../Toolbar';
import './analytics.css';

const AnalyticsList = ({ profileService }) => (
  (profileService === 'twitter' || profileService === 'facebook') ?
    <div>
      <Toolbar />
      <SummaryTable />
      <AverageTable />
      <CompareChart />
      <PostsTable />
    </div> :
    <p>Whoops! Analytics are not supported for this social account.</p>
);


AnalyticsList.propTypes = {
  profileService: PropTypes.string,
};

AnalyticsList.defaultProps = {
  profileService: null,
};

export default AnalyticsList;
