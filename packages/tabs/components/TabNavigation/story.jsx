import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import {
  action,
} from '@storybook/addon-actions';
import TabNavigation from './index';
import { Provider } from 'react-redux';

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
      hasDraftsFeatureFlip
    />
  ));
