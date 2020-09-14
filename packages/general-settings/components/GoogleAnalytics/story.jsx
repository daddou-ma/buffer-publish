import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import GoogleAnalytics from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  i18n: {
    translations: {
      'switch-plan-modal': {},
    },
  },
  switchPlanModal: {},
  stripe: {},
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('GoogleAnalytics', module)
  .addDecorator(withA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('default', () => (
    <GoogleAnalytics
      isManager
      googleAnalyticsIsEnabled={false}
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
    />
  ))
  .add('is enabled', () => (
    <GoogleAnalytics
      isManager
      googleAnalyticsIsEnabled
      linkShorteningEnabled
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
    />
  ))
  .add('the customisation form is shown', () => (
    <GoogleAnalytics
      isManager
      googleAnalyticsIsEnabled
      showGACustomizationForm
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
    />
  ))
  .add('is disabled for Contributors', () => (
    <GoogleAnalytics
      isManager={false}
      googleAnalyticsIsEnabled
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
    />
  ));
