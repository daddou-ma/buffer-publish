import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BufferLoading } from '@bufferapp/publish-shared-components';
import { campaignPages } from '@bufferapp/publish-routes';
import CampaignsWrapper from '../CampaignsWrapper';
import CreateCampaign from '../CreateCampaign';
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
  onOpenCreateCampaignClick,
  onCancelCreateCampaignClick,
  onCreateCampaignClick,
  isSaving,
  hasCampaignsFlip,
  selectedPage,
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
          campaignDetails={{ id: 1 }}
          hasPosts={false}
          isOwner
          translations={translations}
          onCreatePostClick={() => {}}
          onDeleteCampaignClick={() => {}}
          onEditCampaignClick={() => {}}
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
        <CreateCampaign
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
  onCreateCampaignClick: PropTypes.func.isRequired,
  isSaving: PropTypes.bool.isRequired,
  hasCampaignsFlip: PropTypes.bool,
  selectedPage: PropTypes.string.isRequired,
  onOpenCreateCampaignClick: PropTypes.func.isRequired,
  onCancelCreateCampaignClick: PropTypes.func.isRequired,
};

CampaignsPage.defaultProps = {
  hasCampaignsFlip: false,
};

export default CampaignsPage;
