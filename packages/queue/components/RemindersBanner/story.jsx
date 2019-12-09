import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import RemindersBanner from './index';

storiesOf('Queue|RemindersBanner', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <RemindersBanner onSetRemindersClick={action('on-click')} />
  ));
