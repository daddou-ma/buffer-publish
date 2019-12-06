import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';
import GoogleAnalytics from '../GoogleAnalytics';
import InstagramReminders from '../InstagramReminders';
import ShuffleQueue from '../ShuffleQueue';

const ErrorBoundary = getErrorBoundary(true);

const GeneralSettings = ({
  isInstagramProfile,
  isInstagramBusiness,
  linkShorteners,
  profileService,
  profileName,
  avatarUrl,
  loadingLinkShorteners,
  loadingShuffle,
  onLinkShortenerOptionSelect,
  selectedShortener,
  onShowGACustomizationFormClick,
  showGACustomizationForm,
  googleAnalyticsIsEnabled,
  onToggleGoogleAnalyticsClick,
  onSaveGATrackingSettingsClick,
  onConnectBitlyURLClick,
  onDisconnectBitlyURLClick,
  isManager,
  features,
  onDirectPostingClick,
  utmCampaign,
  onChangeUtmCampaign,
  utmSource,
  onChangeUtmSource,
  utmMedium,
  onChangeUtmMedium,
  remindersAreEnabled,
  onToggleRemindersClick,
  onShuffleQueueClick,
  onConfirmShuffleQueueClick,
  onCloseModal,
  showModal,
  isLockedProfile,
  isBusinessAccount,
}) => {
  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }
  return (
    <ErrorBoundary>
      <div>
        {isInstagramProfile && !isInstagramBusiness && (
          <InstagramDirectPosting onDirectPostingClick={onDirectPostingClick} />
        )}
        {isInstagramProfile && isInstagramBusiness && (
          <InstagramReminders
            remindersAreEnabled={remindersAreEnabled}
            onToggleRemindersClick={onToggleRemindersClick}
            isManager={isManager}
          />
        )}
        <LinkShortening
          isManager={isManager}
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
          isBusinessAccount={isBusinessAccount}
          isManager={isManager}
          features={features}
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
        {isManager && (
          <ShuffleQueue
            onShuffleQueueClick={onShuffleQueueClick}
            onConfirmShuffleQueueClick={onConfirmShuffleQueueClick}
            onCloseModal={onCloseModal}
            showModal={showModal}
            profileName={profileName}
            profileService={profileService}
            avatarUrl={avatarUrl}
            loading={loadingShuffle}
          />
        )}
      </div>
    </ErrorBoundary>
  );
};

GeneralSettings.defaultProps = {
  isInstagramProfile: false,
  isInstagramBusiness: false,
  profileService: null,
  profileName: null,
  avatarUrl: null,
  linkShorteners: null,
  loadingLinkShorteners: true,
  onLinkShortenerOptionSelect: null,
  selectedShortener: null,
  isManager: true,
  showGACustomizationForm: false,
  googleAnalyticsIsEnabled: false,
  utmCampaign: null,
  utmSource: null,
  utmMedium: null,
  remindersAreEnabled: false,
  isLockedProfile: false,
  loadingShuffle: false,
};

GeneralSettings.propTypes = {
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool.isRequired,
  isInstagramProfile: PropTypes.bool,
  isInstagramBusiness: PropTypes.bool.isRequired,
  onConnectBitlyURLClick: PropTypes.func.isRequired,
  onDisconnectBitlyURLClick: PropTypes.func.isRequired,
  linkShorteners: PropTypes.arrayOf(
    PropTypes.shape({
      domain: PropTypes.string,
      selected: PropTypes.bool,
      tracking: PropTypes.bool,
      login: PropTypes.string,
    })
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
  onShuffleQueueClick: PropTypes.func.isRequired,
  onConfirmShuffleQueueClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  profileName: PropTypes.string,
  avatarUrl: PropTypes.string,
  loadingShuffle: PropTypes.bool,
};

export default GeneralSettings;
