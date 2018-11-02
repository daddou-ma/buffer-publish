import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';
import GoogleAnalytics from '../GoogleAnalytics';

const GeneralSettings = ({
  directPostingEnabled,
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
  // This should be removed once Google Analytics feature is complete - Lola, Nov 2018
  workInProgress,
}) => (
  <div>
    {!directPostingEnabled &&
    <InstagramDirectPosting
      onSetUpDirectPostingClick={onSetUpDirectPostingClick}
    />
    }
    <LinkShortening
      loading={loadingLinkShorteners}
      profileService={profileService}
      linkShorteners={linkShorteners}
      onOptionSelect={onLinkShortenerOptionSelect}
      selectedShortener={selectedShortener}
    />
    <Divider />
    {!workInProgress &&
      <GoogleAnalytics
        onShowGACustomizationFormClick={onShowGACustomizationFormClick}
        showGACustomizationForm={showGACustomizationForm}
        googleAnalyticsIsEnabled={googleAnalyticsIsEnabled}
        onToggleGoogleAnalyticsClick={onToggleGoogleAnalyticsClick}
      />
    }
    {workInProgress &&
      <GoogleAnalytics
        onShowGACustomizationFormClick={onShowGACustomizationFormClick}
        showGACustomizationForm={showGACustomizationForm}
        googleAnalyticsIsEnabled={googleAnalyticsIsEnabled}
        onToggleGoogleAnalyticsClick={onToggleGoogleAnalyticsClick}
      />
    }
  </div>
);

GeneralSettings.defaultProps = {
  directPostingEnabled: false,
  profileService: null,
  linkShorteners: null,
  loadingLinkShorteners: true,
  onLinkShortenerOptionSelect: null,
  selectedShortener: null,
  showGACustomizationForm: false,
  googleAnalyticsIsEnabled: false,
};

GeneralSettings.propTypes = {
  directPostingEnabled: PropTypes.bool.isRequired,
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
};

export default GeneralSettings;
