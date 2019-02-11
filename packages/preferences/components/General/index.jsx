import React, { Fragment } from 'react';
import { Divider } from '@bufferapp/components';
import CloseAccount from '@bufferapp/close-account';
import EditEmail from '@bufferapp/edit-email';
import DateTimePreferences from '@bufferapp/date-time-preferences';

const closeStyle = {
  paddingBottom: '1rem',
};

const General = () => (
  <Fragment>
    <div>
      <EditEmail />
      <Divider />
      <DateTimePreferences />
    </div>
    <div style={closeStyle}>
      <Divider />
      <CloseAccount />
    </div>
  </Fragment>
);

export default General;
