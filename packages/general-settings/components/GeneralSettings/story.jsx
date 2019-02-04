import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import { reducer as form } from 'redux-form';
import { combineReducers, createStore } from 'redux';
import GeneralSettings from './index';

const store = createStore(combineReducers({ form }));
const features = { isFreeUser: () => true };

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('GeneralSettings', module)
  .addDecorator(checkA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('default', () => (
    <GeneralSettings
      isInstagramProfile={false}
      isInstagramBusiness={false}
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      features={features}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('direct posting enabled', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      features={features}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('Google analytics enabled', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      features={features}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('show GA customization form', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      features={features}
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign={'buffer'}
      utmSource={'source'}
      utmMedium={'medium'}
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ));
