import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  PostLists,
  EmptyState,
  LockedProfileNotification,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import { Divider, Text } from '@bufferapp/components';
import ComposerPopover from '@bufferapp/publish-composer-popover';
import { WithFeatureLoader } from '@bufferapp/product-features';
import BusinessUpgradeBanner from '../BusinessUpgradeBanner';

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
  onClickUpgrade,
  features,
  canStartBusinessTrial,
}) => {
  if (loading) {
    return (
      <div style={loadingContainerStyle}>
        <BufferLoading size={64} />
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

  if (total < 1) {
    return (
      <Fragment>
        <BusinessUpgradeBanner canStartBusinessTrial={canStartBusinessTrial} />
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
      <BusinessUpgradeBanner canStartBusinessTrial={canStartBusinessTrial} />
      <div style={headerStyle}>
        <Text color={'black'}>{header}</Text>
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
        isSent
      />
    </div>
  );
};

SentPosts.propTypes = {
  features: PropTypes.object.isRequired, // eslint-disable-line
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
  isLockedProfile: PropTypes.bool,
  onClickUpgrade: PropTypes.func.isRequired,
  canStartBusinessTrial: PropTypes.bool.isRequired,
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
  isLockedProfile: false,
  onEditClick: () => {},
  onShareAgainClick: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
};

export default WithFeatureLoader(SentPosts);
