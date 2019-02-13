import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import Notifications from './index';


storiesOf('EmailNotificationsPage', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <Notifications />
  ));
