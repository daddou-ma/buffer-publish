import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '@bufferapp/components/style/animation';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';
import { PostEmptySlot } from '@bufferapp/publish-shared-components';

import Draft from '../Draft';
import Story from '../Story';
import Post from '../Post';
import PostDragWrapper from '../PostDragWrapper';
import QueueHeader from '../QueueHeader';

const ErrorBoundary = getErrorBoundary(true);

const PostWrapper = styled.div`
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
  hasFirstCommentFlip,
  onPreviewClick,
  serviceId,
  userData,
}) => {
  const postWithEventHandlers = {
    ...post,
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
    onPreviewClick,
    onDropPost,
    onSwapPosts,
    hasFirstCommentFlip,
    serviceId,
    userData,
  };
  const PostComponent = post.type === 'storyGroup' ? Story : Post;

  if (draggable) {
    return (
      <PostWrapper key={post.id} hidden={post.isDeleting} isStory={isStory}>
        <PostDragWrapper
          id={post.id}
          index={index}
          postComponent={PostComponent}
          postProps={postWithEventHandlers}
          basic={basic}
        />
      </PostWrapper>
    );
  }

  return (
    <PostWrapper key={post.id} hidden={post.isDeleting} isStory={isStory}>
      <PostComponent {...postWithEventHandlers} basic={basic} />
    </PostWrapper>
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
  hasFirstCommentFlip,
}) => {
  const draftWithEventHandlers = {
    ...draft,
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
    hasFirstCommentFlip,
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

/* eslint-enable react/prop-types */

const QueueItems = props => {
  const { items, type, onEmptySlotClick, ...propsForPosts } = props;
  const itemList = items.map((item, index) => {
    const { queueItemType, slot, ...rest } = item;
    if (queueItemType === 'post') {
      switch (type) {
        case 'drafts':
          return <DraftContent draft={rest} {...propsForPosts} />;
        case 'stories':
          return (
            <PostContent post={rest} index={index} isStory {...propsForPosts} />
          );
        default:
          return <PostContent post={rest} index={index} {...propsForPosts} />;
      }
    }
    if (queueItemType === 'header') {
      return (
        <QueueHeader
          text={item.text}
          id={item.id}
          dayOfWeek={item.dayOfWeek}
          date={item.date}
        />
      );
    }
    if (type === 'stories' && queueItemType === 'slot') {
      return (
        <PostEmptySlot
          key={item.id}
          time="Add to Story"
          service="isStoryGroup"
          onClick={() =>
            onEmptySlotClick({
              dueTime: slot.label,
              profile_service: item.profileService,
              scheduledAt: slot.timestamp,
              due_at: slot.timestamp,
            })
          }
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
      type: PropTypes.string,
    })
  ),
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

export default QueueItems;
