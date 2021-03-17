import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import DraftsList from './index';

storiesOf('DraftsList', module)
  .addDecorator(withA11y)
  .add('should display paywall for drafts when free or pro user', () => (
    <DraftsList
      onStartTrialClick={action('onStartTrialClick')}
      onUpgradeButtonClick={action('onUpgradeBtnClick')}
      fetchDrafts={action('fetchDrafts')}
      showStartBusinessTrialCta={false}
      showPaywall
    />
  ))
  .add(
    'should display paywall for drafts when pro user who can start a business trial',
    () => (
      <DraftsList
        onStartTrialClick={action('onStartTrialClick')}
        onUpgradeButtonClick={action('onUpgradeBtnClick')}
        fetchDrafts={action('fetchDrafts')}
        showStartBusinessTrialCta
        showPaywall
      />
    )
  );
