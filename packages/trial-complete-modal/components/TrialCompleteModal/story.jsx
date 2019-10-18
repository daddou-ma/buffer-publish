import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import TrialCompleteModal from './index';

storiesOf('Modals|TrialCompleteModal', module)
  .addDecorator(withA11y)
  .add('pro user', () => (
    <TrialCompleteModal
      translations={translations['trial-complete-modal']}
      cancelTrial={action('cancel-clicked')}
      completeAndUpgrade={action('complete-clicked')}
      hasExpiredProTrial
      hasExpiredBusinessTrial={false}
      isPremiumBusiness={false}
    />
  ))
  .add('business user', () => (
    <TrialCompleteModal
      translations={translations['trial-complete-modal']}
      cancelTrial={action('cancel-clicked')}
      completeAndUpgrade={action('complete-clicked')}
      hasExpiredProTrial={false}
      hasExpiredBusinessTrial
      isPremiumBusiness={false}
    />
  ))
  .add('premium business', () => (
    <TrialCompleteModal
      translations={translations['trial-complete-modal']}
      cancelTrial={action('cancel-clicked')}
      completeAndUpgrade={action('complete-clicked')}
      hasExpiredProTrial={false}
      hasExpiredBusinessTrial
      isPremiumBusiness
    />
  ));
