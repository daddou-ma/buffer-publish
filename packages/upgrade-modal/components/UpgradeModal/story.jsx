import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import UpgradeModal from './index';

storiesOf('UpgradeModal', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <UpgradeModal
      translations={translations['upgrade-modal']}
      cycle="year"
    />
  ))
  .add('user has nonprofit status', () => (
    <UpgradeModal
      translations={translations['upgrade-modal']}
      cycle="year"
      isNonprofit
    />
  ))
  .add('user does not have nonprofit status', () => (
    <UpgradeModal
      translations={translations['upgrade-modal']}
      cycle="year"
      isNonprofit={false}
    />
  ));
