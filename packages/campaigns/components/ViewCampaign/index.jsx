import React, { useState, useEffect } from 'react';
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
  currentCampaign,
  isUsingPublishAsTeamMember,
  translations,
  onCreatePostClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  campaignId,
  fetchCampaign,
  goToAnalyzeReport,
}) => {
  // Fetch Data
  useEffect(() => {
    fetchCampaign(campaignId);
  }, [campaignId]);
  // State
  const [listView, toggleView] = useState('scheduled');

  const campaignHasPosts = currentCampaign?.items?.length > 0;

  return (
    <Container>
      <Header
        campaignDetails={currentCampaign}
        hasPosts={campaignHasPosts}
        isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
        translations={translations.viewCampaign}
        onCreatePostClick={onCreatePostClick}
        onDeleteCampaignClick={onDeleteCampaignClick}
        onEditCampaignClick={onEditCampaignClick}
        goToAnalyzeReport={goToAnalyzeReport}
      />
      {campaignHasPosts ? (
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
            items={currentCampaign.items}
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
  currentCampaign: PropTypes.object.isRequired, // eslint-disable-line
  campaignPosts: PropTypes.array, // eslint-disable-line
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
  onCreatePostClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
  fetchCampaign: PropTypes.func.isRequired,
  goToAnalyzeReport: PropTypes.func.isRequired,
  campaignId: PropTypes.string,
};

export default ViewCampaign;
