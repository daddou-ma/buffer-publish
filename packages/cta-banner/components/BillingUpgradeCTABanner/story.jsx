import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { Provider } from 'react-redux';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import createStore from '@bufferapp/publish-store';


import BillingUpgradeCTABanner from './index';

const history = createHistory();
const store = createStore();

storiesOf('BillingUpgradeCTABanner', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      <Router history={history}>
        {getStory()}
      </Router>
    </Provider>,
  )
  .add('default', () => (
    <BillingUpgradeCTABanner
      translations={translations['billing-upgrade-cta-banner']}
    />
  ));
