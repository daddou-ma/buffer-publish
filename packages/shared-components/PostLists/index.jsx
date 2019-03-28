import {
  List,
} from '@bufferapp/components';

import React from 'react';
import PropTypes from 'prop-types';

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
  isBusinessAccount,
  hasFirstCommentFlip,
}) =>
  <div style={postListStyle}>
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
      isBusinessAccount={isBusinessAccount}
      hasFirstCommentFlip={hasFirstCommentFlip}
    />
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
  isBusinessAccount,
  hasFirstCommentFlip,
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
        isBusinessAccount,
        hasFirstCommentFlip,
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
  isBusinessAccount: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
};

PostLists.defaultProps = {
  postLists: [],
};

export default PostLists;
