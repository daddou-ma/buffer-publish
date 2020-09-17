import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import TemporaryDashboardBanner from './index';

const enabledApplicationTemp = [
  {
    state: 'enabled',
    tag: 'temporary-dashboard-banner',
    content: '<b>Temporary dashboard</b> content here',
  },
];

const enabledApplicationNoTemp = [
  {
    state: 'enabled',
    tag: 'test-tag',
    content: '<b>Temporary dashboard</b> content here',
  },
];

storiesOf('TemporaryDashboardBanner', module)
  .addDecorator(withA11y)
  .add('should show TemporaryDashboardBanner', () => (
    <TemporaryDashboardBanner
      enabledApplicationModes={enabledApplicationTemp}
    />
  ))
  .add('should not show TemporaryDashboardBanner', () => (
    <TemporaryDashboardBanner
      enabledApplicationModes={enabledApplicationNoTemp}
    />
  ))
  .add(
    'should not show TemporaryDashboardBanner if enabledApplication is empty',
    () => <TemporaryDashboardBanner enabledApplicationModes={[]} />
  )
  .add(
    'should not show TemporaryDashboardBanner if enabledApplication is null',
    () => <TemporaryDashboardBanner enabledApplicationModes={null} />
  )
  .add(
    'should show IGRetirementBanner if displayIGRetirementBanner is true',
    () => (
      <TemporaryDashboardBanner
        enabledApplicationModes={null}
        displayIGRetirementBanner
      />
    )
  );
