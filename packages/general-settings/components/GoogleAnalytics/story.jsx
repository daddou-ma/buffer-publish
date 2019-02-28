import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
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
      'upgrade-modal': {},
    },
  },
  upgradeModal: {},
  stripe: {},
  productFeatures: {
    planName: 'free',
    features: {},
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('GoogleAnalytics', module)
  .addDecorator(checkA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('default', () => (
    <GoogleAnalytics
      isContributor={false}
      googleAnalyticsIsEnabled={false}
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('is enabled', () => (
    <GoogleAnalytics
      isContributor={false}
      googleAnalyticsIsEnabled
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('the customisation form is shown', () => (
    <GoogleAnalytics
      isContributor={false}
      googleAnalyticsIsEnabled
      showGACustomizationForm
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('is disabled for Contributors', () => (
    <GoogleAnalytics
      isContributor
      googleAnalyticsIsEnabled
      showGACustomizationForm={false}
      onShowGACustomizationFormClick={action('onShowGACustomizationFormClick')}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ));
