import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  GridList,
  EmptyState,
  BufferLoading,
} from '@bufferapp/publish-shared-components';
import { Divider, Text } from '@bufferapp/components';
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

const GridPosts = ({
  header,
  total,
  loading,
  mergedPosts,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onChangePostUrl,
  isManager,
  isLockedProfile,
  isBusinessAccount,
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
          subtitle="Once a post has gone live via Buffer,
          you can track its performance here to learn what works best with your audience!"
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
      <GridList
        mergedPosts={mergedPosts}
        onChangePostUrl={onChangePostUrl}
      />
    </div>
  );
};

GridPosts.propTypes = {
  loading: PropTypes.bool,
  header: PropTypes.string,
  moreToLoad: PropTypes.bool, // eslint-disable-line
  page: PropTypes.number, // eslint-disable-line
  mergedPosts: PropTypes.arrayOf(
    PropTypes.shape({
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ),
  total: PropTypes.number,
  onChangePostUrl: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  isManager: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  isLockedProfile: PropTypes.bool,
};

GridPosts.defaultProps = {
  header: null,
  loading: true,
  moreToLoad: false,
  page: 1,
  total: 0,
  mergedPosts: [],
  isManager: true,
  isBusinessAccount: false,
  isLockedProfile: false,
  onChangePostUrl: () => {},
  onImageClick: () => {},
  onImageClickNext: () => {},
  onImageClickPrev: () => {},
  onImageClose: () => {},
};

export default GridPosts;
