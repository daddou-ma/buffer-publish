import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BufferLoading } from '@bufferapp/publish-shared-components';
import { campaignPages } from '@bufferapp/publish-routes';
import CampaignsWrapper from '../CampaignsWrapper';
import CampaignForm from '../CampaignForm';
import ViewCampaign from '../ViewCampaign';
import ListCampaigns from '../ListCampaigns';

const useSetCampaignPage = ({ selectedPage, setViewMode }) => {
  useEffect(() => {
    const currentPage = selectedPage || campaignPages.VIEW_ALL_CAMPAIGNS;
    setViewMode(currentPage);
  });
};

/* Component */
const CampaignsPage = ({
  translations,
  campaigns,
  currentCampaign,
  campaignId,
  onOpenCreateCampaignClick,
  onCancelCreateCampaignClick,
  onCreateCampaignClick,
  isSaving,
  hasCampaignsFlip,
  selectedPage,
  fetchCampaign,
}) => {
  const [viewMode, setViewMode] = useState(campaignPages.VIEW_ALL_CAMPAIGNS);
  useSetCampaignPage({ selectedPage, setViewMode });

  if (!hasCampaignsFlip || isSaving) {
    return <BufferLoading fullscreen />;
  }

  return (
    <CampaignsWrapper>
      {viewMode === campaignPages.VIEW_CAMPAIGN && (
        <ViewCampaign
          currentCampaign={currentCampaign}
          campaignId={campaignId}
          isUsingPublishAsTeamMember
          translations={translations}
          onCreatePostClick={() => {}}
          onDeleteCampaignClick={() => {}}
          onEditCampaignClick={() => {}}
          fetchCampaign={fetchCampaign}
        />
      )}
      {viewMode === campaignPages.VIEW_ALL_CAMPAIGNS && (
        <ListCampaigns
          campaigns={campaigns}
          translations={translations}
          onOpenCampaign={() => setViewMode(campaignPages.VIEW_CAMPAIGN)}
          onOpenCreateCampaignClick={onOpenCreateCampaignClick}
        />
      )}
      {viewMode === campaignPages.CREATE_CAMPAIGN && (
        <CampaignForm
          isSaving={isSaving}
          translations={translations.createCampaign}
          onCreateCampaignClick={onCreateCampaignClick}
          onCancelClick={onCancelCreateCampaignClick}
        />
      )}
    </CampaignsWrapper>
  );
};

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  currentCampaign: PropTypes.object, // eslint-disable-line
  campaignId: PropTypes.string,
  onCreateCampaignClick: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  hasCampaignsFlip: PropTypes.bool,
  selectedPage: PropTypes.string.isRequired,
  onOpenCreateCampaignClick: PropTypes.func.isRequired,
  onCancelCreateCampaignClick: PropTypes.func.isRequired,
  fetchCampaign: PropTypes.func.isRequired,
};

CampaignsPage.defaultProps = {
  hasCampaignsFlip: false,
  campaignId: null,
};

export default CampaignsPage;
