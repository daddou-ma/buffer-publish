import React, { Fragment } from 'react';
import { Divider } from '@bufferapp/components';
import DateTimePreferences from '@bufferapp/date-time-preferences';
import { Text } from '@bufferapp/ui';

const General = () => (
  <Fragment>
    <Text type="h2">General</Text>
    <Text type="p">Change your general preferences.</Text>
    <Divider />
    <DateTimePreferences />
  </Fragment>
);

export default General;
