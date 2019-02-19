import React from 'react';
import PropTypes from 'prop-types';
import {
  PostLists,
  EmptyState,
  LockedProfileNotification,
} from '@bufferapp/publish-shared-components';
import {
  Divider,
  Text,
  LoadingAnimation,
} from '@bufferapp/components';
import ComposerPopover from '@bufferapp/publish-composer-popover';

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
  marginBottom: '1.5rem',
  flexGrow: '1',
};

const PastRemindersPosts = ({
  header,
  subHeader,
  total,
  loading,
  postLists,
  onEditClick,
  onShareAgainClick,
  onMobileClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onComposerCreateSuccess,
  showComposer,
  editMode,
  isManager,
  isLockedProfile,
  onClickUpgradeToPro,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <LoadingAnimation />
      </div>
    );
  }

  if (isLockedProfile) {
    return (
      <LockedProfileNotification onClickUpgradeToPro={onClickUpgradeToPro} />
    );
  }

  if (total < 1) {
    return (
      <EmptyState
        title="You haven’t published any posts with this account in the past 30 days!"
        subtitle="Once a post has gone live via Buffer, you can track its performance here to learn what works best with your audience!"
        heroImg="https://s3.amazonaws.com/buffer-publish/images/empty-sent2x.png"
        heroImgSize={{ width: '270px', height: '150px' }}
      />
    );
  }
  return (
    <div>
      <div style={headerStyle}>
        <Text color={'black'}>{header}</Text>
        <div>
          <Text color={'black'}>{subHeader}</Text>
        </div>
        <Divider />
      </div>
      <div style={topBarContainerStyle}>
        <div style={composerStyle}>
          {showComposer && !editMode &&
            <ComposerPopover
              onSave={onComposerCreateSuccess}
              type={'pastReminders'}
            />
          }
        </div>
      </div>
      {showComposer && editMode &&
        <ComposerPopover
          onSave={onComposerCreateSuccess}
          type={'pastReminders'}
        />
      }
      <PostLists
        postLists={postLists}
        onEditClick={onEditClick}
        onShareAgainClick={onShareAgainClick}
        onMobileClick={onMobileClick}
        onImageClick={onImageClick}
        onImageClickNext={onImageClickNext}
        onImageClickPrev={onImageClickPrev}
        onImageClose={onImageClose}
        isManager={isManager}
        isSent={false}
        isPastReminder
      />
    </div>
  );
};

PastRemindersPosts.propTypes = {
  header: PropTypes.string,
  subHeader: PropTypes.string,
  loading: PropTypes.bool,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ),
  total: PropTypes.number,
  showComposer: PropTypes.bool,
  editMode: PropTypes.bool,
  onComposerCreateSuccess: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  onShareAgainClick: PropTypes.func,
  onMobileClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  isManager: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
  onClickUpgradeToPro: PropTypes.func.isRequired,
};

PastRemindersPosts.defaultProps = {
  header: null,
  subHeader: null,
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  total: 0,
  showComposer: false,
  editMode: false,
  isManager: true,
  isLockedProfile: false,
  onEditClick: () => {},
  onShareAgainClick: () => {},
  onMobileClick: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
};

export default PastRemindersPosts;
