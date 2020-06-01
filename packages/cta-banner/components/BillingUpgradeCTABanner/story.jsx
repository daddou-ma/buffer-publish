import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { Provider } from 'react-redux';
import i18n from '@bufferapp/publish-web/components/i18n';

import BillingUpgradeCTABanner from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
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
  language: 'en-US',
};

function createMockStore(business, onTrial) {
  return storeFake({
    productFeatures: {
      planName: business ? 'business' : 'pro',
      features: {},
    },
    user: {
      ...fakeUser,
      ...{ trial: onTrial ? userOnTrial : {} },
    },
    environment: {
      environment: 'production',
    },
  });
}

const storeBusiness = createMockStore(true, false);
const storePro = createMockStore(false, true);

i18n.changeLanguage(fakeUser.language);

storiesOf('BillingUpgradeCTABanner', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <Provider store={storeBusiness}>
      <BillingUpgradeCTABanner
        onClickStartSubscription={action('startSubscription')}
        trial={userWithoutTrial}
        profileCount={1}
      />
    </Provider>
  ))
  .add('free user on pro trial no billing info', () => (
    <Provider store={storePro}>
      <BillingUpgradeCTABanner
        onClickStartSubscription={action('startSubscription')}
        trial={userOnTrial}
        profileCount={1}
      />
    </Provider>
  ))
  .add('free user on pro trial with billing info', () => (
    <Provider store={storePro}>
      <BillingUpgradeCTABanner
        onClickStartSubscription={action('startSubscription')}
        trial={userOnTrialWithBilling}
        profileCount={1}
      />
    </Provider>
  ))
  .add('pro user on business trial no billing info', () => (
    <Provider store={storeBusiness}>
      <BillingUpgradeCTABanner
        onClickStartSubscription={action('startSubscription')}
        trial={userOnTrial}
        profileCount={1}
      />
    </Provider>
  ))
  .add(
    'pro user on business trial no billing info and no profiles connected',
    () => (
      <Provider store={storeBusiness}>
        <BillingUpgradeCTABanner
          onClickStartSubscription={action('startSubscription')}
          trial={userOnTrial}
          profileCount={0}
        />
      </Provider>
    )
  )
  .add('pro user on business trial with billing info', () => (
    <Provider store={storeBusiness}>
      <BillingUpgradeCTABanner
        onClickStartSubscription={action('startSubscription')}
        trial={userOnTrialWithBilling}
        profileCount={1}
      />
    </Provider>
  ));
