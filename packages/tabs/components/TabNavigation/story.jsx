import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import {
  action,
} from '@storybook/addon-actions';
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
      'upgrade-modal': {},
    },
  },
  upgradeModal: {},
  stripe: {},
  productFeatures: {
    planName: 'free',
    features: {},
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('TabNavigation', module)
  .addDecorator(UpgradeModalDecorator)
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
      onUpgradeButtonClick={action('on-upgrade-button-click')}
    />
  ))
  .add('isInstagramProfile', () => (
    <TabNavigation
      selectedTabId={'queue'}
      onTabClick={action('tab-click')}
      isBusinessAccount={false}
      isManager={false}
      isInstagramProfile
      shouldShowNestedSettingsTab
      selectedChildTabId={'general-settings'}
      onChildTabClick={action('child-tab-click')}
      showUpgradeModal={action('show-upgrade-modal')}
      shouldShowUpgradeCta
      onUpgradeButtonClick={action('on-upgrade-button-click')}
    />
  ))
  .add('isContributor', () => (
    <TabNavigation
      selectedTabId={'queue'}
      onTabClick={action('tab-click')}
      isBusinessAccount
      isManager={false}
      shouldShowNestedSettingsTab
      selectedChildTabId={'general-settings'}
      onChildTabClick={action('child-tab-click')}
      showUpgradeModal={action('show-upgrade-modal')}
      shouldShowUpgradeCta={false}
      onUpgradeButtonClick={action('on-upgrade-button-click')}
    />
  ))
  .add('isManager, isBusinessAccount', () => (
    <TabNavigation
      selectedTabId={'queue'}
      onTabClick={action('tab-click')}
      isBusinessAccount
      isManager
      shouldShowNestedSettingsTab
      selectedChildTabId={'general-settings'}
      onChildTabClick={action('child-tab-click')}
      showUpgradeModal={action('show-upgrade-modal')}
      shouldShowUpgradeCta={false}
      onUpgradeButtonClick={action('on-upgrade-button-click')}
    />
  ))
  ;
