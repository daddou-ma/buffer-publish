import {
  List,
} from '@bufferapp/components';

import React from 'react';
import PropTypes from 'prop-types';
import ErrorBoundary from '@bufferapp/publish-error-boundary';

import PostList from '../PostList';

/* eslint-disable react/prop-types */

const postListStyle = {
  marginBottom: '2.5rem',
};

const renderPostList = ({
  index,
  postList,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onShareAgainClick,
  onMobileClick,
  isSent,
  isManager,
  isPastReminder,
}) =>
  <div style={postListStyle}>
    <ErrorBoundary>
      <PostList
        key={`postList-${index}`}
        listHeader={postList.listHeader}
        posts={postList.posts}
        onCancelConfirmClick={onCancelConfirmClick}
        onDeleteClick={onDeleteClick}
        onDeleteConfirmClick={onDeleteConfirmClick}
        onEditClick={onEditClick}
        onShareNowClick={onShareNowClick}
        onRequeueClick={onRequeueClick}
        onImageClick={onImageClick}
        onImageClickNext={onImageClickNext}
        onImageClickPrev={onImageClickPrev}
        onImageClose={onImageClose}
        onDropPost={onDropPost}
        onShareAgainClick={onShareAgainClick}
        onMobileClick={onMobileClick}
        isSent={isSent}
        isManager={isManager}
        isPastReminder={isPastReminder}
      />
    </ErrorBoundary>
  </div>;

/* eslint-enable react/prop-types */

const PostLists = ({
  postLists,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onShareAgainClick,
  onMobileClick,
  isSent,
  isManager,
  isPastReminder,
}) =>
  <List
    items={postLists.map((postList, index) =>
      renderPostList({
        index,
        postList,
        onCancelConfirmClick,
        onDeleteClick,
        onDeleteConfirmClick,
        onEditClick,
        onShareNowClick,
        onRequeueClick,
        onImageClick,
        onImageClickNext,
        onImageClickPrev,
        onImageClose,
        onDropPost,
        onShareAgainClick,
        onMobileClick,
        isSent,
        isManager,
        isPastReminder,
      }),
    )}
    fillContainer
  />;

PostLists.propTypes = {
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        }),
      ),
    }),
  ).isRequired,
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onRequeueClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onDropPost: PropTypes.func,
  onShareAgainClick: PropTypes.func,
  onMobileClick: PropTypes.func,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
};

PostLists.defaultProps = {
  postLists: [],
};

export default PostLists;
