import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import ProfilesDisconnectedModal from './index';

storiesOf('ProfilesDisconnectedModal', module)
  .addDecorator(withA11y)
  .add('should show welcome modal', () => (
    <ProfilesDisconnectedModal
      translations={translations['profiles-disconnected-modal']}
      hideModal={action('hide-modal')}
      reconnectProfile={action('reconnect-profile')}
      disconnectedProfiles={[
        {
          id: '1',
          avatar_https: '',
          service: 'twitter',
          formatted_username: '@hamstu',
        },
      ]}
    />
  ));
