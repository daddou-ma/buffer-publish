import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import WelcomePaidModal from './index';

storiesOf('WelcomePaidModal', module)
  .addDecorator(withA11y)
  .add('should show welcome modal', () => (
    <WelcomePaidModal
      translations={translations['welcome-paid-modal']}
      hideModal={action('hide-modal')}
    />
  ));
