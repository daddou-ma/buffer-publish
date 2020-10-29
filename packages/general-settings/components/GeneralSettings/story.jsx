import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { Provider } from 'react-redux';
import GeneralSettings from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  user: {
    id: 'id1',
  },
  profileSidebar: {
    selectedProfile: {
      id: 'id2',
    },
  },
  organizations: {
    selected: {
      hasBitlyFeature: true,
    },
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('GeneralSettings', module)
  .addDecorator(withA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('default', () => (
    <GeneralSettings
      isInstagramProfile={false}
      isInstagramBusiness={false}
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      hasBitlyFeature
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('direct posting enabled/ reminders disabled', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      hasBitlyFeature
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('Google analytics enabled', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      googleAnalyticsIsEnabled
      linkShorteningEnabled
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      hasBitlyFeature
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('is locked account', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      hasBitlyFeature
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
      isLockedProfile
    />
  ))
  .add('show GA customization form', () => (
    <GeneralSettings
      isInstagramProfile
      isInstagramBusiness
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      showGACustomizationForm
      googleAnalyticsIsEnabled
      hasBitlyFeature
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
      onToggleGoogleAnalyticsClick={action('onToggleGoogleAnalyticsClick')}
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
    />
  ))
  .add('is Contributor', () => (
    <GeneralSettings
      isInstagramProfile={false}
      isInstagramBusiness={false}
      onSetUpDirectPostingClick={action('onSetUpDirectPosting')}
      hasBitlyFeature
      onChangeUtmCampaign={action('onChangeUtmCampaign')}
      onChangeUtmSource={action('onChangeUtmSource')}
      onChangeUtmMedium={action('onChangeUtmMedium')}
      utmCampaign="buffer"
      utmSource="source"
      utmMedium="medium"
      onSaveGATrackingSettingsClick={action('onSaveGATrackingSettingsClick')}
      isManager={false}
    />
  ));
