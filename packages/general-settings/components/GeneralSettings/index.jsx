import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';
import GoogleAnalytics from '../GoogleAnalytics';

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
  onConnectBitlyURLClick,
  onDisconnectBitlyURLClick,
  isContributor,
  features,
  hasInstagramFeatureFlip,
  onDirectPostingClick,
}) => (
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
      onShowGACustomizationFormClick={onShowGACustomizationFormClick}
      showGACustomizationForm={showGACustomizationForm}
      googleAnalyticsIsEnabled={googleAnalyticsIsEnabled}
      onToggleGoogleAnalyticsClick={onToggleGoogleAnalyticsClick}
    />
  </div>
);

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
  features: PropTypes.shape({
    isFreeUser: PropTypes.func,
  }).isRequired,
  hasInstagramFeatureFlip: PropTypes.bool,
  onDirectPostingClick: PropTypes.func.isRequired,
};

export default GeneralSettings;
