import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import GeneralSettings from './index';

const features = { isFreeUser: () => true };

storiesOf('GeneralSettings', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <GeneralSettings
      isInstagramProfile={false}
      isInstagramBusiness={false}
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      features={features}
    />
  ))
  .add('direct posting enabled', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      features={features}
    />
  ))
  .add('Google analytics enabled', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      features={features}
    />
  ));
