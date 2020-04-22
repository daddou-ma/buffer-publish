import React, { Fragment } from 'react';
import { Divider } from '@bufferapp/components';
import DateTimePreferences from '@bufferapp/date-time-preferences';
import LanguagePreferences from '@bufferapp/language-preferences';
import { Text } from '@bufferapp/ui';

const General = () => (
  <Fragment>
    <Text type="h2">General</Text>
    <Text type="p">Change your general preferences.</Text>
    <Divider />
    <DateTimePreferences />
    <LanguagePreferences />
  </Fragment>
);

export default General;
