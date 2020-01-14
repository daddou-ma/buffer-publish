import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import ProfilesDisconnectedBanner from './index';

storiesOf('ProfilesDisconnectedBanner', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <ProfilesDisconnectedBanner
      translations={translations['profiles-disconnected-banner']}
      onReconnectProfileClick={action('on-reconnect-click')}
    />
  ));
