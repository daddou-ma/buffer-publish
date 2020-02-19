import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BufferLoading } from '@bufferapp/publish-shared-components';
import CampaignsWrapper from '../CampaignsWrapper';
import CreateCampaign from '../CreateCampaign';
import ViewCampaign from '../ViewCampaign';
import ListCampaigns from '../ListCampaigns';

/* List of views available to be rendered */
const CREATE_CAMPAIGN = 'createCampaign';
const VIEW_ALL_CAMPAIGNS = 'viewAllCampaigns';
const VIEW_CAMPAIGN = 'viewCampaign';

/* Component */
const CampaignsPage = ({
  translations,
  campaigns,
  onOpenCreateCampaignClick,
  onCreateCampaignClick,
  isSaving,
  hasCampaignsFlip,
  campaignId,
  campaignPage,
}) => {
  console.log('campaignId', campaignId);
  console.log('campaignPage', campaignPage);
  const [viewMode, setViewMode] = useState(VIEW_ALL_CAMPAIGNS);
  useEffect(() => {
    if (campaignId !== null) {
      setViewMode(VIEW_CAMPAIGN);
    }
  });

  if (!hasCampaignsFlip || isSaving) {
    return <BufferLoading fullscreen />;
  }

  return (
    <CampaignsWrapper>
      {viewMode === VIEW_CAMPAIGN && (
        <ViewCampaign
          campaignDetails={{ id: 1 }}
          hasPosts={false}
          isOwner
          translations={translations}
          onCreatePostClick={() => {}}
          onDeleteCampaignClick={() => {}}
          onEditCampaignClick={() => {}}
        />
      )}
      {viewMode === VIEW_ALL_CAMPAIGNS && (
        <ListCampaigns
          campaigns={campaigns}
          translations={translations}
          onOpenCampaign={() => setViewMode(VIEW_CAMPAIGN)}
          onOpenCreateCampaignClick={() => setViewMode(CREATE_CAMPAIGN)}
        />
      )}
      {viewMode === CREATE_CAMPAIGN && (
        <CreateCampaign
          isSaving={isSaving}
          translations={translations.createCampaign}
          onCreateCampaignClick={onCreateCampaignClick}
          onCancelClick={() => setViewMode(VIEW_ALL_CAMPAIGNS)}
        />
      )}
    </CampaignsWrapper>
  );
};

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onCreateCampaignClick: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  hasCampaignsFlip: PropTypes.bool,
  campaignId: PropTypes.string,
  campaignPage: PropTypes.string.isRequired,
};

CampaignsPage.defaultProps = {
  hasCampaignsFlip: false,
  campaignId: null,
};

export default CampaignsPage;
