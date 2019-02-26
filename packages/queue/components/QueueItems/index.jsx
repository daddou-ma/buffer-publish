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

import {
  TextPost,
  ImagePost,
  MultipleImagesPost,
  LinkPost,
  VideoPost,
  PostDragWrapper,
} from '@bufferapp/publish-shared-components';

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

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  subprofiles,
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
  draggable,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    postDetails: post.postDetails,
    subprofiles,
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
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  const defaultStyle = {
    default: {
      marginBottom: '2rem',
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
          index={post.index}
          postComponent={PostComponent}
          postProps={postWithEventHandlers}
        />
      </div>
    );
  }

  return (
    <div
      style={calculateStyles(defaultStyle, hiddenStyle)}
      key={post.id}
    >
      <PostComponent {...postWithEventHandlers} />
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
  const { items, ...propsForPosts } = props;
  const itemList = items.map((item) => {
    const { queueItemType, ...rest } = item;
    if (queueItemType === 'post') {
      return renderPost({ post: rest, ...propsForPosts });
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
  subprofiles: PropTypes.arrayOf(
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
  draggable: PropTypes.bool,
};

QueueItems.defaultProps = {
  items: [],
  subprofiles: [],
  draggable: false,
};

export default QueueItems;
