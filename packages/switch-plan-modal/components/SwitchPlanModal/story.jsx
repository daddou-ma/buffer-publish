import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import SwitchPlanModal from './index';

storiesOf('SwitchPlanModal', module)
  .addDecorator(checkA11y)
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
