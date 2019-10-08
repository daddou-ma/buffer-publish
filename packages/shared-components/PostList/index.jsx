import React from 'react';
import PropTypes from 'prop-types';
import {
  List,
  Text,
} from '@bufferapp/components';
import { Button } from '@bufferapp/ui';
import { WithFeatureLoader } from '@bufferapp/product-features';
import { QueueButtonGroup } from '@bufferapp/publish-shared-components';
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

const listHeaderStyle = {
  display: 'flex',
  alignItems: 'center',
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
  };
  let PostComponent = postTypeComponentMap.get(post.type);
  PostComponent = PostComponent || TextPost;

  return <PostComponent {...postWithEventHandlers} />;
};

const renderHeader = ({ listHeader, isPastReminder, isFirstItem, viewType, onToggleViewType }) => (
  <div style={listHeaderStyle}>
    <Text color="black">
      {listHeader}
    </Text>
    {isPastReminder && isFirstItem && (
      <div style={{ marginLeft: 'auto' }}>
        <QueueButtonGroup
          tab="reminders"
          viewType={viewType}
          buttons={['Posts', 'Stories']}
          onClick={type => onToggleViewType(type)}
        />
      </div>
    )}
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
  viewType,
  onToggleViewType,
}) => (
  <div>
    {renderHeader({
      listHeader,
      isPastReminder,
      isFirstItem: index === 0,
      viewType,
      onToggleViewType,
    })}
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
  index: PropTypes.number,
  viewType: PropTypes.string,
  onToggleViewType: PropTypes.func,
};

PostList.defaultProps = {
  posts: [],
  index: 0,
  viewType: 'posts',
  onToggleViewType: () => {},
};

export default WithFeatureLoader(PostList);
