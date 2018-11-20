import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '@bufferapp/components';
import InstagramDirectPosting from '../InstagramDirectPosting';
import LinkShortening from '../LinkShortening';

const GeneralSettings = ({
  directPostingEnabled,
  onSetUpDirectPostingClick,
  linkShorteners,
  profileService,
  loadingLinkShorteners,
  onLinkShortenerOptionSelect,
  selectedShortener,
  onConnectBitlyURLClick,
  onDisconnectBitlyURLClick,
  isContributor,
  features,
}) => (
  <div>
    {!directPostingEnabled &&
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
  </div>
);

GeneralSettings.defaultProps = {
  directPostingEnabled: false,
  profileService: null,
  linkShorteners: null,
  loadingLinkShorteners: true,
  onLinkShortenerOptionSelect: null,
  selectedShortener: null,
  isContributor: null,
};

GeneralSettings.propTypes = {
  isContributor: PropTypes.bool,
  directPostingEnabled: PropTypes.bool.isRequired,
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
  features: PropTypes.shape({
    isFreeUser: PropTypes.func,
  }).isRequired,
};

export default GeneralSettings;
