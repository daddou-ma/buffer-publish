import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  PostLists,
  EmptyState,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import { Divider, Text } from '@bufferapp/components';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import LockedProfileNotification from '@bufferapp/publish-locked-profile-notification';

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

const SentPosts = ({
  header,
  total,
  loading,
  postLists,
  onEditClick,
  onShareAgainClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onComposerCreateSuccess,
  showComposer,
  editMode,
  isManager,
  isLockedProfile,
  canStartBusinessTrial,
  isBusinessAccount,
  hasFirstCommentFlip,
}) => {
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

  if (total < 1) {
    return (
      <Fragment>
        <EmptyState
          title="You haven’t published any posts with this account in the past 30 days!"
          subtitle="Once a post has gone live via Buffer, you can track its performance here to learn what works best with your audience!"
          heroImg="https://s3.amazonaws.com/buffer-publish/images/empty-sent2x.png"
          heroImgSize={{ width: '270px', height: '150px' }}
        />
      </Fragment>
    );
  }

  return (
    <div>
      <div style={headerStyle}>
        <div className="js-page-header">
          <Text color={'black'}>{header}</Text>
        </div>
        <Divider />
      </div>
      <div style={topBarContainerStyle}>
        {showComposer && !editMode && (
          <div style={composerStyle}>
            <ComposerPopover onSave={onComposerCreateSuccess} type={'sent'} />
          </div>
        )}
      </div>
      {showComposer && editMode && (
        <ComposerPopover onSave={onComposerCreateSuccess} type={'sent'} />
      )}
      <PostLists
        postLists={postLists}
        onEditClick={onEditClick}
        onShareAgainClick={onShareAgainClick}
        onImageClick={onImageClick}
        onImageClickNext={onImageClickNext}
        onImageClickPrev={onImageClickPrev}
        onImageClose={onImageClose}
        isManager={isManager}
        isBusinessAccount={isBusinessAccount}
        isSent
        hasFirstCommentFlip={hasFirstCommentFlip}
      />
    </div>
  );
};

SentPosts.propTypes = {
  header: PropTypes.string,
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
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
  canStartBusinessTrial: PropTypes.bool.isRequired,
  hasFirstCommentFlip: PropTypes.bool,
};

SentPosts.defaultProps = {
  header: null,
  loading: true,
  moreToLoad: false,
  page: 1,
  postLists: [],
  total: 0,
  showComposer: false,
  editMode: false,
  isManager: true,
  isBusinessAccount: false,
  hasFirstCommentFlip: false,
  isLockedProfile: false,
  onEditClick: () => {},
  onShareAgainClick: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
};

export default SentPosts;
