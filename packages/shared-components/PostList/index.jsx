import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Text,
  Button,
} from '@bufferapp/components';
import { WithFeatureLoader } from '@bufferapp/product-features';
import TextPost from '../TextPost';
import ImagePost from '../ImagePost';
import MultipleImagesPost from '../MultipleImagesPost';
import LinkPost from '../LinkPost';
import VideoPost from '../VideoPost';

const reBufferWrapperStyle = {
  paddingLeft: '1rem',
  paddingBottom: '0.5rem',
  minWidth: '146px',
};

const postStyle = {
  display: 'flex',
  alignItems: 'flex-start',
  marginBottom: '2rem',
};

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
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onSwapPost,
  isSent,
  isBusinessAccount,
  isPastReminder,
  hasFirstCommentFlip,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    onCancelConfirmClick: () => onCancelConfirmClick({ post }),
    onDeleteClick: () => onDeleteClick({ post }),
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onImageClick: () => onImageClick({ post }),
    onImageClickNext: () => onImageClickNext({ post }),
    onImageClickPrev: () => onImageClickPrev({ post }),
    onImageClose: () => onImageClose({ post }),
    onDropPost,
    onSwapPost,
    isSent,
    isBusinessAccount,
    isPastReminder,
    hasFirstCommentFlip,
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  return <PostComponent {...postWithEventHandlers} />;
};

/* eslint-enable react/prop-types */

const PostList = ({
  listHeader,
  posts,
  onCancelConfirmClick,
  onDeleteClick,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onSwapPost,
  onShareAgainClick,
  onMobileClick,
  isSent,
  isManager,
  isPastReminder,
  isBusinessAccount,
  features,
  hasFirstCommentFlip,
}) =>
  <div>
    <div style={listHeaderStyle}>
      <Text
        color={'black'}
      >
        {listHeader}
      </Text>
    </div>
    <List
      items={posts.map(post =>
        <div id={`update-${post.id}`} className="update" style={postStyle}>
          {
            renderPost({
              post,
              onCancelConfirmClick,
              onDeleteClick,
              onDeleteConfirmClick,
              onEditClick,
              onShareNowClick,
              onImageClick,
              onImageClickNext,
              onImageClickPrev,
              onImageClose,
              onDropPost,
              onSwapPost,
              onShareAgainClick,
              isSent,
              isBusinessAccount,
              isPastReminder,
              hasFirstCommentFlip,
            })
          }
          {(!features.isFreeUser() || isBusinessAccount) && !isPastReminder &&
            <div style={reBufferWrapperStyle}>
              <Button
                secondary
                onClick={() => { onShareAgainClick({ post }); }}
              >
                Share Again
              </Button>
            </div>
          }
          {isPastReminder &&
            <div>
              {(!features.isFreeUser() || isBusinessAccount) &&
                <div style={reBufferWrapperStyle}>
                  <Button
                    fillContainer
                    secondary
                    onClick={() => { onShareAgainClick({ post }); }}
                  >
                    Share Again
                  </Button>
                </div>
              }
              {isManager &&
                <div style={reBufferWrapperStyle}>
                  <Button
                    fillContainer
                    secondary
                    onClick={() => { onMobileClick({ post }); }}
                  >
                    Send to Mobile
                  </Button>
                </div>
              }
            </div>
          }
        </div>,
      )}
    />
  </div>;

PostList.propTypes = {
  listHeader: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  onCancelConfirmClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPost: PropTypes.func,
  onShareAgainClick: PropTypes.func,
  onMobileClick: PropTypes.func,
  isSent: PropTypes.bool,
  isManager: PropTypes.bool,
  isPastReminder: PropTypes.bool,
  isBusinessAccount: PropTypes.bool,
  hasFirstCommentFlip: PropTypes.bool,
  features: PropTypes.object.isRequired, // eslint-disable-line
};

PostList.defaultProps = {
  posts: [],
};

export default WithFeatureLoader(PostList);
