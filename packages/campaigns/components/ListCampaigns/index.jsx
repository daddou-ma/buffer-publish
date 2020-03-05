import React from 'react';
import PropTypes from 'prop-types';
import EmptyState from './EmptyState';

const ListCampaigns = ({
  translations,
  campaigns,
  onOpenCampaign,
  onOpenCreateCampaignClick,
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
