import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import DefaultPage from './index';

const translations = {
  connectButton: 'Connect your social accounts',
  defaultTitle: "Let's get your account set up!",
};

storiesOf('DefaultPage', module)
  .addDecorator(withA11y)
  .add('should show image, title and button', () => (
    <DefaultPage
      translations={translations}
      onConnectSocialAccountClick={action('connect social account click')}
    />
  ));
