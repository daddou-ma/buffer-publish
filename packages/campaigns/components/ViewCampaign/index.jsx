import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from './Header';
import EmptyState from './EmptyState';
import ExamplePost from './ExamplePost';

const Container = styled.div`
  margin: 18px;
`;

const ViewCampaign = ({
  campaignDetails,
  hasPosts,
  isOwner,
  translations,
  onCreatePostClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
}) => (
  <Container>
    <Header
      campaignDetails={campaignDetails}
      hasPosts={hasPosts}
      isOwner={isOwner}
      translations={translations.viewCampaign}
      onCreatePostClick={onCreatePostClick}
      onDeleteCampaignClick={onDeleteCampaignClick}
      onEditCampaignClick={onEditCampaignClick}
    />
    {hasPosts ? (
      <h1>Posts</h1> // replace with posts view
    ) : (
      <React.Fragment>
        <EmptyState
          translations={translations.viewCampaign}
          onCreatePostClick={onCreatePostClick}
          onDeleteCampaignClick={onDeleteCampaignClick}
          onEditCampaignClick={onEditCampaignClick}
        />
        <ExamplePost />
        <ExamplePost />
      </React.Fragment>
    )}
  </Container>
);

ViewCampaign.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaignDetails: PropTypes.object.isRequired, // eslint-disable-line
  isOwner: PropTypes.bool.isRequired,
  hasPosts: PropTypes.string.isRequired,
  onCreatePostClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
};

export default ViewCampaign;
