import React from 'react';
import PropTypes from 'prop-types';

import {
  EmptyState,
  BufferLoading,
  ComposerInput,
  QueueItems,
} from '@bufferapp/publish-shared-components';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';
import ProfilesDisconnectedBanner from '@bufferapp/publish-profiles-disconnected-banner';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';

import InstagramDirectPostingBanner from '../InstagramDirectPostingBanner';
import QueuePausedBar from '../QueuePausedBar';
import RemindersBanner from '../RemindersBanner';

const ErrorBoundary = getErrorBoundary(true);

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const topBarContainerStyle = {
  display: 'flex',
};

const loadingContainerStyle = {
  width: '100%',
  height: '100%',
  textAlign: 'center',
  paddingTop: '5rem',
};

const QueuedPosts = ({
  showEmptyQueueMessage,
  loading,
  items,
  onComposerPlaceholderClick,
  onComposerCreateSuccess,
  onRequeueClick,
  onDeleteConfirmClick,
  onEditClick,
  onEmptySlotClick,
  onCalendarClick,
  onShareNowClick,
  onDropPost,
  onSwapPosts,
  showComposer,
  editMode,
  paused,
  draggingEnabled,
  onUnpauseClick,
  subprofiles,
  isInstagramProfile,
  isInstagramBusiness,
  onDirectPostingClick,
  isInstagramLoading,
  isLockedProfile,
  shouldDisplayDisconnectedBanner,
  isManager,
  hasFirstCommentFlip,
  hasPushNotifications,
  onComposerOverlayClick,
  onSetRemindersClick,
  onCampaignTagClick,
  hasCampaignsFeature,
  hasCalendarFeature,
  shouldDisplaySingleSlots,
  preserveComposerStateOnClose,
  shouldDisplayRemindersBanner,
  shouldDisplayTimezone,
  profileTimezone,
  onTimezoneClick,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
      </div>
    );
  }

  if (isInstagramLoading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} fullscreen dark />
      </div>
    );
  }

  if (isLockedProfile) {
    return <LockedProfileNotification />;
  }

  return (
    <ErrorBoundary>
      {shouldDisplayDisconnectedBanner && <ProfilesDisconnectedBanner />}
      {shouldDisplayRemindersBanner && (
        <RemindersBanner onSetRemindersClick={onSetRemindersClick} />
      )}
      <div style={topBarContainerStyle}>
        <div style={composerStyle}>
          {showComposer && !editMode && (
            <ComposerPopover
              onSave={onComposerCreateSuccess}
              preserveComposerStateOnClose={preserveComposerStateOnClose}
              type="queue"
              onComposerOverlayClick={onComposerOverlayClick}
              editMode={editMode}
            />
          )}
          <ComposerInput
            onPlaceholderClick={onComposerPlaceholderClick}
            placeholder="What would you like to share?"
          />
        </div>
      </div>
      {isInstagramProfile && !isInstagramBusiness && (
        <InstagramDirectPostingBanner
          onDirectPostingClick={onDirectPostingClick}
        />
      )}
      {!!paused && (
        <QueuePausedBar
          isManager={isManager}
          handleClickUnpause={onUnpauseClick}
        />
      )}
      {showEmptyQueueMessage && (
        <EmptyState
          title="It looks like you haven't got any posts in your queue!"
          subtitle="Click the box above to add a post to your queue :)"
          heroImg="https://s3.amazonaws.com/buffer-publish/images/fresh-queue%402x.png"
          heroImgSize={{ width: '229px', height: '196px' }}
        />
      )}
      {showComposer && editMode && (
        <ComposerPopover
          onSave={onComposerCreateSuccess}
          type="queue"
          onComposerOverlayClick={onComposerOverlayClick}
          editMode={editMode}
        />
      )}
      <QueueItems
        items={items}
        subprofiles={subprofiles}
        onCalendarClick={onCalendarClick}
        onRequeueClick={onRequeueClick}
        onDeleteConfirmClick={onDeleteConfirmClick}
        onEditClick={onEditClick}
        onEmptySlotClick={onEmptySlotClick}
        onShareNowClick={onShareNowClick}
        onDropPost={onDropPost}
        onSwapPosts={onSwapPosts}
        draggable={draggingEnabled}
        hasFirstCommentFlip={hasFirstCommentFlip}
        hasPushNotifications={hasPushNotifications}
        onSetRemindersClick={onSetRemindersClick}
        onCampaignTagClick={onCampaignTagClick}
        hasCampaignsFeature={hasCampaignsFeature}
        shouldRenderCalendarButtons={hasCalendarFeature}
        timezoneItems={{
          shouldDisplayTimezone,
          profileTimezone,
          onTimezoneClick,
        }}
        pinned={!shouldDisplaySingleSlots}
      />
    </ErrorBoundary>
  );
};

QueuedPosts.propTypes = {
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ).isRequired,
  subprofiles: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
  showEmptyQueueMessage: PropTypes.bool,
  onComposerPlaceholderClick: PropTypes.func.isRequired,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onComposerOverlayClick: PropTypes.func.isRequired,
  onRequeueClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onEmptySlotClick: PropTypes.func.isRequired,
  onShareNowClick: PropTypes.func.isRequired,
  onCampaignTagClick: PropTypes.func,
  onDropPost: PropTypes.func.isRequired,
  onSwapPosts: PropTypes.func.isRequired,
  onSetRemindersClick: PropTypes.func.isRequired,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  paused: PropTypes.bool,
  draggingEnabled: PropTypes.bool,
  onUnpauseClick: PropTypes.func.isRequired,
  isManager: PropTypes.bool,
  isInstagramProfile: PropTypes.bool,
  isInstagramBusiness: PropTypes.bool,
  hasPushNotifications: PropTypes.bool,
  shouldDisplayRemindersBanner: PropTypes.bool,
  onDirectPostingClick: PropTypes.func.isRequired,
  isInstagramLoading: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
  shouldDisplayDisconnectedBanner: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  onCalendarClick: PropTypes.func.isRequired,
  hasCampaignsFeature: PropTypes.bool,
  hasCalendarFeature: PropTypes.bool,
  shouldDisplaySingleSlots: PropTypes.bool,
  preserveComposerStateOnClose: PropTypes.bool,
  shouldDisplayTimezone: PropTypes.bool,
  profileTimezone: PropTypes.string,
  onTimezoneClick: PropTypes.func.isRequired,
};

QueuedPosts.defaultProps = {
  preserveComposerStateOnClose: true,
  shouldDisplayTimezone: false,
  profileTimezone: '',
  loading: true,
  moreToLoad: false,
  page: 1,
  showComposer: false,
  showEmptyQueueMessage: false,
  editMode: false,
  paused: false,
  subprofiles: [],
  isInstagramProfile: false,
  isInstagramBusiness: false,
  hasPushNotifications: true,
  shouldDisplayRemindersBanner: false,
  isInstagramLoading: false,
  isLockedProfile: false,
  shouldDisplayDisconnectedBanner: false,
  hasFirstCommentFlip: false,
  draggingEnabled: false,
  isManager: false,
  hasCampaignsFeature: false,
  hasCalendarFeature: false,
  shouldDisplaySingleSlots: false,
  onCampaignTagClick: () => {},
};

export default QueuedPosts;
