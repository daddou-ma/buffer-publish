import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import ListItem from '../ListItem';

const StyledList = styled.ul`
  padding-left: 0px;
`;

const List = ({
  translations,
  campaigns,
  onViewCampaignClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  isUsingPublishAsTeamMember,
}) => {
  const listItems = campaigns.map(campaign => (
    <ListItem
      translations={translations}
      campaign={campaign}
      onViewCampaignClick={onViewCampaignClick}
      onDeleteCampaignClick={onDeleteCampaignClick}
      onEditCampaignClick={onEditCampaignClick}
      isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
      hasPosts
    />
  ));
  return <StyledList>{listItems}</StyledList>;
};

List.propTypes = {
  translations: PropTypes.shape({
    title: PropTypes.string.isRequired,
    createCampaign: PropTypes.string.isRequired,
    learnMore: PropTypes.string.isRequired,
    imageTag: PropTypes.string.isRequired,
  }).isRequired,
};

export default List;
