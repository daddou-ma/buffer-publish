import React from 'react';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import SummaryTable from '@bufferapp/summary-table';
import Toolbar from './components/Toolbar';
import './analytics.css';

const Analytics = () => (
  <div>
    <Toolbar />
    <SummaryTable />
    <AverageTable />
    <CompareChart />
  </div>
);

export default Analytics;
