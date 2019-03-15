import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import { LockedProfileNotification } from '@bufferapp/publish-shared-components';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';
import GoogleAnalytics from '../GoogleAnalytics';
import InstagramReminders from '../InstagramReminders';

const GeneralSettings = ({
  isInstagramProfile,
  isInstagramBusiness,
  onSetUpDirectPostingClick,
  linkShorteners,
  profileService,
  loadingLinkShorteners,
  onLinkShortenerOptionSelect,
  selectedShortener,
  onShowGACustomizationFormClick,
  showGACustomizationForm,
  googleAnalyticsIsEnabled,
  onToggleGoogleAnalyticsClick,
  onSaveGATrackingSettingsClick,
  onConnectBitlyURLClick,
  onDisconnectBitlyURLClick,
  isContributor,
  features,
  hasInstagramFeatureFlip,
  onDirectPostingClick,
  utmCampaign,
  onChangeUtmCampaign,
  utmSource,
  onChangeUtmSource,
  utmMedium,
  onChangeUtmMedium,
  remindersAreEnabled,
  onToggleRemindersClick,
  isLockedProfile,
  profileLimit,
  isOwner,
  onClickUpgrade,
}) => {
  if (isLockedProfile) {
    if (!isOwner) {
      return (
        <LockedProfileNotification
          type={'teamMember'}
        />
      );
    } else if (features.isFreeUser()) {
      return (
        <LockedProfileNotification
          onClickUpgrade={onClickUpgrade}
          profileLimit={profileLimit}
          type={'free'}
        />
      );
    } else if (features.isProUser()) {
      return (
        <LockedProfileNotification
          onClickUpgrade={onClickUpgrade}
          profileLimit={profileLimit}
          type={'pro'}
        />
      );
    }
    return (
      <LockedProfileNotification
        onClickUpgrade={onClickUpgrade}
        profileLimit={profileLimit}
        type={'business'}
      />
    );
  }

  return (
    <div>
      {!hasInstagramFeatureFlip && isInstagramProfile && !isInstagramBusiness &&
        <InstagramDirectPosting
          onDirectPostingClick={onSetUpDirectPostingClick}
        />
      }
      {hasInstagramFeatureFlip && isInstagramProfile && !isInstagramBusiness &&
        <InstagramDirectPosting
          onDirectPostingClick={onDirectPostingClick}
        />
      }
      {isInstagramProfile && isInstagramBusiness &&
        <InstagramReminders
          remindersAreEnabled={remindersAreEnabled}
          onToggleRemindersClick={onToggleRemindersClick}
          isContributor={isContributor}
        />
      }
      <LinkShortening
        isContributor={isContributor}
        onConnectBitlyURLClick={onConnectBitlyURLClick}
        onDisconnectBitlyURLClick={onDisconnectBitlyURLClick}
        loading={loadingLinkShorteners}
        profileService={profileService}
        linkShorteners={linkShorteners}
        onOptionSelect={onLinkShortenerOptionSelect}
        selectedShortener={selectedShortener}
        features={features}
      />
      <Divider />
      <GoogleAnalytics
        isContributor={isContributor}
        onShowGACustomizationFormClick={onShowGACustomizationFormClick}
        showGACustomizationForm={showGACustomizationForm}
        googleAnalyticsIsEnabled={googleAnalyticsIsEnabled}
        onToggleGoogleAnalyticsClick={onToggleGoogleAnalyticsClick}
        utmCampaign={utmCampaign}
        onChangeUtmCampaign={onChangeUtmCampaign}
        utmSource={utmSource}
        onChangeUtmSource={onChangeUtmSource}
        utmMedium={utmMedium}
        onChangeUtmMedium={onChangeUtmMedium}
        onSaveGATrackingSettingsClick={onSaveGATrackingSettingsClick}
      />
    </div>
  );
};

GeneralSettings.defaultProps = {
  isInstagramProfile: false,
  isInstagramBusiness: false,
  profileService: null,
  linkShorteners: null,
  loadingLinkShorteners: true,
  onLinkShortenerOptionSelect: null,
  selectedShortener: null,
  isContributor: null,
  showGACustomizationForm: false,
  googleAnalyticsIsEnabled: false,
  hasInstagramFeatureFlip: false,
  utmCampaign: null,
  utmSource: null,
  utmMedium: null,
  remindersAreEnabled: false,
  isLockedProfile: false,
  isOwner: true,
};

GeneralSettings.propTypes = {
  isContributor: PropTypes.bool,
  isInstagramProfile: PropTypes.bool,
  isInstagramBusiness: PropTypes.bool.isRequired,
  onConnectBitlyURLClick: PropTypes.func.isRequired,
  onDisconnectBitlyURLClick: PropTypes.func.isRequired,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  linkShorteners: PropTypes.arrayOf(
    PropTypes.shape({
      domain: PropTypes.string,
      selected: PropTypes.bool,
      tracking: PropTypes.bool,
      login: PropTypes.string,
    }),
  ),
  onLinkShortenerOptionSelect: PropTypes.func,
  loadingLinkShorteners: PropTypes.bool,
  profileService: PropTypes.string,
  selectedShortener: PropTypes.string,
  onShowGACustomizationFormClick: PropTypes.func.isRequired,
  showGACustomizationForm: PropTypes.bool.isRequired,
  googleAnalyticsIsEnabled: PropTypes.bool,
  onToggleGoogleAnalyticsClick: PropTypes.func.isRequired,
  onSaveGATrackingSettingsClick: PropTypes.func.isRequired,
  features: PropTypes.shape({
    isFreeUser: PropTypes.func,
  }).isRequired,
  hasInstagramFeatureFlip: PropTypes.bool,
  onDirectPostingClick: PropTypes.func.isRequired,
  utmCampaign: PropTypes.string,
  onChangeUtmCampaign: PropTypes.func.isRequired,
  utmSource: PropTypes.string,
  onChangeUtmSource: PropTypes.func.isRequired,
  utmMedium: PropTypes.string,
  onChangeUtmMedium: PropTypes.func.isRequired,
  remindersAreEnabled: PropTypes.bool,
  onToggleRemindersClick: PropTypes.func.isRequired,
  isLockedProfile: PropTypes.bool,
  profileLimit: PropTypes.number.isRequired,
  isOwner: PropTypes.bool,
  onClickUpgrade: PropTypes.func.isRequired,
};

export default GeneralSettings;
