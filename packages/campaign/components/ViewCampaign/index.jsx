import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  QueueItems,
  Tabs,
  Tab,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import Header from './Header';
import EmptyState from './EmptyState';
import ExamplePost from './ExamplePost';

/* Styles */
const Container = styled.div`
  margin: 18px;
  max-width: 864px;
`;

/* Component */
const ViewCampaign = ({
  campaign,
  showComposer,
  isLoading,
  isUsingPublishAsTeamMember,
  translations,
  onCreatePostClick,
  onDeleteCampaignClick,
  onEditCampaignClick,
  campaignId,
  fetchCampaign,
  goToAnalyzeReport,
  onComposerCreateSuccess,
  onComposerOverlayClick,
  hasCampaignsFlip,
}) => {
  if (!hasCampaignsFlip) {
    window.location = getURL.getPublishUrl();
    return null;
  }
  // Fetch Data
  useEffect(() => {
    fetchCampaign({ campaignId });
  }, [campaignId]);
  // State
  const [listView, toggleView] = useState('scheduled');

  const campaignHasPosts = campaign?.items?.length > 0;

  if (isLoading) {
    return <BufferLoading />;
  }

  return (
    <Container>
      <Header
        campaignDetails={campaign}
        hasPosts={campaignHasPosts}
        isUsingPublishAsTeamMember={isUsingPublishAsTeamMember}
        translations={translations}
        onCreatePostClick={onCreatePostClick}
        onDeleteCampaignClick={onDeleteCampaignClick}
        onEditCampaignClick={onEditCampaignClick}
        goToAnalyzeReport={goToAnalyzeReport}
      />
      {showComposer && (
        <ComposerPopover
          onSave={onComposerCreateSuccess}
          type="queue"
          onComposerOverlayClick={onComposerOverlayClick}
          editMode={false}
        />
      )}
      {campaignHasPosts ? (
        <React.Fragment>
          <nav role="navigation">
            <Tabs
              selectedTabId={listView}
              onTabClick={tabId => toggleView(tabId)}
            >
              <Tab tabId="scheduled">{translations.scheduled}</Tab>
              <Tab tabId="sent">{translations.sent}</Tab>
            </Tabs>
          </nav>
          <QueueItems
            items={campaign.items}
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
            translations={translations}
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
  campaign: PropTypes.object.isRequired, // eslint-disable-line
  campaignPosts: PropTypes.array, // eslint-disable-line
  isUsingPublishAsTeamMember: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  onCreatePostClick: PropTypes.func.isRequired,
  onDeleteCampaignClick: PropTypes.func.isRequired,
  onEditCampaignClick: PropTypes.func.isRequired,
  fetchCampaign: PropTypes.func.isRequired,
  goToAnalyzeReport: PropTypes.func.isRequired,
  campaignId: PropTypes.string.isRequired,
  showComposer: PropTypes.bool.isRequired,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onComposerOverlayClick: PropTypes.func.isRequired,
  hasCampaignsFlip: PropTypes.bool.isRequired,
};

export default ViewCampaign;
