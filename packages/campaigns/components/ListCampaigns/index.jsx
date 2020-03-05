import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from './EmptyState';
import List from './List';
import { Text, Button } from '@bufferapp/ui';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
`;

const ListCampaigns = ({
  translations,
  // campaigns,
  hasCampaignPosts,
  onEditCampaignClick,
  onDeleteCampaignClick,
  onViewCampaignClick,
  onOpenCreateCampaignClick,
  isUsingPublishAsTeamMember,
}) => {
  const campaigns = [
    {
      name: '#SaveOurSeasWeek',
      color: '#9C2BFF',
      dateRange: 'Jan 5-18, 2020',
      scheduled: '7 Scheduled',
      sent: '1 Sent',
      lastUpdated: 'Last updated 3 hours ago',
      campaignId: '1',
    },
    {
      name: 'A Longer Campaign Name',
      color: '#9C2BFF',
      dateRange: 'Feb 15-28, 2020',
      scheduled: '8 Scheduled',
      sent: '0 Sent',
      lastUpdated: 'Last updated 2 days ago',
      campaignId: '2',
    },
    {
      name: 'Hello World',
      color: '#9C2BFF',
      dateRange: 'March 23-April 4, 2020',
      scheduled: '11 Scheduled',
      sent: '25 Sent',
      lastUpdated: 'Last updated yesterday',
      campaignId: '3',
    },
  ];
  if (campaigns.length === 0) {
    return (
      <EmptyState
        translations={translations.emptyState}
        onOpenCreateCampaignClick={onOpenCreateCampaignClick}
      />
    );
  }

  return (
    <React.Fragment>
      <Header>
        <Text type="h1">Campaigns</Text> 
        <Button label="Create Campaign" />
      </Header>
      <List
        campaigns={campaigns}
        onEditCampaignClick={onEditCampaignClick}
        onDeleteCampaignClick={onDeleteCampaignClick}
        onViewCampaignClick={onViewCampaignClick}
        translations={translations.viewCampaign}
        hasCampaignPosts={hasCampaignPosts}
        isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
      />
    </React.Fragment>
  );
};

ListCampaigns.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onOpenCreateCampaignClick: PropTypes.func,
  onEditCampaignClick: PropTypes.func,
  onDeleteCampaignClick: PropTypes.func,
  onViewCampaignClick: PropTypes.func,
  hasCampaignPosts: PropTypes.bool,
  isUsingPublishAsTeamMember: PropTypes.bool,
};

ListCampaigns.defaultProps = {
  onOpenCreateCampaignClick: () => {},
  onEditCampaignClick: () => {},
  onDeleteCampaignClick: () => {},
  onViewCampaignClick: () => {},
};

export default ListCampaigns;
