import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import Notifications from './index';

storiesOf('EmailNotificationsPage', module)
  .addDecorator(withA11y)
  .add('default', () => <Notifications />);
