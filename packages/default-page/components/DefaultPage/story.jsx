import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import DefaultPage from './index';

storiesOf('DefaultPage', module)
  .addDecorator(withA11y)
  .add('admin user', () => (
    <DefaultPage
      onConnectSocialAccountClick={action('connect social account click')}
    />
  ))
  .add('non admin user', () => (
    <DefaultPage isAdmin ownerEmail="ana@buffer.com" orgName="Cool Org" />
  ));
