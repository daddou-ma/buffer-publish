import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import EmptyState from '../EmptyState';
import CreateCampaign from '../CreateCampaign';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const ProfileSidebarStyle = styled.div`
  flex-basis: 16rem;
  width: 16rem;
  min-width: 16rem;
  position: sticky;
  bottom: 0;
  top: 0;
  max-height: 100vh;
`;

const ContentStyle = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
  margin-right: 1rem;
  min-height: 100%;
`;

/* List of views available to be rendered */
const CREATE_CAMPAIGN = 'createCampaign';
const VIEW_CAMPAIGNS = 'viewCampaigns';

/* Component */
const CampaignsPage = ({ translations, campaigns, onCreateCampaignClick }) => {
  const [viewMode, setViewMode] = useState(VIEW_CAMPAIGNS);
  return (
    <Wrapper>
      <ProfileSidebarStyle>
        <ProfileSidebar />
      </ProfileSidebarStyle>
      <ContentStyle>
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
      </ContentStyle>
    </Wrapper>
  );
};

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onCreateCampaignClick: PropTypes.func.isRequired,
};

export default CampaignsPage;
