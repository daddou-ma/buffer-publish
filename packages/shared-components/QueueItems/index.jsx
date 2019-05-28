import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
} from '@bufferapp/components';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import {
  transitionAnimationTime,
  transitionAnimationType,
} from '@bufferapp/components/style/animation';
import getErrorBoundary from '@bufferapp/publish-web/components/ErrorBoundary';

import TextPost from '../TextPost';
import ImagePost from '../ImagePost';
import MultipleImagesPost from '../MultipleImagesPost';
import LinkPost from '../LinkPost';
import VideoPost from '../VideoPost';
import PostDragWrapper from '../PostDragWrapper';
import TextDraft from '../TextDraft';
import ImageDraft from '../ImageDraft';
import MultipleImagesDraft from '../MultipleImagesDraft';
import LinkDraft from '../LinkDraft';
import VideoDraft from '../VideoDraft';

const ErrorBoundary = getErrorBoundary(true);
const listHeaderStyle = {
  marginBottom: '1rem',
  marginTop: '1rem',
  marginLeft: '0.5rem',
};

const postTypeComponentMap = new Map([
  ['text', TextPost],
  ['image', ImagePost],
  ['multipleImage', MultipleImagesPost],
  ['link', LinkPost],
  ['video', VideoPost],
]);

const draftTypeComponentMap = new Map([
  ['text', TextDraft],
  ['image', ImageDraft],
  ['multipleImage', MultipleImagesDraft],
  ['link', LinkDraft],
  ['video', VideoDraft],
]);

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  index,
  onCancelConfirmClick,
  onRequeueClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onSwapPosts,
  draggable,
  basic,
  hasFirstCommentFlip,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    index,
    postDetails: post.postDetails,
    onCancelConfirmClick: () => onCancelConfirmClick({ post }),
    onDeleteClick: () => onDeleteClick({ post }),
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onImageClick: () => onImageClick({ post }),
    onImageClickNext: () => onImageClickNext({ post }),
    onImageClickPrev: () => onImageClickPrev({ post }),
    onImageClose: () => onImageClose({ post }),
    onRequeueClick: () => onRequeueClick({ post }),
    onDropPost,
    onSwapPosts,
    hasFirstCommentFlip,
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  const defaultStyle = {
    default: {
      marginBottom: '2rem',
      maxHeight: '100vh',
      transition: `all ${transitionAnimationTime} ${transitionAnimationType}`,
    },
    hidden: {
      maxHeight: 0,
      opacity: 0,
    },
  };

  const hiddenStyle = {
    hidden: post.isDeleting,
  };

  if (draggable) {
    return (
      <div
        style={calculateStyles(defaultStyle, hiddenStyle)}
        key={post.id}
      >
        <PostDragWrapper
          id={post.id}
          index={index}
          postComponent={PostComponent}
          postProps={postWithEventHandlers}
          basic={basic}
        />
      </div>
    );
  }

  return (
    <div
      style={calculateStyles(defaultStyle, hiddenStyle)}
      key={post.id}
    >
      <PostComponent {...postWithEventHandlers} basic={basic} />
    </div>
  );
};

const renderDraft = ({
  draft,
  onApproveClick,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onMoveToDraftsClick,
  onRequestApprovalClick,
  onRescheduleClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  hasFirstCommentFlip,
}) => {
  const draftWithEventHandlers = {
    ...draft,
    key: draft.id,
    draftDetails: draft.draftDetails,
    onCancelConfirmClick: () => onCancelConfirmClick({ draft }),
    onDeleteClick: () => onDeleteClick({ draft }),
    onDeleteConfirmClick: () => onDeleteConfirmClick({ draft }),
    onEditClick: () => onEditClick({ draft }),
    onApproveClick: () => onApproveClick({ draft }),
    onMoveToDraftsClick: () => onMoveToDraftsClick({ draft }),
    onRequestApprovalClick: () => onRequestApprovalClick({ draft }),
    onRescheduleClick: () => onRescheduleClick({ draft }),
    onImageClick: () => onImageClick({ draft }),
    onImageClickNext: () => onImageClickNext({ draft }),
    onImageClickPrev: () => onImageClickPrev({ draft }),
    onImageClose: () => onImageClose({ draft }),
    hasFirstCommentFlip,
  };
  let DraftComponent = draftTypeComponentMap.get(draft.type);
  DraftComponent = DraftComponent || TextDraft;

  const defaultStyle = {
    default: {
      marginBottom: '2rem',
      maxHeight: '100vh',
      transition: `all ${transitionAnimationTime} ${transitionAnimationType}`,
    },
    hidden: {
      maxHeight: 0,
      opacity: 0,
    },
  };

  const hiddenStyle = {
    hidden: draft.isDeleting,
  };

  return (
    <div
      style={calculateStyles(defaultStyle, hiddenStyle)}
      key={draft.id}
    >
      <ErrorBoundary fallbackComponent={() => <DraftComponent {...draftWithEventHandlers} basic />}>
        <DraftComponent {...draftWithEventHandlers} />
      </ErrorBoundary>
    </div>
  );
};

const renderHeader = ({ text, id }) => (
  <div style={listHeaderStyle} key={id}>
    <Text color={'black'}>
      {text}
    </Text>
  </div>
);

/* eslint-enable react/prop-types */

const QueueItems = (props) => {
  const { items, type, ...propsForPosts } = props;
  const itemList = items.map((item, index) => {
    const { queueItemType, ...rest } = item;
    if (queueItemType === 'post') {
      return type === 'drafts' ? renderDraft({ draft: rest, ...propsForPosts }) : renderPost({ post: rest, index, ...propsForPosts });
    }
    if (queueItemType === 'header') {
      return renderHeader(rest);
    }
    return null;
  });
  return (
    <div>
      {itemList}
    </div>
  );
};

QueueItems.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
    }),
  ),
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
  onSwapPosts: PropTypes.func,
  draggable: PropTypes.bool,
  type: PropTypes.string,
};

QueueItems.defaultProps = {
  items: [],
  draggable: false,
  type: 'post',
};

export default QueueItems;
