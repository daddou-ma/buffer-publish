import React from 'react';
import PropTypes from 'prop-types';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import FailedPostComponent from '@bufferapp/publish-web/components/ErrorBoundary/failedPostComponent';

import Post from '../../Post';
import Story from '../../Story';
import Draft from '../../Draft';
import PostDragWrapper from '../../PostDragWrapper';
import PostActionButtons from '../../PostActionButtons';
import BannerAdvancedAnalytics from '../../BannerAdvancedAnalytics';
import { PostWrapper } from '../styles';

const ErrorBoundary = getErrorBoundary(true);

const postClassName = item => {
  if (!item) return '';

  return [
    'update',
    `post_${item.profile_service}`,
    item.postDetails?.isRetweet ? 'is_retweet' : 'not_retweet',
  ].join(' ');
};

const getPostComponent = ({ queueType, postType }) => {
  if (postType === 'storyGroup') return Story;
  if (queueType === 'drafts') return Draft;

  return Post;
};

/* eslint-disable react/prop-types */

const getDraftProps = ({ draft, postProps }) => {
  return {
    draftDetails: draft.draftDetails,
    profileService: draft.profile_service,
    geolocationName: draft.service_geolocation_name,
    onDeleteConfirmClick: () => postProps.onDeleteConfirmClick({ draft }),
    onEditClick: () => postProps.onEditClick({ draft }),
    onApproveClick: () => postProps.onApproveClick({ draft }),
    onMoveToDraftsClick: () => postProps.onMoveToDraftsClick({ draft }),
    onRequestApprovalClick: () => postProps.onRequestApprovalClick({ draft }),
    onRescheduleClick: () => postProps.onRescheduleClick({ draft }),
  };
};

const getPostProps = ({ post, postProps }) => {
  const campaignId = post.campaignDetails?.id ?? null;

  return {
    postDetails: post.postDetails,
    service_geolocation_name: post.locationName,
    source_url: post.sourceUrl,
    subprofile_id: post.subprofileID,
    service_user_tags: post.userTags,
    shouldShowEditButton: post.retweet && !!post.retweetComment,
    onDeleteConfirmClick: () => postProps.onDeleteConfirmClick({ post }),
    onEditClick: () => postProps.onEditClick({ post }),
    onShareNowClick: () => postProps.onShareNowClick({ post }),
    onRequeueClick: () => postProps.onRequeueClick({ post }),
    onCampaignTagClick: () => postProps.onCampaignTagClick(campaignId),
    onSetRemindersClick: ({ type }) =>
      postProps.onSetRemindersClick({ type, post }),
  };
};

const DraggablePost = ({
  index,
  post,
  postComponent: PostComponent,
  postProps,
}) => {
  return (
    <ErrorBoundary
      fallbackComponent={() => (
        <ErrorBoundary
          fallbackComponent={() => (
            <FailedPostComponent key={post.id} post={post} postId={post.id} />
          )}
        >
          <PostDragWrapper
            id={post.id}
            index={index}
            postComponent={PostComponent}
            postProps={postProps}
            basic
          />
        </ErrorBoundary>
      )}
    >
      <PostDragWrapper
        id={post.id}
        index={index}
        postComponent={PostComponent}
        postProps={postProps}
      />
    </ErrorBoundary>
  );
};

const NonDraggablePost = ({
  post,
  postComponent: PostComponent,
  postProps,
}) => (
  <ErrorBoundary
    fallbackComponent={() => (
      <ErrorBoundary
        fallbackComponent={() => (
          <FailedPostComponent key={post.id} post={post} postId={post.id} />
        )}
      >
        <PostComponent {...postProps} basic />
      </ErrorBoundary>
    )}
  >
    <PostComponent {...postProps} />
  </ErrorBoundary>
);

const Content = ({
  post,
  queueType,
  postComponent: PostComponent,
  postProps,
}) => {
  const itemProps =
    queueType === 'drafts'
      ? getDraftProps({ draft: post, postProps })
      : getPostProps({ post, postProps });

  const postWithEventHandlers = {
    key: post.id,
    ...post,
    ...postProps,
    ...itemProps,
  };

  const { index, basic, draggable } = postProps;

  if (draggable) {
    return (
      <DraggablePost
        index={index}
        post={post}
        postComponent={PostComponent}
        postProps={postWithEventHandlers}
        basic={basic}
      />
    );
  }

  return (
    <NonDraggablePost
      post={post}
      postComponent={PostComponent}
      postProps={postWithEventHandlers}
    />
  );
};

/* eslint-enable react/prop-types */

const PostContent = ({
  post,
  queueType = 'post',
  isAnalyzeCustomer,
  onMobileClick,
  onShareAgainClick,
  showShareAgainButton,
  showSendToMobile,
  shouldShowAnalyzeBanner,
  ...postProps
}) => {
  const { isSent, isPastReminder, isManager, isUserPaid } = postProps;
  const isPastPost = isSent || isPastReminder;
  const shouldShowShareAgain = showShareAgainButton && isPastPost && isUserPaid;
  const shouldShowSendToMobile =
    showSendToMobile && isPastReminder && isManager;

  const PostComponent = getPostComponent({ queueType, postType: post.type });

  return (
    <>
      <PostWrapper
        id={`update-${post.id}`}
        className={postClassName(post)}
        shouldShowAnalyzeBanner={shouldShowAnalyzeBanner}
        hidden={post.isDeleting}
      >
        <Content
          post={post}
          queueType={queueType}
          postComponent={PostComponent}
          postProps={postProps}
        />
        <PostActionButtons
          shouldShowShareAgainButton={shouldShowShareAgain}
          shouldShowSendToMobileButton={shouldShowSendToMobile}
          onShareAgainClick={() => {
            onShareAgainClick({ post });
          }}
          onMobileClick={() => {
            onMobileClick({ post });
          }}
        />
      </PostWrapper>
      {shouldShowAnalyzeBanner && (
        <BannerAdvancedAnalytics isAnalyzeCustomer={isAnalyzeCustomer} />
      )}
    </>
  );
};

PostContent.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    isDeleting: PropTypes.bool,
  }).isRequired,
  queueType: PropTypes.string,
  isAnalyzeCustomer: PropTypes.bool,
  showShareAgainButton: PropTypes.bool,
  showSendToMobile: PropTypes.bool,
  shouldShowAnalyzeBanner: PropTypes.bool,
  draggable: PropTypes.bool,
  onMobileClick: PropTypes.bool,
  onShareAgainClick: PropTypes.bool,
  onDeleteConfirmClick: PropTypes.bool,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onRequeueClick: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPosts: PropTypes.func,
};

PostContent.defaultProps = {
  draggable: false,
  isAnalyzeCustomer: false,
  showShareAgainButton: false,
  showSendToMobile: false,
  shouldShowAnalyzeBanner: false,
  queueType: 'post',
  onMobileClick: () => {},
  onShareAgainClick: () => {},
  onDeleteConfirmClick: () => {},
  onEditClick: () => {},
  onShareNowClick: () => {},
  onRequeueClick: () => {},
  onDropPost: () => {},
  onSwapPosts: () => {},
};

export default PostContent;
