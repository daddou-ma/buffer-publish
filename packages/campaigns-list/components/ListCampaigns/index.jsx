import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
import { BufferLoading } from '@bufferapp/publish-shared-components';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import styled from 'styled-components';
import EmptyState from './EmptyState';
import List from './List';

const Header = styled.header`
  display: flex;
  align-items: center;
  button {
    margin-left: auto;
  }
`;

const Container = styled.div`
  margin: 13px;
`;

const ListCampaigns = ({
  translations,
  campaigns,
  onEditCampaignClick,
  onDeleteCampaignClick,
  onViewCampaignClick,
  goToAnalyzeReport,
  onOpenCreateCampaignClick,
  hideAnalyzeReport,
  hasCampaignsFlip,
  fetchCampaigns,
  isLoading,
}) => {
  if (!hasCampaignsFlip) {
    window.location = getURL.getPublishUrl();
    return null;
  }
  // Fetch Data
  useEffect(() => {
    fetchCampaigns();
  }, []);

  if (isLoading) {
    return <BufferLoading fullscreen />;
  }

  if (campaigns.length === 0) {
    return (
      <EmptyState
        translations={translations.emptyState}
        onOpenCreateCampaignClick={onOpenCreateCampaignClick}
      />
    );
  }

  return (
    <Container>
      <Header>
        <Text type="h2">Campaigns</Text>
        <Button
          type="primary"
          label="Create Campaign"
          onClick={onOpenCreateCampaignClick}
        />
      </Header>
      <List
        campaigns={campaigns}
        onEditCampaignClick={onEditCampaignClick}
        onDeleteCampaignClick={onDeleteCampaignClick}
        onViewCampaignClick={onViewCampaignClick}
        goToAnalyzeReport={goToAnalyzeReport}
        translations={translations.viewCampaign}
        hideAnalyzeReport={hideAnalyzeReport}
      />
    </Container>
  );
};

ListCampaigns.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onOpenCreateCampaignClick: PropTypes.func,
  onEditCampaignClick: PropTypes.func,
  onDeleteCampaignClick: PropTypes.func,
  onViewCampaignClick: PropTypes.func,
  goToAnalyzeReport: PropTypes.func,
  hideAnalyzeReport: PropTypes.bool.isRequired,
  hasCampaignsFlip: PropTypes.bool.isRequired,
  fetchCampaigns: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

ListCampaigns.defaultProps = {
  onOpenCreateCampaignClick: () => {},
  onEditCampaignClick: () => {},
  onDeleteCampaignClick: () => {},
  onViewCampaignClick: () => {},
  goToAnalyzeReport: () => {},
};

export default ListCampaigns;
