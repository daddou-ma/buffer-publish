import React, { Fragment } from 'react';
import { Divider } from '@bufferapp/components';
import CloseAccount from '@bufferapp/close-account';
import DateTimePreferences from '@bufferapp/date-time-preferences';
import { Text } from '@bufferapp/ui';

const closeStyle = {
  paddingBottom: '1rem',
};

const General = () => (
  <Fragment>
    <Text type="h2">General</Text>
    <Text type="p">Change your general preferences.</Text>
    <Divider />
    <DateTimePreferences />
    <div style={closeStyle}>
      <Divider />
      <CloseAccount />
    </div>
  </Fragment>
);

export default General;
