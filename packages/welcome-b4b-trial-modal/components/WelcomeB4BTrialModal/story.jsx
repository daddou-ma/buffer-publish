import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import WelcomeB4BTrialModal from './index';

storiesOf('WelcomeB4BTrialModal', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <WelcomeB4BTrialModal
      translations={translations['welcome-b4b-trial-modal']}
      hideModal={action('hide-modal')}
    />
  ));
