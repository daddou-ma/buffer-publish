import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import Notification from './index';

storiesOf('Unsupported Notification', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <Notification />
));
