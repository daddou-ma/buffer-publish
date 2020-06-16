import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import ProfilesDisconnectedBanner from '@bufferapp/publish-profiles-disconnected-banner';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';
import GoogleAnalytics from '../GoogleAnalytics';
import InstagramReminders from '../InstagramReminders';
import ShuffleQueue from '../ShuffleQueue';

const ErrorBoundary = getErrorBoundary(true);

const GeneralSettings = ({
  isInstagramProfile,
  isInstagramBusiness,
  profileService,
  profileName,
  avatarUrl,
  loadingShuffle,
  onLinkShortenerOptionSelect,
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
  isDisconnectedProfile,
  isBusinessAccount,
  linkShortening,
  linkShorteningEnabled,
  showLinkShortenerErrorMessage,
}) => {
  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }
  return (
    <ErrorBoundary>
      {isDisconnectedProfile && <ProfilesDisconnectedBanner />}
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
          isBitlyConnected={linkShortening.isBitlyConnected}
          isManager={linkShortening.isManager}
          onConnectBitlyURLClick={onConnectBitlyURLClick}
          onDisconnectBitlyURLClick={onDisconnectBitlyURLClick}
          loading={linkShortening.loading}
          profileService={linkShortening.profileService}
          linkShorteners={linkShortening.linkShorteners}
          onOptionSelect={onLinkShortenerOptionSelect}
          selectedShortener={linkShortening.selectedShortener}
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
          linkShorteningEnabled={linkShorteningEnabled}
          showLinkShortenerErrorMessage={showLinkShortenerErrorMessage}
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
  onLinkShortenerOptionSelect: null,
  isManager: true,
  showGACustomizationForm: false,
  googleAnalyticsIsEnabled: false,
  utmCampaign: null,
  utmSource: null,
  utmMedium: null,
  remindersAreEnabled: false,
  isLockedProfile: false,
  isDisconnectedProfile: false,
  loadingShuffle: false,
  linkShorteningEnabled: false,
  linkShortening: {},
  showLinkShortenerErrorMessage: false,
};

GeneralSettings.propTypes = {
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool.isRequired,
  isInstagramProfile: PropTypes.bool,
  isInstagramBusiness: PropTypes.bool,
  onConnectBitlyURLClick: PropTypes.func.isRequired,
  onDisconnectBitlyURLClick: PropTypes.func.isRequired,
  showLinkShortenerErrorMessage: PropTypes.bool,
  linkShorteningEnabled: PropTypes.bool,
  linkShortening: PropTypes.shape({
    isBitlyConnected: PropTypes.bool,
    isManager: PropTypes.bool,
    loading: PropTypes.bool,
    profileService: PropTypes.string,
    selectedShortener: PropTypes.string,
    linkShorteners: PropTypes.arrayOf(
      PropTypes.shape({
        domain: PropTypes.string,
        selected: PropTypes.bool,
        tracking: PropTypes.bool,
        login: PropTypes.string,
      })
    ),
  }),
  onLinkShortenerOptionSelect: PropTypes.func,
  profileService: PropTypes.string,
  onShowGACustomizationFormClick: PropTypes.func.isRequired,
  showGACustomizationForm: PropTypes.bool,
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
  isDisconnectedProfile: PropTypes.bool,
  onShuffleQueueClick: PropTypes.func.isRequired,
  onConfirmShuffleQueueClick: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  profileName: PropTypes.string,
  avatarUrl: PropTypes.string,
  loadingShuffle: PropTypes.bool,
};

export default GeneralSettings;
