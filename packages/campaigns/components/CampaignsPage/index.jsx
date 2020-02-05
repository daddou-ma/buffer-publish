import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState';
import CreateCampaign from '../CreateCampaign';

/* List of views available to be rendered */
const CREATE_CAMPAIGN = 'createCampaign';
const VIEW_CAMPAIGNS = 'viewCampaigns';

/* Component */
const CampaignsPage = ({ translations, onCreateCampaignClick }) => {
  const [viewMode, setViewMode] = useState(VIEW_CAMPAIGNS);
  return (
    <React.Fragment>
      {viewMode === VIEW_CAMPAIGNS && (
        <EmptyState
          translations={translations.emptyState}
          onCreateCampaignClick={onCreateCampaignClick}
        />
      )}
      {viewMode === CREATE_CAMPAIGN && (
        <CreateCampaign
          translations={translations.createCampaign}
          onCancelClick={() => setViewMode(VIEW_CAMPAIGNS)}
        />
      )}
    </React.Fragment>
  );
};

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  onCreateCampaignClick: PropTypes.func.isRequired,
};

export default CampaignsPage;
