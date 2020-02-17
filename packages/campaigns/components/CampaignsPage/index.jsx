import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BufferLoading } from '@bufferapp/publish-shared-components';
import EmptyState from '../EmptyState';
import CampaignsWrapper from '../CampaignsWrapper';
import CreateCampaign from '../CreateCampaign';

/* List of views available to be rendered */
const CREATE_CAMPAIGN = 'createCampaign';
const VIEW_CAMPAIGNS = 'viewCampaigns';

/* Component */
const CampaignsPage = ({
  translations,
  campaigns,
  onCreateCampaignClick,
  hasCampaignsFlip,
}) => {
  const [viewMode, setViewMode] = useState(VIEW_CAMPAIGNS);

  if (!hasCampaignsFlip) {
    return <BufferLoading fullscreen />;
  }

  return (
    <CampaignsWrapper>
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
    </CampaignsWrapper>
  );
};

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onCreateCampaignClick: PropTypes.func.isRequired,
  hasCampaignsFlip: PropTypes.bool,
};

CampaignsPage.defaultProps = {
  hasCampaignsFlip: false,
};

export default CampaignsPage;
