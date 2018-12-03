import React from 'react';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import PostsTable from '@bufferapp/posts-table';
import SummaryTable from '@bufferapp/summary-table';
import Toolbar from './components/Toolbar';
import './analytics.css';

const Analytics = () => (
  <div>
    <Toolbar />
    <SummaryTable />
    <AverageTable />
    <CompareChart />
    <PostsTable />
  </div>
);

export default Analytics;
