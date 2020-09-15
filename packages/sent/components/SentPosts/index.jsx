import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  QueueItems,
  EmptyState,
  BufferLoading,
  BitlyClickNotification,
} from '@bufferapp/publish-shared-components';
import { Divider, Text } from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import ProfilesDisconnectedBanner from '@bufferapp/publish-profiles-disconnected-banner';

const ErrorBoundary = getErrorBoundary(true);

const headerStyle = {
  marginBottom: '1.5rem',
  width: '100%',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const topBarContainerStyle = {
  display: 'flex',
};

const composerStyle = {
  flexGrow: '1',
};

const loadMoreButtonStyle = {
  textAlign: 'center',
  paddingBottom: '3rem',
};

const NoPostsPublished = ({ total, has30DaySentPostsLimitFeature }) => {
  if (typeof total === 'undefined' || total > 0) {
    return null;
  }
  return (
    <>
      <EmptyState
        height="initial"
        title={
          has30DaySentPostsLimitFeature
            ? 'You haven’t published any posts with this account in the past 30 days!'
            : 'You haven’t published any posts with this account!'
        }
        subtitle="Once a post has gone live via Buffer, you can track its performance here to learn what works best with your audience!"
        heroImg="https://s3.amazonaws.com/buffer-publish/images/empty-sent2x.png"
        heroImgSize={{ width: '270px', height: '150px' }}
      />
    </>
  );
};

NoPostsPublished.propTypes = {
  total: PropTypes.number,
  has30DaySentPostsLimitFeature: PropTypes.bool,
};

NoPostsPublished.defaultProps = {
  total: undefined,
  has30DaySentPostsLimitFeature: true,
};

const SentPosts = ({
  total,
  loading,
  items,
  onEditClick,
  onShareAgainClick,
  onCampaignTagClick,
  onComposerCreateSuccess,
  showComposer,
  editMode,
  isManager,
  isLockedProfile,
  isDisconnectedProfile,
  has30DaySentPostsLimitFeature,
  hasFirstCommentFlip,
  hasCampaignsFeature,
  hasShareAgainFeature,
  hasBitlyFeature,
  moreToLoad,
  tabId,
  profileId,
  page,
  loadMore,
  showAnalyzeBannerAfterFirstPost,
  analyzeCrossSale,
  fetchSentPosts,
  linkShortening,
  hasBitlyPosts,
  fetchCampaignsIfNeeded,
  profileServiceType,
  profileService,
  hasAnalyticsOnPosts,
  hasTwitterImpressions,
}) => {
  useEffect(() => {
    fetchSentPosts();
  }, [profileId]);

  useEffect(() => {
    fetchCampaignsIfNeeded();
  }, []);

  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  const loadMorePosts = () => {
    loadMore({ profileId, page, tabId });
  };

  const header = has30DaySentPostsLimitFeature
    ? 'Your sent posts for the last 30 days'
    : 'Your sent posts';
  return (
    <ErrorBoundary>
      {isDisconnectedProfile && <ProfilesDisconnectedBanner />}
      <NoPostsPublished
        has30DaySentPostsLimitFeature={has30DaySentPostsLimitFeature}
        total={total}
      />

      {total > 0 ? (
        <>
          <div>
            <div style={headerStyle}>
              <div className="js-page-header">
                <Text color="black">{header}</Text>
              </div>
              <Divider />
            </div>
            <BitlyClickNotification
              hasBitlyPosts={hasBitlyPosts}
              isBitlyConnected={!!linkShortening.isBitlyConnected}
              hasBitlyFeature={hasBitlyFeature}
            />
            <div style={topBarContainerStyle}>
              {showComposer && !editMode && (
                <div style={composerStyle}>
                  <ComposerPopover
                    onSave={onComposerCreateSuccess}
                    type="sent"
                  />
                </div>
              )}
            </div>
            {showComposer && editMode && (
              <ComposerPopover onSave={onComposerCreateSuccess} type="sent" />
            )}
            <QueueItems
              items={items}
              onEditClick={onEditClick}
              onShareAgainClick={onShareAgainClick}
              onCampaignTagClick={onCampaignTagClick}
              isManager={isManager}
              isSent
              showShareAgainButton={hasShareAgainFeature}
              hasFirstCommentFlip={hasFirstCommentFlip}
              hasCampaignsFeature={hasCampaignsFeature}
              showAnalyzeBannerAfterFirstPost={showAnalyzeBannerAfterFirstPost}
              analyzeCrossSale={analyzeCrossSale}
              profileServiceType={profileServiceType}
              profileService={profileService}
              hasAnalyticsOnPosts={hasAnalyticsOnPosts}
              hasTwitterImpressions={hasTwitterImpressions}
            />
          </div>
          {moreToLoad && (
            <div style={loadMoreButtonStyle}>
              <Button
                type="primary"
                label="Load More"
                onClick={loadMorePosts}
              />
            </div>
          )}
        </>
      ) : null}
    </ErrorBoundary>
  );
};

SentPosts.propTypes = {
  fetchSentPosts: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  hasBitlyFeature: PropTypes.bool.isRequired,
  has30DaySentPostsLimitFeature: PropTypes.bool.isRequired,
  hasShareAgainFeature: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      queueItemType: PropTypes.string,
      dayOfWeek: PropTypes.string,
      hasCommentEnabled: PropTypes.bool,
    })
  ).isRequired,
  total: PropTypes.number,
  showComposer: PropTypes.bool,
  showAnalyzeBannerAfterFirstPost: PropTypes.bool,
  analyzeCrossSale: PropTypes.bool,
  editMode: PropTypes.bool,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onEditClick: PropTypes.func,
  onShareAgainClick: PropTypes.func,
  onCampaignTagClick: PropTypes.func,
  isManager: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
  isDisconnectedProfile: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  hasCampaignsFeature: PropTypes.bool,
  linkShortening: PropTypes.shape({
    isBitlyConnected: PropTypes.bool,
  }),
  hasBitlyPosts: PropTypes.bool,
  fetchCampaignsIfNeeded: PropTypes.func.isRequired,
  hasAnalyticsOnPosts: PropTypes.bool,
  hasTwitterImpressions: PropTypes.bool,
};

SentPosts.defaultProps = {
  loading: true,
  moreToLoad: false,
  page: 1,
  total: 0,
  showComposer: false,
  showAnalyzeBannerAfterFirstPost: false,
  analyzeCrossSale: false,
  editMode: false,
  isManager: true,
  hasFirstCommentFlip: false,
  hasCampaignsFeature: false,
  hasShareAgainFeature: false,
  isLockedProfile: false,
  isDisconnectedProfile: false,
  hasBitlyPosts: false,
  onEditClick: () => {},
  onShareAgainClick: () => {},
  onCampaignTagClick: () => {},
  linkShortening: {
    isBitlyConnected: false,
  },
  hasAnalyticsOnPosts: false,
  hasTwitterImpressions: false,
};

export default SentPosts;
