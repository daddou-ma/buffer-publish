import React from 'react';
import PropTypes from 'prop-types';

import {
  Input,
  Button,
} from '@bufferapp/components';
import {
  EmptyState,
  PostDragLayer,
  BufferLoading,
  LockedProfileNotification,
} from '@bufferapp/publish-shared-components';

import ComposerPopover from '@bufferapp/publish-composer-popover';
import FeatureLoader from '@bufferapp/product-features';
import InstagramDirectPostingBanner from '../InstagramDirectPostingBanner';
import InstagramDirectPostingModal from '../InstagramDirectPostingModal';
import QueueItems from '../QueueItems';
import QueuePausedBar from '../QueuePausedBar';
import MiniCalendar from '../MiniCalendar';

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

const buttonStyle = {
  height: '37px',
  marginLeft: '1.5rem',
  minWidth: '150px',
  alignItems: 'center',
  display: 'flex',
};

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
  onCalendarToggleClick,
  numberOfPostsByDate,
  onMiniCalendarMonthChange,
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
  onClickUpgradeToPro,
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
    return (
      <LockedProfileNotification onClickUpgradeToPro={onClickUpgradeToPro} />
    );
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
          <Input
            placeholder={'What would you like to share?'}
            onFocus={onComposerPlaceholderClick}
          />
        </div>
        <FeatureLoader
          supportedFeatures={'mini_calendar'}
        >
          <div style={buttonStyle}>
            <Button
              secondary
              onClick={onCalendarToggleClick}
            >
              {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
            </Button>
          </div>

          {showCalendar &&
            <MiniCalendar
              numberOfPostsByDate={numberOfPostsByDate}
              onMonthChange={onMiniCalendarMonthChange}
            />
          }
        </FeatureLoader>

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
      {!!paused && <QueuePausedBar handleClickUnpause={onUnpauseClick} />}
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
  onCalendarToggleClick: PropTypes.func.isRequired,
  onMiniCalendarMonthChange: PropTypes.func.isRequired,
  numberOfPostsByDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
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
  onClickUpgradeToPro: PropTypes.func.isRequired,
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
  numberOfPostsByDate: null,
  subprofiles: [],
  isInstagramProfile: false,
  isInstagramBusiness: false,
  showInstagramModal: false,
  isBusinessOnInstagram: null,
  hasInstagramFeatureFlip: false,
  isInstagramLoading: false,
  isLockedProfile: false,
};

export default QueuedPosts;
