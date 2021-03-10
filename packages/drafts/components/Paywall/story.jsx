import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import Paywall from './index';

storiesOf('Drafts Paywall', module)
  .addDecorator(withA11y)
  .add('should display paywall for drafts when free user', () => (
    <Paywall isFreePlan onUpgradeButtonClick={action('onUpgradeBtnClick')} />
  ))
  .add('should display paywall for drafts when pro user', () => (
    <Paywall
      canStartBusinessTrial={false}
      onUpgradeButtonClick={action('onUpgradeBtnClick')}
    />
  ))
  .add(
    'should display paywall for drafts when pro user who can start a business trial',
    () => (
      <Paywall
        canStartBusinessTrial
        onUpgradeButtonClick={action('onUpgradeBtnClick')}
      />
    )
  );
