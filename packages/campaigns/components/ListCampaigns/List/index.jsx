import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from '../ListItem';

const StyledList = styled.ul`
  padding-left: 0px;
  width: 100%;
  margin-top: 0px;
`;

const List = ({
  translations,
  campaigns,
  onViewCampaignClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  isUsingPublishAsTeamMember,
  hasPosts,
}) => {
  const listItems = campaigns.map((campaign, index) => (
    <ListItem
      translations={translations}
      campaign={campaign}
      onViewCampaignClick={onViewCampaignClick}
      onDeleteCampaignClick={onDeleteCampaignClick}
      onEditCampaignClick={onEditCampaignClick}
      isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
      hasPosts={hasPosts}
      isEvenItem={index % 2 === 0}
    />
  ));
  return <StyledList>{listItems}</StyledList>;
};

List.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaigns: PropTypes.array, // eslint-disable-line
  onEditCampaignClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onViewCampaignClick: PropTypes.func.isRequired,
  hasPosts: PropTypes.bool.isRequired,
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
};

export default List;
