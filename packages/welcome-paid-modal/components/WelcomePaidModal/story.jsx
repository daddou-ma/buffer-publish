import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y/register';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import WelcomePaidModal from './index';

storiesOf('WelcomePaidModal', module)
  .addDecorator(checkA11y)
  .add('should show welcome modal', () => (
    <WelcomePaidModal
      translations={translations['welcome-paid-modal']}
      hideModal={action('hide-modal')}
    />
  ));
