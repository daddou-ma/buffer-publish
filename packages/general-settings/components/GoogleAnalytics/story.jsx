import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import GoogleAnalytics from './index';

storiesOf('GoogleAnalytics', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <GoogleAnalytics
      googleAnalyticsIsEnabled={false}
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
    />
  ))
  .add('google analytics is enabled', () => (
    <GoogleAnalytics
      googleAnalyticsIsEnabled={true}
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
    />
  ))
  .add('the customisation form is shown', () => (
    <GoogleAnalytics
      googleAnalyticsIsEnabled={true}
      showGACustomizationForm={true}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
    />
  ));
