import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import Notification from './index';

storiesOf('Analytics Notification', module)
  .addDecorator(checkA11y)
  .add('should display notification if analytics are not supported', () => (
    <Notification />
));
