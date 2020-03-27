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

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 5rem;
`;

/* Component */
const ViewCampaign = ({
  campaign,
  campaignPosts,
  isLoading,
  hideAnalyzeReport,
  translations,
  campaignId,
  hasCampaignsFlip,
  showComposer,
  editMode,
  actions,
}) => {
  if (!hasCampaignsFlip) {
    window.location = getURL.getPublishUrl();
    return null;
  }
  // Fetch Data
  useEffect(() => {
    actions.fetchCampaign({ campaignId });
  }, [campaignId]);
  // State
  const [listView, toggleView] = useState('scheduled');

  const campaignHasPosts = campaignPosts?.length > 0;

  if (isLoading) {
    return (
      <Container>
        <LoadingContainer>
          <BufferLoading size={64} />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header
        campaignDetails={campaign}
        hideAnalyzeReport={hideAnalyzeReport}
        translations={translations}
        onCreatePostClick={actions.onCreatePostClick}
        onDeleteCampaignClick={actions.onDeleteCampaignClick}
        onEditCampaignClick={actions.onEditCampaignClick}
        goToAnalyzeReport={actions.goToAnalyzeReport}
      />
      {showComposer && (
        <ComposerPopover
          onSave={actions.onComposerCreateSuccess}
          type="queue"
          onComposerOverlayClick={actions.onComposerOverlayClick}
          editMode={editMode}
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
            items={campaignPosts}
            onDeleteConfirmClick={actions.onDeleteConfirmClick}
            onEditClick={actions.onEditClick}
            onShareNowClick={actions.onShareNowClick}
            onRequeueClick={actions.onRequeueClick}
            type="post"
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <EmptyState
            translations={translations}
            onCreatePostClick={actions.onCreatePostClick}
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
  hideAnalyzeReport: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  campaignId: PropTypes.string.isRequired,
  showComposer: PropTypes.bool.isRequired,
  editMode: PropTypes.bool.isRequired,
  hasCampaignsFlip: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    onEditClick: PropTypes.func.isRequired,
    onDeleteConfirmClick: PropTypes.func.isRequired,
    onShareNowClick: PropTypes.func.isRequired,
    onRequeueClick: PropTypes.func.isRequired,
    onCreatePostClick: PropTypes.func.isRequired,
    onDeleteCampaignClick: PropTypes.func.isRequired,
    onEditCampaignClick: PropTypes.func.isRequired,
    fetchCampaign: PropTypes.func.isRequired,
    goToAnalyzeReport: PropTypes.func.isRequired,
    onComposerCreateSuccess: PropTypes.func.isRequired,
    onComposerOverlayClick: PropTypes.func.isRequired,
  }).isRequired,
};

export default ViewCampaign;
