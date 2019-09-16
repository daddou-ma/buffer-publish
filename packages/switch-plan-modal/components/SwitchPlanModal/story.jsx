import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import { createHashHistory as createHistory } from 'history';

import { Provider } from 'react-redux';
import { ConnectedRouter as Router } from 'connected-react-router';

import SwitchPlanModal from './index';

const history = createHistory();

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

function createMockStore () {
  return storeFake({
    creditCardForm: { stripePublishableKey: 'TEST', stripe: null },
  });
}

storiesOf('SwitchPlanModal', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => (
    <Provider store={createMockStore()}>
      {getStory()}
    </Provider>
  ))
  .add('default', () => (
    <SwitchPlanModal
      translations={translations['switch-plan-modal']}
      cycle="year"
    />
  ))
  .add('user has nonprofit status', () => (
    <SwitchPlanModal
      translations={translations['switch-plan-modal']}
      cycle="year"
      isNonprofit
    />
  ))
  .add('user does not have nonprofit status', () => (
    <SwitchPlanModal
      translations={translations['switch-plan-modal']}
      cycle="year"
      isNonprofit={false}
    />
  ));
