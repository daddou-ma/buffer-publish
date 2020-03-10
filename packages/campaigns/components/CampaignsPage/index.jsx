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
  onCreateOrUpdateCampaignClick,
  isSaving,
  hasCampaignsFlip,
  selectedPage,
  fetchCampaign,
  onViewCampaignClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  isUsingPublishAsTeamMember,
  goToAnalyzeReport,
}) => {
  const [viewMode, setViewMode] = useState(campaignPages.VIEW_ALL_CAMPAIGNS);
  useSetCampaignPage({ selectedPage, setViewMode });

  if (!hasCampaignsFlip || isSaving) {
    return <BufferLoading fullscreen />;
  }

  const isEditing = viewMode === campaignPages.EDIT_CAMPAIGN;
  const renderCampaignForm =
    viewMode === campaignPages.CREATE_CAMPAIGN || isEditing;

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
          onEditCampaignClick={() => setViewMode(campaignPages.EDIT_CAMPAIGN)}
          fetchCampaign={fetchCampaign}
          goToAnalyzeReport={goToAnalyzeReport}
        />
      )}
      {viewMode === campaignPages.VIEW_ALL_CAMPAIGNS && (
        <ListCampaigns
          campaigns={campaigns}
          isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
          onOpenCampaign={() => setViewMode(campaignPages.VIEW_CAMPAIGN)}
          onOpenCreateCampaignClick={onOpenCreateCampaignClick}
          onEditCampaign={() => setViewMode(campaignPages.EDIT_CAMPAIGN)}
          onEditCampaignClick={onEditCampaignClick}
          onDeleteCampaignClick={onDeleteCampaignClick}
          onViewCampaignClick={onViewCampaignClick}
          goToAnalyzeReport={goToAnalyzeReport}
          translations={translations}
        />
      )}
      {renderCampaignForm && (
        <CampaignForm
          campaignId={campaignId}
          isSaving={isSaving}
          translations={translations.campaignForm}
          onCreateOrUpdateCampaignClick={onCreateOrUpdateCampaignClick}
          onCancelClick={onCancelCreateCampaignClick}
          inEditMode={isEditing}
          currentCampaign={currentCampaign}
          fetchCampaign={fetchCampaign}
        />
      )}
    </CampaignsWrapper>
  );
};

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onCreateOrUpdateCampaignClick: PropTypes.func.isRequired,
  currentCampaign: PropTypes.object, // eslint-disable-line
  campaignId: PropTypes.string,
  isSaving: PropTypes.bool.isRequired,
  hasCampaignsFlip: PropTypes.bool,
  selectedPage: PropTypes.string.isRequired,
  onOpenCreateCampaignClick: PropTypes.func.isRequired,
  onCancelCreateCampaignClick: PropTypes.func.isRequired,
  goToAnalyzeReport: PropTypes.func.isRequired,
  fetchCampaign: PropTypes.func.isRequired,
  onViewCampaignClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
};

CampaignsPage.defaultProps = {
  hasCampaignsFlip: false,
  campaignId: null,
};

export default CampaignsPage;
