import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import InstagramDirectPostingModal from './index';

storiesOf('InstagramDirectPostingModal', module)
  .addDecorator(checkA11y)
  .add('is IG Business Profile', () => (
    <InstagramDirectPostingModal
      isBusinessOnInstagram
      onSetUpDirectPostingClick={action('onSetUpDirectPostingClick')}
      onCheckInstagramBusinessClick={action('onCheckInstagramBusinessClick')}
      onHideInstagramModal={action('onHideInstagramModal')}
      translations={translations['instagram-direct-posting-modal']}
    />
  ))
  .add('is not IG Business Profile', () => (
    <InstagramDirectPostingModal
      isBusinessOnInstagram={false}
      onSetUpDirectPostingClick={action('onSetUpDirectPostingClick')}
      onCheckInstagramBusinessClick={action('onCheckInstagramBusinessClick')}
      onHideInstagramModal={action('onHideInstagramModal')}
      translations={translations['instagram-direct-posting-modal']}
    />
  ));
