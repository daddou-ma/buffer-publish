import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState';

const CampaignsPage = ({ translations, onCreateCampaignClick }) => (
  <EmptyState
    translations={translations.emptyState}
    onCreateCampaignClick={onCreateCampaignClick}
  />
);

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  onCreateCampaignClick: PropTypes.func.isRequired,
};

export default CampaignsPage;
