import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
} from '@bufferapp/components';
import {
  EmptyState,
  PostDragLayer,
  BufferLoading,
  LockedProfileNotification,
} from '@bufferapp/publish-shared-components';

import ComposerPopover from '@bufferapp/publish-composer-popover';
import FeatureLoader, { WithFeatureLoader } from '@bufferapp/product-features';
import InstagramDirectPostingBanner from '../InstagramDirectPostingBanner';
import InstagramDirectPostingModal from '../InstagramDirectPostingModal';
import QueueItems from '../QueueItems';
import QueuePausedBar from '../QueuePausedBar';

const composerStyle = {
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const composerInputStyle = {
  alignItems: 'center',
  border: '1px solid #B8B8B8',
  borderRadius: '4px',
  boxShadow: '0 1px 4px rgba(0,0,0,.16)',
  color: '#999999',
  cursor: 'pointer',
  display: 'flex',
  fontFamily: 'Roboto',
  fontSize: '14px',
  height: '48px',
  paddingLeft: '16px',
  paddingRight: '16px',
};

const composerInputIcoCameraStyle = {
  background: 'url("https://s3.amazonaws.com/buffer-publish/images/ico-camera.svg") no-repeat',
  width: '16px',
  height: '16px',
  marginLeft: 'auto',
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

const buttonStyle = {
  height: '37px',
  marginLeft: '1.5rem',
  minWidth: '150px',
  alignItems: 'center',
  display: 'flex',
};

/* eslint-enable react/prop-types */

const QueuedPosts = ({
  total,
  loading,
  postLists,
  onComposerPlaceholderClick,
  onComposerCreateSuccess,
  onCancelConfirmClick,
  onRequeueClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  showComposer,
  showCalendar,
  editMode,
  paused,
  onUnpauseClick,
  subprofiles,
  isInstagramProfile,
  isInstagramBusiness,
  onSetUpDirectPostingClick,
  showInstagramModal,
  onDirectPostingClick,
  onHideInstagramModal,
  isBusinessOnInstagram,
  onCheckInstagramBusinessClick,
  hasInstagramFeatureFlip,
  isInstagramLoading,
  isLockedProfile,
  features,
  isManager,
  isBusinessAccount,
  onClickUpgrade,
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
    if (features.isFreeUser()) {
      return (
        <LockedProfileNotification
          onClickUpgrade={onClickUpgrade}
          plan={'free'}
        />
      );
    } else if (features.isProUser()) {
      return (
        <LockedProfileNotification
          onClickUpgrade={onClickUpgrade}
          plan={'pro'}
        />
      );
    }
  }

  return (
    <div>
      <PostDragLayer />

      <div style={topBarContainerStyle}>
        <div style={composerStyle}>
          {showComposer && !editMode &&
            <ComposerPopover
              onSave={onComposerCreateSuccess}
              preserveComposerStateOnClose
              type={'queue'}
            />
          }
          <div
            style={composerInputStyle}
            onClick={onComposerPlaceholderClick}>
            What would you like to share?
            <div style={composerInputIcoCameraStyle}></div>
          </div>
        </div>

      </div>
      {!hasInstagramFeatureFlip && isInstagramProfile && !isInstagramBusiness &&
        <InstagramDirectPostingBanner onDirectPostingClick={onSetUpDirectPostingClick} />
      }
      {hasInstagramFeatureFlip && isInstagramProfile && !isInstagramBusiness &&
        <InstagramDirectPostingBanner onDirectPostingClick={onDirectPostingClick} />
      }
      {hasInstagramFeatureFlip && showInstagramModal &&
        <InstagramDirectPostingModal
          onSetUpDirectPostingClick={onSetUpDirectPostingClick}
          onHideInstagramModal={onHideInstagramModal}
          isBusinessOnInstagram={isBusinessOnInstagram}
          onCheckInstagramBusinessClick={onCheckInstagramBusinessClick}
        />
      }
      {!!paused && <QueuePausedBar isManager={isManager} handleClickUnpause={onUnpauseClick} />}
      {total < 1 &&
        <EmptyState
          title="It looks like you haven't got any posts in your queue!"
          subtitle="Click the box above to add a post to your queue :)"
          heroImg="https://s3.amazonaws.com/buffer-publish/images/fresh-queue%402x.png"
          heroImgSize={{ width: '229px', height: '196px' }}
        />
      }
      {showComposer && editMode &&
        <ComposerPopover
          onSave={onComposerCreateSuccess}
          type={'queue'}
        />
      }
      <QueueItems
        items={postLists}
        subprofiles={subprofiles}
        onCancelConfirmClick={onCancelConfirmClick}
        onRequeueClick={onRequeueClick}
        onDeleteClick={onDeleteClick}
        onDeleteConfirmClick={onDeleteConfirmClick}
        onEditClick={onEditClick}
        onShareNowClick={onShareNowClick}
        onImageClick={onImageClick}
        onImageClickNext={onImageClickNext}
        onImageClickPrev={onImageClickPrev}
        onImageClose={onImageClose}
        onDropPost={onDropPost}
        draggable={!paused}
      />
    </div>
  );
};

QueuedPosts.propTypes = {
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ).isRequired,
  subprofiles: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
  total: PropTypes.number,
  onComposerPlaceholderClick: PropTypes.func.isRequired,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onCancelConfirmClick: PropTypes.func.isRequired,
  onRequeueClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onDeleteConfirmClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onShareNowClick: PropTypes.func.isRequired,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onCheckInstagramBusinessClick: PropTypes.func.isRequired,
  onDropPost: PropTypes.func.isRequired,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  paused: PropTypes.bool,
  onUnpauseClick: PropTypes.func.isRequired,
  showCalendar: PropTypes.bool,
  isManager: PropTypes.bool.isRequired,
  isInstagramProfile: PropTypes.bool,
  isInstagramBusiness: PropTypes.bool,
  onSetUpDirectPostingClick: PropTypes.func.isRequired,
  showInstagramModal: PropTypes.bool,
  onDirectPostingClick: PropTypes.func.isRequired,
  onHideInstagramModal: PropTypes.func.isRequired,
  isBusinessOnInstagram: PropTypes.bool,
  hasInstagramFeatureFlip: PropTypes.bool,
  isInstagramLoading: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
  onClickUpgrade: PropTypes.func.isRequired,
  isBusinessAccount: PropTypes.bool.isRequired,
};

QueuedPosts.defaultProps = {
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  showComposer: false,
  total: 0,
  enabledApplicationModes: [],
  editMode: false,
  paused: false,
  showCalendar: false,
  subprofiles: [],
  isInstagramProfile: false,
  isInstagramBusiness: false,
  showInstagramModal: false,
  isBusinessOnInstagram: null,
  hasInstagramFeatureFlip: false,
  isInstagramLoading: false,
  isLockedProfile: false,
};

export default WithFeatureLoader(QueuedPosts);
