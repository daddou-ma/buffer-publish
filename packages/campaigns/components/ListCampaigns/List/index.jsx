import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListItem from '../ListItem';

const StyledList = styled.table`
  padding-left: 0px;
  width: 100%;
  border-collapse: collapse;
`;

// const ColSpan = styled.div`
//   grid-column-start: 2;
//   grid-column-end: 4;
// `;

// const Grid = styled.div`
//   display: grid;
//   grid-template-columns: auto 1fr;
// `;

const List = ({
  translations,
  campaigns,
  onViewCampaignClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  isUsingPublishAsTeamMember,
  hasCampaignPosts,
}) => {
  const listItems = campaigns.map((campaign, index) => (
    <ListItem
      translations={translations}
      campaign={campaign}
      onViewCampaignClick={onViewCampaignClick}
      onDeleteCampaignClick={onDeleteCampaignClick}
      onEditCampaignClick={onEditCampaignClick}
      isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
      hasCampaignPosts={hasCampaignPosts}
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
  hasCampaignPosts: PropTypes.bool.isRequired,
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
};

export default List;
