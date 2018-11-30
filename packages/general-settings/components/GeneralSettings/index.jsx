import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';
import GoogleAnalytics from '../GoogleAnalytics';

const GeneralSettings = ({
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
}) => (
  <div>
    {!isInstagramBusiness &&
    <InstagramDirectPosting
      onSetUpDirectPostingClick={onSetUpDirectPostingClick}
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
  isInstagramBusiness: false,
  profileService: null,
  linkShorteners: null,
  loadingLinkShorteners: true,
  onLinkShortenerOptionSelect: null,
  selectedShortener: null,
  isContributor: null,
  showGACustomizationForm: false,
  googleAnalyticsIsEnabled: false,
};

GeneralSettings.propTypes = {
  isContributor: PropTypes.bool,
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
};

export default GeneralSettings;
