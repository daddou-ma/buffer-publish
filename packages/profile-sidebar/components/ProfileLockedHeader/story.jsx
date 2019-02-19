import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import ProfileLockedHeader from './index';

const translations = {
  lockedList: 'Locked Social Accounts',
  lockedListTooltip1: 'Sorry, your current plan lets you access 3 accounts',
  lockedListTooltip2: `social accounts at the same time (and any business accounts you’re a
    team member on as long as the owner is on a Business Plan). We’ll keep these other ones
    safe and sound until you’re ready to upgrade!`,
};

storiesOf('ProfileLockedHeader', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <ProfileLockedHeader
      profileLimit={3}
      translations={translations}
    />
  ));
