import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import ScheduleSettingHeader from './index';

const profileName = 'Buffer Admin';
const profileService = 'Twitter';
const profileServiceType = 'Profile';
const timezoneOptions = [
  { value: 'London', name: 'London' },
  { value: 'New York', name: 'New York' },
  { value: 'San Francisco', name: 'San Francisco' },
  { value: 'Tokyo', name: 'Tokyo' },
];

storiesOf('ScheduleSettingHeader', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <ScheduleSettingHeader
      profileName={profileName}
      profileService={profileService}
      profileServiceType={profileServiceType}
      timezoneOptions={timezoneOptions}
    />
  ));
