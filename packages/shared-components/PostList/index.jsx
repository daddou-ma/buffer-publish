import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Text,
} from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import { WithFeatureLoader } from '@bufferapp/product-features';
import TextPost from '../TextPost';
import ImagePost from '../ImagePost';
import MultipleImagesPost from '../MultipleImagesPost';
import LinkPost from '../LinkPost';
import VideoPost from '../VideoPost';
import Story from '../Story';

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

const listHeaderStyle = isFirstItem => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '1rem',
  marginTop: isFirstItem ? '2rem' : '1rem',
  marginLeft: '0.5rem',
});

const postTypeComponentMap = new Map([
  ['text', TextPost],
  ['image', ImagePost],
  ['multipleImage', MultipleImagesPost],
  ['link', LinkPost],
  ['video', VideoPost],
  ['storyGroup', Story],
]);

/* eslint-disable react/prop-types */

const renderPost = ({
  post,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onSwapPosts,
  isSent,
  isBusinessAccount,
  isPastReminder,
  hasFirstCommentFlip,
  userData,
}) => {
  const postWithEventHandlers = {
    ...post,
    key: post.id,
    onDeleteConfirmClick: () => onDeleteConfirmClick({ post }),
    onEditClick: () => onEditClick({ post }),
    onShareNowClick: () => onShareNowClick({ post }),
    onImageClick: () => onImageClick({ post }),
    onImageClickNext: () => onImageClickNext({ post }),
    onImageClickPrev: () => onImageClickPrev({ post }),
    onImageClose: () => onImageClose({ post }),
    onDropPost,
    onSwapPosts,
    isSent,
    isBusinessAccount,
    isPastReminder,
    hasFirstCommentFlip,
    userData,
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  return <PostComponent {...postWithEventHandlers} />;
};

const renderHeader = ({ listHeader, isFirstItem }) => (
  <div style={listHeaderStyle(isFirstItem)}>
    <Text color="black">
      {listHeader}
    </Text>
  </div>
);

/* eslint-enable react/prop-types */

const PostList = ({
  listHeader,
  posts,
  onDeleteConfirmClick,
  onEditClick,
  onShareNowClick,
  onImageClick,
  onImageClickNext,
  onImageClickPrev,
  onImageClose,
  onDropPost,
  onSwapPosts,
  onShareAgainClick,
  onMobileClick,
  isSent,
  isManager,
  isPastReminder,
  isBusinessAccount,
  features,
  hasFirstCommentFlip,
  index,
  userData,
}) => (
  <div>
    {renderHeader({ listHeader, isFirstItem: index === 0 })}
    <List
      items={posts.map(post => (
        <div
          id={`update-${post.id}`}
          className={[
            'update',
            `post_${post.profile_service}`,
            post.postDetails && post.postDetails.isRetweet
              ? 'is_retweet'
              : 'not_retweet',
          ].join(' ')}
          style={postStyle}
        >
          {
            renderPost({
              post,
              onDeleteConfirmClick,
              onEditClick,
              onShareNowClick,
              onImageClick,
              onImageClickNext,
              onImageClickPrev,
              onImageClose,
              onDropPost,
              onSwapPosts,
              onShareAgainClick,
              isSent,
              isBusinessAccount,
              isPastReminder,
              hasFirstCommentFlip,
              userData,
            })
          }
          {(!features.isFreeUser() || isBusinessAccount) && !isPastReminder
            && (
              <div style={reBufferWrapperStyle}>
                <Button
                  type="secondary"
                  label="Share Again"
                  onClick={() => { onShareAgainClick({ post }); }}
                />
              </div>
            )
          }
          {isPastReminder
            && (
              <div>
                {(!features.isFreeUser() || isBusinessAccount)
                  && (
                    <div style={reBufferWrapperStyle}>
                      <Button
                        fullWidth
                        type="secondary"
                        label="Share Again"
                        onClick={() => { onShareAgainClick({ post }); }}
                      />
                    </div>
                  )
                }
                {isManager
                && (
                  <div style={reBufferWrapperStyle}>
                    <Button
                      fullWidth
                      type="secondary"
                      label="Send to Mobile"
                      onClick={() => { onMobileClick({ post }); }}
                    />
                  </div>
                )
              }
              </div>
            )
          }
        </div>
      ))}
    />
  </div>
);

PostList.propTypes = {
  listHeader: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    }),
  ),
  onDeleteConfirmClick: PropTypes.func,
  onEditClick: PropTypes.func,
  onShareNowClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onImageClickNext: PropTypes.func,
  onImageClickPrev: PropTypes.func,
  onImageClose: PropTypes.func,
  onDropPost: PropTypes.func,
  onSwapPosts: PropTypes.func,
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
