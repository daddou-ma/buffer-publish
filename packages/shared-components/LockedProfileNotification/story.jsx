import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import LockedProfileNotification from './index';

storiesOf('Locked Profile Notification', module)
  .addDecorator(checkA11y)
  .add('free user', () => (
    <LockedProfileNotification
      type={'free'}
      onClickUpgrade={action('onClickUpgrade')}
      profileLimit={3}
    />
  ))
  .add('pro user', () => (
    <LockedProfileNotification
      type={'pro'}
      onClickUpgrade={action('onClickUpgrade')}
      profileLimit={8}
    />
  ))
  .add('business', () => (
    <LockedProfileNotification
      type={'business'}
      onClickUpgrade={action('onClickUpgrade')}
      profileLimit={100}
    />
  ))
  .add('team member', () => (
    <LockedProfileNotification
      type={'teamMember'}
    />
  ));
