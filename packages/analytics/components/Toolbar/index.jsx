import React from 'react';
import { Toolbar as AnalyticsToolbar } from '@bufferapp/analyze-shared-components';
import DatePicker from '@bufferapp/analyze-date-picker';

const toolbarDatePicker = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginLeft: 'auto',
};

const Toolbar = () => (
  <AnalyticsToolbar>
    <div style={toolbarDatePicker}>
      <DatePicker />
    </div>
  </AnalyticsToolbar>
);

export default Toolbar;
