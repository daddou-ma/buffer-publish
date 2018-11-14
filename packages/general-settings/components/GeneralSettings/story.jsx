import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import GeneralSettings from './index';


storiesOf('GeneralSettings', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <GeneralSettings directPostingEnabled={false} onSetUpDirectPostingClick={action('onSetUpDirectPosting')} />
  ))
  .add('direct posting enabled', () => (
    <GeneralSettings directPostingEnabled onSetUpDirectPostingClick={action('onSetUpDirectPosting')} />
  ))
  .add('Google analytics enabled', () => (
    <GeneralSettings googleAnalyticsIsEnabled onSetUpDirectPostingClick={action('onSetUpDirectPosting')} />
  ));
