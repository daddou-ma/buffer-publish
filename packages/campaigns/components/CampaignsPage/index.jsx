import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';
import EmptyState from '../EmptyState';

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

const CampaignsPage = ({ translations, onCreateCampaignClick }) => (
  <Wrapper>
    <ProfileSidebarStyle>
      <ProfileSidebar />
    </ProfileSidebarStyle>
    <ContentStyle>
      <EmptyState
        translations={translations.emptyState}
        onCreateCampaignClick={onCreateCampaignClick}
      />
    </ContentStyle>
  </Wrapper>
);

CampaignsPage.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  onCreateCampaignClick: PropTypes.func.isRequired,
};

export default CampaignsPage;
