import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import LockedProfileNotification from './index';

storiesOf('Locked Profile Notification', module)
  .addDecorator(checkA11y)
  .add('free user', () => (
    <LockedProfileNotification
      plan={'free'}
      onClickUpgrade={action('onClickUpgrade')}
    />
  ))
  .add('pro user', () => (
    <LockedProfileNotification
      plan={'pro'}
      onClickUpgrade={action('onClickUpgrade')}
    />
  ));
