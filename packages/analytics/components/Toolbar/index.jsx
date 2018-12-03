import React from 'react';
import DatePicker from '@bufferapp/analyze-date-picker';
import ExportPicker from '@bufferapp/analyze-export-picker';

const toolbarExport = {
  marginRight: '10px',
};

const toolbarRight = {
  display: 'flex',
  justifyContent: 'flex-end',
  alignContent: 'center',
  padding: '0.75rem 0',
};

const Toolbar = () => (
  <div style={toolbarRight}>
    <div style={toolbarExport}>
      <DatePicker />
    </div>
    <ExportPicker filename={'buffer-analytics'} />
  </div>
);

export default Toolbar;
