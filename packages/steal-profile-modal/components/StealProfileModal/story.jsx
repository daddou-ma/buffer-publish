import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import { action } from '@storybook/addon-actions';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import StealProfileModal from './index';

storiesOf('StealProfileModal', module)
  .addDecorator(checkA11y)
  .add('should show steal profile modal', () => (
    <StealProfileModal
      translations={translations['steal-profile-modal']}
      hideModal={action('hide-modal')}
      stealProfileUsername={'Joel'}
      email={'joel@buffer.com'}
    />
  ));
