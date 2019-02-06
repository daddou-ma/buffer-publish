import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import WelcomeModal from './index';

storiesOf('WelcomeModal', module)
  .addDecorator(checkA11y)
  .add('should show welcome modal', () => (
    <WelcomeModal
      translations={translations['welcome-modal']}
      hideModal={action('hide-modal')}
    />
  ));
