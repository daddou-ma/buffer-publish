import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import StartStories from './index';

storiesOf('StartStories', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <StartStories
      translations={translations['story-group-queue']}
      onCloseModalClick={action('close-modal')}
      onSetRemindersClick={action('set-reminders')}
    />
  ));
