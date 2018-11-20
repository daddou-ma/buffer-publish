import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import {
  action,
} from '@storybook/addon-actions';
import TabNavigation from './index';

storiesOf('TabNavigation', module)
  .add('default', () => (
    <TabNavigation
      selectedTabId={'queue'}
      onTabClick={action('tab-click')}
      isBusinessAccount={false}
      isManager={false}
      shouldShowNestedSettingsTab
      selectedChildTabId={'general-settings'}
      onChildTabClick={action('child-tab-click')}
      showUpgradeModal={action('show-upgrade-modal')}
      shouldShowUpgradeCta
      hasDraftsFeatureFlip
    />
  ));
