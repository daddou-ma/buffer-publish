import React from 'react';
import AverageTable from '@bufferapp/average-table';
import CompareChart from '@bufferapp/compare-chart';
import HourlyChart from '@bufferapp/hourly-chart';
import SummaryTable from '@bufferapp/summary-table';
import Toolbar from './components/Toolbar';
import './analytics.css';

const Analytics = () => (
  <div>
    <Toolbar />
    <SummaryTable />
    <AverageTable />
    <CompareChart />
    <HourlyChart />
  </div>
);

export default Analytics;
