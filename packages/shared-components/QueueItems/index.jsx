import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '@bufferapp/components/style/animation';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import { PostEmptySlot } from '@bufferapp/publish-shared-components';

import Post from '../Post';
import Draft from '../Draft';
import Story from '../Story';
import PostDragWrapper from '../PostDragWrapper';
import QueueHeader from '../QueueHeader';
import PostActionButtons from '../PostActionButtons';
import BannerAdvancedAnalytics from '../BannerAdvancedAnalytics';

const ErrorBoundary = getErrorBoundary(true);

const PostWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${props => (props.isStory ? '8px' : '2rem')};
  max-height: 100vh;
  transition: all ${transitionAnimationTime} ${transitionAnimationType};

  ${props =>
    props.hidden &&
    css`
      max-height: 0;
      opacity: 0;
    `}
`;

const postClassName = item => {
  if (!item) return '';

  return [
    'update',
    `post_${item.profile_service}`,
    item.postDetails?.isRetweet ? 'is_retweet' : 'not_retweet',
  ].join(' ');
};

const isPaidUser = ({ features, isBusinessAccount }) =>
  !features.isFreeUser() || isBusinessAccount;

/* eslint-disable react/prop-types */

const PostContent = ({
  post,
  index,
  isStory,
  onRequeueClick,
  onDeleteConfirmClick,
  onSetRemindersClick,
  onEditClick,
  onShareNowClick,
  onDropPost,
  onSwapPosts,
  draggable,
  basic,
  onPreviewClick,
  features,
  onCampaignTagClick,
  isBusinessAccount,
  isSent,
  isPastReminder,
  isManager,
  isAnalyzeCustomer,
  onMobileClick,
  onShareAgainClick,
  showAnalyzeBannerAfterFirstPost,
  showSendToMobile,
  showShareAgainButton,
  ...postProps
}) => {
  const campaignId = post.campaignDetails?.id ?? null;
  const postWithEventHandlers = {
    ...post,
    ...postProps,
    service_geolocation_name: post.locationName,
    source_url: post.sourceUrl,
    subprofile_id: post.subprofileID,
    service_user_tags: post.userTags,
    key: post.id,
    index,
    postDetails: post.postDetails,
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onSetRemindersClick: ({ type }) => onSetRemindersClick({ type, post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onRequeueClick: () => onRequeueClick({ post }),
    onCampaignTagClick: () => onCampaignTagClick(campaignId),
    onPreviewClick,
    onDropPost,
    onSwapPosts,
    isBusinessAccount,
    isSent,
    isPastReminder,
  };

  const shouldShowAnalyzeBanner =
    showAnalyzeBannerAfterFirstPost && index === 1;
  const isPastPost = isSent || isPastReminder;
  const isUserPaid = isPaidUser({ features, isBusinessAccount });
  const shouldShowShareAgain = showShareAgainButton && isPastPost && isUserPaid;
  const shouldShowSendToMobile =
    showSendToMobile && isPastReminder && isManager;

  const PostComponent = post.type === 'storyGroup' ? Story : Post;

  const Content = draggable ? (
    <PostDragWrapper
      id={post.id}
      index={index}
      postComponent={PostComponent}
      postProps={postWithEventHandlers}
      basic={basic}
    />
  ) : (
    <PostComponent {...postWithEventHandlers} basic={basic} />
  );

  return (
    <>
      <PostWrapper
        key={post.id}
        id={`update-${post.id}`}
        className={postClassName(post)}
        shouldShowAnalyzeBanner={shouldShowAnalyzeBanner}
        hidden={post.isDeleting}
        isStory={isStory}
      >
        {Content}
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

const DraftContent = ({
  draft,
  onApproveClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  ...postProps
}) => {
  const draftWithEventHandlers = {
    ...draft,
    ...postProps,
    profileService: draft.profile_service,
    geolocationName: draft.service_geolocation_name,
    key: draft.id,
    draftDetails: draft.draftDetails,
    onDeleteConfirmClick: () => onDeleteConfirmClick({ draft }),
    onEditClick: () => onEditClick({ draft }),
    onApproveClick: () => onApproveClick({ draft }),
    onMoveToDraftsClick: () => onMoveToDraftsClick({ draft }),
    onRequestApprovalClick: () => onRequestApprovalClick({ draft }),
    onRescheduleClick: () => onRescheduleClick({ draft }),
  };

  const DraftComponent = draft.type === 'storyGroup' ? Story : Draft;

  return (
    <PostWrapper key={draft.id} hidden={draft.isDeleting}>
      <ErrorBoundary
        fallbackComponent={() => (
          <DraftComponent {...draftWithEventHandlers} basic />
        )}
      >
        <DraftComponent {...draftWithEventHandlers} />
      </ErrorBoundary>
    </PostWrapper>
  );
};

const EmptySlot = ({
  item,
  pinned,
  customLabel,
  customHoverMessage,
  onEmptySlotClick,
}) => {
  const { slot } = item;
  const time = customLabel || slot.label;

  return (
    <PostEmptySlot
      key={item.id}
      time={time}
      service={item.profileService}
      customHoverMessage={customHoverMessage}
      onClick={() =>
        onEmptySlotClick({
          dueTime: slot.label,
          profile_service: item.profileService,
          scheduledAt: slot.timestamp,
          due_at: slot.timestamp,
          pinned,
        })
      }
    />
  );
};

/* eslint-enable react/prop-types */

const QueueItems = props => {
  const { items, type, onEmptySlotClick, ...propsForPosts } = props;

  const itemList = items.map((item, index) => {
    const { queueItemType, slot, ...rest } = item;

    if (queueItemType === 'post') {
      if (type === 'drafts') {
        return <DraftContent draft={rest} {...propsForPosts} />;
      }

      return (
        <PostContent
          key={item.id}
          index={index}
          post={rest}
          isStory={type === 'stories'}
          {...propsForPosts}
        />
      );
    }

    if (queueItemType === 'header') {
      return (
        <QueueHeader
          key={item.id}
          id={item.id}
          text={item.text}
          dayOfWeek={item.dayOfWeek}
          date={item.date}
        />
      );
    }
    if (queueItemType === 'slot') {
      const isStories = type === 'stories';

      return (
        <EmptySlot
          key={item.id}
          item={item}
          type={type}
          pinned={!isStories}
          customLabel={isStories && 'Add to Story'}
          customHoverMessage={isStories && 'Schedule a Story'}
          onEmptySlotClick={onEmptySlotClick}
        />
      );
    }

    return null;
  });

  return <>{itemList}</>;
};

QueueItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      date: PropTypes.string,
      queueItemType: PropTypes.string,
      dayOfWeek: PropTypes.string,
      hasCommentEnabled: PropTypes.bool,
    })
  ),
  features: PropTypes.shape({
    isFreeUser: () => {},
  }).isRequired,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onRequeueClick: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPosts: PropTypes.func,
  draggable: PropTypes.bool,
  type: PropTypes.string,
  onEmptySlotClick: PropTypes.func,
};

QueueItems.defaultProps = {
  items: [],
  draggable: false,
  type: 'post',
  onEmptySlotClick: () => {},
  onDeleteConfirmClick: () => {},
  onEditClick: () => {},
  onShareNowClick: () => {},
  onRequeueClick: () => {},
  onDropPost: () => {},
  onSwapPosts: () => {},
};

export default WithFeatureLoader(QueueItems);
