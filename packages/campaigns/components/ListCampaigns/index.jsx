import React from 'react';
import PropTypes from 'prop-types';
import { Text, Button } from '@bufferapp/ui';
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
  max-width: 864px;
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
  isUsingPublishAsTeamMember,
}) => {
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
        isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
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
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
};

ListCampaigns.defaultProps = {
  onOpenCreateCampaignClick: () => {},
  onEditCampaignClick: () => {},
  onDeleteCampaignClick: () => {},
  onViewCampaignClick: () => {},
  goToAnalyzeReport: () => {},
};

export default ListCampaigns;
