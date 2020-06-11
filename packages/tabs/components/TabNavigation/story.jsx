import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import TabNavigation from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  i18n: {
    translations: {
      'switch-plan-modal': {},
    },
  },
  switchPlanModal: {},
  stripe: {},
  productFeatures: {
    planName: 'free',
    features: {},
  },
  user: {
    trial: {
      onTrial: false,
    },
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('Tabs|TabNavigation', module)
  .addDecorator(UpgradeModalDecorator)
  .add('default', () => (
    <TabNavigation
      selectedTabId="queue"
      onTabClick={action('tab-click')}
      isBusinessAccount={false}
      isManager={false}
      shouldShowNestedSettingsTab
      selectedChildTabId="general-settings"
      onChildTabClick={action('child-tab-click')}
      showSwitchPlanModal={action('show-switch-plan-modal')}
      shouldShowUpgradeCta
      onUpgradeButtonClick={action('on-upgrade-button-click')}
      onProTrial
    />
  ))
  .add('isInstagramProfile', () => (
    <TabNavigation
      selectedTabId="queue"
      onTabClick={action('tab-click')}
      isBusinessAccount={false}
      isManager={false}
      isInstagramProfile
      shouldShowNestedSettingsTab
      selectedChildTabId="general-settings"
      onChildTabClick={action('child-tab-click')}
      showSwitchPlanModal={action('show-switch-plan-modal')}
      shouldShowUpgradeCta
      onUpgradeButtonClick={action('on-upgrade-button-click')}
      onProTrial
    />
  ))
  .add('should show start pro trial', () => (
    <TabNavigation
      selectedTabId="queue"
      onTabClick={action('tab-click')}
      isBusinessAccount={false}
      isManager={false}
      shouldShowNestedSettingsTab
      selectedChildTabId="general-settings"
      onChildTabClick={action('child-tab-click')}
      showSwitchPlanModal={action('show-switch-plan-modal')}
      shouldShowUpgradeCta
      canStartProTrial
      onUpgradeButtonClick={action('on-upgrade-button-click')}
    />
  ))
  .add('should show grid tab', () => (
    <TabNavigation
      selectedTabId="grid"
      onTabClick={action('tab-click')}
      isBusinessAccount
      isManager={false}
      isInstagramProfile
      shouldShowNestedSettingsTab={false}
      showSwitchPlanModal={action('show-switch-plan-modal')}
      shouldShowUpgradeCta
      onUpgradeButtonClick={action('on-upgrade-button-click')}
      onProTrial
    />
  ))
  .add('isContributor', () => (
    <TabNavigation
      selectedTabId="queue"
      onTabClick={action('tab-click')}
      isBusinessAccount
      isManager={false}
      shouldShowNestedSettingsTab
      selectedChildTabId="general-settings"
      onChildTabClick={action('child-tab-click')}
      showSwitchPlanModal={action('show-switch-plan-modal')}
      shouldShowUpgradeCta={false}
      onUpgradeButtonClick={action('on-upgrade-button-click')}
      onProTrial
    />
  ))
  .add('isManager, isBusinessAccount', () => (
    <TabNavigation
      selectedTabId="queue"
      onTabClick={action('tab-click')}
      isBusinessAccount
      isManager
      shouldShowNestedSettingsTab
      selectedChildTabId="general-settings"
      onChildTabClick={action('child-tab-click')}
      showSwitchPlanModal={action('show-switch-plan-modal')}
      shouldShowUpgradeCta={false}
      onUpgradeButtonClick={action('on-upgrade-button-click')}
      onProTrial
    />
  ));
