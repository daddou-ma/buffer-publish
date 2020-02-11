import React, { useState } from 'react';
import PropTypes from 'prop-types';
import EmptyState from '../EmptyState';
import CreateCampaign from '../CreateCampaign';

/* List of views available to be rendered */
const CREATE_CAMPAIGN = 'createCampaign';
const VIEW_CAMPAIGNS = 'viewCampaigns';

/* Component */
const CampaignsPage = ({ translations, campaigns, onCreateCampaignClick }) => {
  const [viewMode, setViewMode] = useState(VIEW_CAMPAIGNS);
  return (
    <React.Fragment>
      {viewMode === VIEW_CAMPAIGNS && campaigns.length === 0 && (
        <EmptyState
          translations={translations.emptyState}
          onOpenCreateCampaignClick={() => setViewMode(CREATE_CAMPAIGN)}
        />
      )}
      {viewMode === CREATE_CAMPAIGN && (
        <CreateCampaign
          translations={translations.createCampaign}
          onCreateCampaignClick={onCreateCampaignClick}
          onCancelClick={() => setViewMode(VIEW_CAMPAIGNS)}
        />
      )}
    </React.Fragment>
  );
};

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onCreateCampaignClick: PropTypes.func.isRequired,
};

export default CampaignsPage;
