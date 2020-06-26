import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { Button, Text } from '@bufferapp/ui';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '@bufferapp/components/style/animation';
import { Post, PostDragWrapper } from '@bufferapp/publish-shared-components';
import Header from '@bufferapp/publish-shared-components/QueueItems/Header';

import PostEmptySlot from '@bufferapp/publish-shared-components/PostEmptySlot/dropTarget';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import FailedPostComponent from '@bufferapp/publish-web/components/ErrorBoundary/failedPostComponent';

const ErrorBoundary = getErrorBoundary(true);

const ShowMorePostsWrapper = styled.div`
  text-align: center;
  margin: 24px 0px;
`;

const ViewCalendarWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const PostWrapper = styled.div`
  margin-bottom: 8px;
  max-height: 100vh;
  transition: all ${transitionAnimationTime} ${transitionAnimationType};

  ${props =>
    props.hidden &&
    css`
      max-height: 0;
      opacity: 0.5;
      pointer-events: none;
    `}
`;

/* eslint-disable react/prop-types */

const PostContent = ({
  post,
  index,
  subprofiles,
  onRequeueClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onDropPost,
  onSwapPosts,
  draggable,
  hasFirstCommentFlip,
  hasPushNotifications,
  onSetRemindersClick,
  onCampaignTagClick,
  hasCampaignsFeature,
}) => {
  const campaignId = post.campaignDetails ? post.campaignDetails.id : null;
  const postWithEventHandlers = {
    ...post,
    service_geolocation_name: post.locationName,
    source_url: post.sourceUrl,
    subprofile_id: post.subprofileID,
    service_user_tags: post.userTags,
    key: post.id,
    index,
    postDetails: post.postDetails,
    subprofiles,
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onRequeueClick: () => onRequeueClick({ post }),
    onCampaignTagClick: () => onCampaignTagClick(campaignId),
    onDropPost,
    onSwapPosts,
    hasFirstCommentFlip,
    hasPushNotifications,
    onSetRemindersClick,
    hasCampaignsFeature,
    shouldShowEditButton: post.retweet && !!post.retweetComment,
  };

  const PostComponent = Post;

  if (draggable) {
    return (
      <PostWrapper key={post.id} hidden={post.isDeleting}>
        <ErrorBoundary
          fallbackComponent={() => (
            <ErrorBoundary
              fallbackComponent={() => (
                <FailedPostComponent
                  key={post.id}
                  post={post}
                  postId={post.id}
                />
              )}
            >
              <PostDragWrapper
                id={post.id}
                index={index}
                postComponent={PostComponent}
                postProps={postWithEventHandlers}
                basic
              />
            </ErrorBoundary>
          )}
        >
          <PostDragWrapper
            id={post.id}
            index={index}
            postComponent={PostComponent}
            postProps={postWithEventHandlers}
          />
        </ErrorBoundary>
      </PostWrapper>
    );
  }

  return (
    <PostWrapper key={post.id} hidden={post.isDeleting}>
      <ErrorBoundary
        fallbackComponent={() => (
          <ErrorBoundary
            fallbackComponent={() => (
              <FailedPostComponent key={post.id} post={post} postId={post.id} />
            )}
          >
            <PostComponent {...postWithEventHandlers} basic />
          </ErrorBoundary>
        )}
      >
        <PostComponent {...postWithEventHandlers} />
      </ErrorBoundary>
    </PostWrapper>
  );
};

const isPaidUser = ({ features, isBusinessAccount }) =>
  !features.isFreeUser() || isBusinessAccount;

const EmptySlot = ({ item, onEmptySlotClick }) => {
  const { id, slot, profileService } = item;

  return (
    <PostEmptySlot
      key={id}
      time={slot.label}
      timestamp={slot.timestamp}
      day={slot.dayText}
      service={profileService}
      onClick={() =>
        onEmptySlotClick({
          dueTime: slot.label,
          profile_service: profileService,
          scheduled_at: slot.timestamp,
          due_at: slot.timestamp,
          pinned: true,
        })
      }
    />
  );
};

const ShowMorePosts = ({ onCalendarClick }) => (
  <ShowMorePostsWrapper>
    <Text type="p">Looking for your other posts?</Text>
    <ViewCalendarWrapper>
      <Button
        type="primary"
        label="View Your Calendar"
        onClick={() => onCalendarClick('month')}
      />
    </ViewCalendarWrapper>
  </ShowMorePostsWrapper>
);

/* eslint-enable react/prop-types */

const QueueItems = props => {
  const {
    items,
    onEmptySlotClick,
    onCalendarClick,
    features,
    isBusinessAccount,
    shouldRenderCalendarButtons,
    ...propsForPosts
  } = props;
  const itemList = items.map((item, index) => {
    const { queueItemType, ...rest } = item;
    const isUserPaid = isPaidUser({ features, isBusinessAccount });

    if (queueItemType === 'post') {
      return (
        <PostContent
          key={item.id}
          post={rest}
          index={index}
          {...propsForPosts}
        />
      );
    }

    if (queueItemType === 'header') {
      return (
        <Header
          key={item.id}
          item={rest}
          isFirstItem={index === 0}
          onCalendarClick={onCalendarClick}
          shouldRenderCalendarButtons={
            shouldRenderCalendarButtons && isUserPaid
          }
        />
      );
    }

    if (queueItemType === 'slot') {
      return (
        <EmptySlot
          key={item.id}
          item={rest}
          onEmptySlotClick={onEmptySlotClick}
        />
      );
    }

    if (queueItemType === 'showMorePosts' && isUserPaid) {
      return <ShowMorePosts key={item.id} onCalendarClick={onCalendarClick} />;
    }

    return null;
  });

  return <>{itemList}</>;
};

QueueItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      queueItemType: PropTypes.string.isRequired,
    })
  ),
  subprofiles: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    })
  ),
  features: PropTypes.shape({
    isFreeUser: PropTypes.func,
  }).isRequired,
  onCalendarClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onEmptySlotClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onRequeueClick: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPosts: PropTypes.func,
  isBusinessAccount: PropTypes.bool,
  draggable: PropTypes.bool,
  shouldRenderCalendarButtons: PropTypes.bool,
};

QueueItems.defaultProps = {
  items: [],
  subprofiles: [],
  draggable: false,
  isBusinessAccount: false,
  shouldRenderCalendarButtons: false,
  onCalendarClick: () => {},
  onDeleteConfirmClick: () => {},
  onEditClick: () => {},
  onEmptySlotClick: () => {},
  onShareNowClick: () => {},
  onRequeueClick: () => {},
  onDropPost: () => {},
  onSwapPosts: () => {},
};

export default WithFeatureLoader(QueueItems);
