import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import LockedProfileNotification from './index';

storiesOf('Locked Profile Notification', module)
  .addDecorator(withA11y)
  .add('free user', () => (
    <LockedProfileNotification
      onClickUpgrade={action('onClickUpgrade')}
      profileLimit={3}
      isOwner
      planBase="free"
    />
  ))
  .add('pro user', () => (
    <LockedProfileNotification
      onClickUpgrade={action('onClickUpgrade')}
      profileLimit={8}
      isOwner
      planBase="pro"
    />
  ))
  .add('business', () => (
    <LockedProfileNotification
      onClickUpgrade={action('onClickUpgrade')}
      profileLimit={100}
      isOwner
      planBase="business"
    />
  ))
  .add('teamMember', () => (
    <LockedProfileNotification
      isOwner={false}
      ownerEmail="ana@buffer.com"
      planBase="free"
    />
  ));
