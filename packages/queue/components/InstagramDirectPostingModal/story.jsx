import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import InstagramDirectPostingModal from './index';


storiesOf('InstagramDirectPostingModal', module)
  .addDecorator(checkA11y)
  .add('is IG Business Profile', () => (
    <InstagramDirectPostingModal
      isBusinessOnInstagram
      onSetUpDirectPostingClick={action('onSetUpDirectPostingClick')}
      onHideInstagramModal={action('onHideInstagramModal')}
    />
  ))
  .add('is not IG Business Profile', () => (
    <InstagramDirectPostingModal
      isBusinessOnInstagram={false}
      onCheckInstagramBusinessClick={action('onCheckInstagramBusinessClick')}
      onHideInstagramModal={action('onHideInstagramModal')}
    />
  ));
