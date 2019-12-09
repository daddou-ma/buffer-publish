import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import SetRemindersModal from './index';

storiesOf('Modals|SetRemindersModal', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <SetRemindersModal
      translations={translations['set-reminders-modal']}
      onCloseModalClick={action('close-modal')}
      onSetRemindersClick={action('set-reminders')}
    />
  ));
