import { List } from '@bufferapp/components';

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
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onCampaignTagClick,
  onDropPost,
  onSwapPosts,
  onShareAgainClick,
  onMobileClick,
  isSent,
  isManager,
  isPastReminder,
  isBusinessAccount,
  hasFirstCommentFlip,
  hasCampaignsFeature,
  userData,
  onPreviewClick,
  showAnalyzeBannerAfterFirstPost,
  isAnalyzeCustomer,
}) => (
  <div style={postListStyle}>
    <PostList
      index={index}
      key={`postList-${index}`}
      listHeader={postList.listHeader}
      posts={postList.posts}
      onDeleteConfirmClick={onDeleteConfirmClick}
      onEditClick={onEditClick}
      onShareNowClick={onShareNowClick}
      onRequeueClick={onRequeueClick}
      onImageClick={onImageClick}
      onImageClickNext={onImageClickNext}
      onImageClickPrev={onImageClickPrev}
      onImageClose={onImageClose}
      onCampaignTagClick={onCampaignTagClick}
      onDropPost={onDropPost}
      onSwapPosts={onSwapPosts}
      onShareAgainClick={onShareAgainClick}
      onMobileClick={onMobileClick}
      isSent={isSent}
      isManager={isManager}
      isPastReminder={isPastReminder}
      isBusinessAccount={isBusinessAccount}
      hasFirstCommentFlip={hasFirstCommentFlip}
      hasCampaignsFeature={hasCampaignsFeature}
      userData={userData}
      onPreviewClick={onPreviewClick}
      showAnalyzeBannerAfterFirstPost={showAnalyzeBannerAfterFirstPost}
      isAnalyzeCustomer={isAnalyzeCustomer}
    />
  </div>
);

/* eslint-enable react/prop-types */

const PostLists = ({
  postLists,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onRequeueClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onCampaignTagClick,
  onDropPost,
  onSwapPosts,
  onShareAgainClick,
  onMobileClick,
  isSent,
  isManager,
  isPastReminder,
  isBusinessAccount,
  hasFirstCommentFlip,
  hasCampaignsFeature,
  userData,
  onPreviewClick,
  showAnalyzeBannerAfterFirstPost,
  isAnalyzeCustomer,
}) => (
  <List
    items={postLists.map((postList, index) =>
      renderPostList({
        index,
        postList,
        onDeleteConfirmClick,
        onEditClick,
        onShareNowClick,
        onRequeueClick,
        onImageClick,
        onImageClickNext,
        onImageClickPrev,
        onImageClose,
        onCampaignTagClick,
        onDropPost,
        onSwapPosts,
        onShareAgainClick,
        onMobileClick,
        isSent,
        isManager,
        isPastReminder,
        isBusinessAccount,
        hasFirstCommentFlip,
        hasCampaignsFeature,
        userData,
        onPreviewClick,
        showAnalyzeBannerAfterFirstPost,
        isAnalyzeCustomer,
      })
    )}
    fillContainer
  />
);

PostLists.propTypes = {
  postLists: PropTypes.arrayOf(
    PropTypes.shape({
      listHeader: PropTypes.string,
      posts: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onRequeueClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onCampaignTagClick: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPosts: PropTypes.func,
  onShareAgainClick: PropTypes.func,
  onMobileClick: PropTypes.func,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  hasCampaignsFeature: PropTypes.bool,
  showAnalyzeBannerAfterFirstPost: PropTypes.bool,
  isAnalyzeCustomer: PropTypes.bool,
};

PostLists.defaultProps = {
  showAnalyzeBannerAfterFirstPost: false,
  isAnalyzeCustomer: false,
};

export default PostLists;
