import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BufferLoading } from '@bufferapp/publish-shared-components';
import { campaignPages } from '@bufferapp/publish-routes';
import CampaignsWrapper from '../CampaignsWrapper';
import CreateCampaign from '../CreateCampaign';
import ViewCampaign from '../ViewCampaign';
import ListCampaigns from '../ListCampaigns';

/* List of views available to be rendered */
const CREATE_CAMPAIGN = 'createCampaign';
const VIEW_ALL_CAMPAIGNS = 'viewAllCampaigns';
const VIEW_CAMPAIGN = 'viewCampaign';

const useSetCampaignPage = ({ campaignPage, setViewMode }) => {
  useEffect(() => {
    switch (campaignPage) {
      case campaignPages.NEW:
        setViewMode(CREATE_CAMPAIGN);
        break;
      case campaignPages.SCHEDULED:
        setViewMode(VIEW_CAMPAIGN);
        break;
      case campaignPages.CAMPAIGNS:
        setViewMode(VIEW_ALL_CAMPAIGNS);
        break;
      default:
        setViewMode(VIEW_ALL_CAMPAIGNS);
        break;
    }
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
  campaignPage,
}) => {
  const [viewMode, setViewMode] = useState(VIEW_ALL_CAMPAIGNS);
  useSetCampaignPage({ campaignPage, setViewMode });

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
          onOpenCreateCampaignClick={onOpenCreateCampaignClick}
        />
      )}
      {viewMode === CREATE_CAMPAIGN && (
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
  campaignPage: PropTypes.string.isRequired,
  onOpenCreateCampaignClick: PropTypes.func.isRequired,
  onCancelCreateCampaignClick: PropTypes.func.isRequired,
};

CampaignsPage.defaultProps = {
  hasCampaignsFlip: false,
};

export default CampaignsPage;
