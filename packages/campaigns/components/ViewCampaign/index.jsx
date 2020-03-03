import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { QueueItems, Tabs, Tab } from '@bufferapp/publish-shared-components';
import Header from './Header';
import EmptyState from './EmptyState';
import ExamplePost from './ExamplePost';

/* Styles */
const Container = styled.div`
  margin: 18px;
`;

/* Component */
const ViewCampaign = ({
  campaignPosts,
  campaignDetails,
  hasPosts,
  isUsingPublishAsTeamMember,
  translations,
  onCreatePostClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
}) => {
  // State
  const [listView, toggleView] = useState('scheduled');

  return (
    <Container>
      <Header
        campaignDetails={campaignDetails}
        hasPosts={hasPosts}
        isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
        translations={translations.viewCampaign}
        onCreatePostClick={onCreatePostClick}
        onDeleteCampaignClick={onDeleteCampaignClick}
        onEditCampaignClick={onEditCampaignClick}
      />
      {hasPosts ? (
        <React.Fragment>
          <nav role="navigation">
            <Tabs
              selectedTabId={listView}
              onTabClick={tabId => toggleView(tabId)}
            >
              <Tab tabId="scheduled">{translations.viewCampaign.scheduled}</Tab>
              <Tab tabId="sent">{translations.viewCampaign.sent}</Tab>
            </Tabs>
          </nav>
          <QueueItems
            items={campaignPosts}
            onDeleteConfirmClick={null}
            onEditClick={null}
            onShareNowClick={null}
            draggable={false}
            type="post"
            hasFirstCommentFlip={null}
            isBusinessAccount={null}
            onPreviewClick={null}
            serviceId={null}
            userData={null}
          />
        </React.Fragment>
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
};

ViewCampaign.propTypes = {
  translations: PropTypes.object.isRequired, // eslint-disable-line
  campaignDetails: PropTypes.object.isRequired, // eslint-disable-line
  campaignPosts: PropTypes.array, // eslint-disable-line
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
  hasPosts: PropTypes.string.isRequired,
  onCreatePostClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
};

export default ViewCampaign;
