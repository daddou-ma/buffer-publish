import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import { Provider } from 'react-redux';


import BillingUpgradeCTABanner from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({...state}),
});

const userWithoutTrial = {
  hasCardDetails: false,
  hasTrialExtended: false,
  onTrial: false,
  postTrialCost: '',
  trialLength: 0,
  trialTimeRemaining: '',
};

const userOnTrial = {
  hasCardDetails: false,
  hasTrialExtended: false,
  onTrial: true,
  postTrialCost: '$123 per period',
  trialLength: 0,
  trialTimeRemaining: '10 days',
};

const userOnTrialWithBilling = {
  hasCardDetails: true,
  hasTrialExtended: false,
  onTrial: true,
  postTrialCost: '$123 per period',
  trialLength: 0,
  trialTimeRemaining: '10 days',
};


const fakeUser = {
  loading: false,
  id: '1234',
  name: 'Test User',
  email: 'test@buffer.com',
  avatar: '',
  features: ['paid_users_in_new_publish'],
  trial: userOnTrial,
};

function createMockStore (business, onTrial) {
  return storeFake({
    productFeatures: {
      planName: business ? 'business' : 'pro',
      features: {},
    },
    i18n: {
      translations: {
        example: {},
      },
    },
    appSidebar: {
      user: {
        ...fakeUser,
        ...{ trial: onTrial ? userOnTrial : {} }
      }
    },
    environment: {
      environment: 'production',
    },
  });
}

const storeBusiness = createMockStore(true, false);
const storePro = createMockStore(false, true);

storiesOf('BillingUpgradeCTABanner', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <Provider store={storeBusiness}>
      <BillingUpgradeCTABanner
        translations={translations['billing-upgrade-cta-banner']}
        onClickManageBilling={action('manageBilling')}
        onClickAddBilling={action('addBilling')}
        trial={userWithoutTrial}
        profileCount={1}
        isBusinessUser
      />
    </Provider>
  ))
  .add('free user on pro trial no billing info', () => (
    <Provider store={storePro}>
      <BillingUpgradeCTABanner
        translations={translations['billing-upgrade-cta-banner']}
        onClickManageBilling={action('manageBilling')}
        onClickAddBilling={action('addBilling')}
        trial={userOnTrial}
        profileCount={1}
        isBusinessUser={false}

      />
    </Provider>
  ))
  .add('free user on pro trial with billing info', () => (
    <Provider store={storePro}>
      <BillingUpgradeCTABanner
        translations={translations['billing-upgrade-cta-banner']}
        onClickManageBilling={action('manageBilling')}
        onClickAddBilling={action('addBilling')}
        trial={userOnTrialWithBilling}
        profileCount={1}
        isBusinessUser={false}
      />
    </Provider>
  ))
  .add('pro user on business trial no billing info', () => (
    <Provider store={storeBusiness}>
      <BillingUpgradeCTABanner
        translations={translations['billing-upgrade-cta-banner']}
        onClickManageBilling={action('manageBilling')}
        onClickAddBilling={action('addBilling')}
        trial={userOnTrial}
        profileCount={1}
        isBusinessUser
      />
    </Provider>
  ))
  .add('pro user on business trial no billing info and no profiles connected', () => (
    <Provider store={storeBusiness}>
      <BillingUpgradeCTABanner
        translations={translations['billing-upgrade-cta-banner']}
        onClickManageBilling={action('manageBilling')}
        onClickAddBilling={action('addBilling')}
        trial={userOnTrial}
        profileCount={0}
        isBusinessUser
      />
    </Provider>
  ))
  .add('pro user on business trial with billing info', () => (
    <Provider store={storeBusiness}>
      <BillingUpgradeCTABanner
        translations={translations['billing-upgrade-cta-banner']}
        onClickManageBilling={action('manageBilling')}
        onClickAddBilling={action('addBilling')}
        trial={userOnTrialWithBilling}
        profileCount={1}
        isBusinessUser
      />
    </Provider>
  ));
