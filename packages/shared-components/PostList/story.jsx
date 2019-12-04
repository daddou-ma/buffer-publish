import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { Provider } from 'react-redux';
import PostList from './index';
import {
  posts,
  linkPosts,
  missingTypePosts,
  imagePosts,
  multipleImagePosts,
  sentPosts,
  videoPosts,
  listHeader,
  pastRemindersPosts,
} from './postData';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  productFeatures: {
    planName: 'free',
    features: {},
  },
});

storiesOf('PostList', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('default', () => (
    <PostList
      listHeader={listHeader}
      posts={posts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
    />
  ))
  .add('sent', () => (
    <PostList
      listHeader={listHeader}
      posts={sentPosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      isSent
    />
  ))
  .add('sent, for a team member', () => (
    <PostList
      listHeader={listHeader}
      posts={sentPosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onShareAgainClick={action('onShareAgainClick')}
      isSent
      isBusinessAccount
    />
  ))
  .add('past reminders', () => (
    <PostList
      listHeader={listHeader}
      posts={pastRemindersPosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onMobileClick={action('onMobileClick')}
      onShareAgainClick={action('onShareAgainClick')}
      isPastReminder
      isManager
    />
  ))
  .add('past reminders, for a team member and manager', () => (
    <PostList
      listHeader={listHeader}
      posts={pastRemindersPosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onMobileClick={action('onMobileClick')}
      onShareAgainClick={action('onShareAgainClick')}
      isPastReminder
      isManager
      isBusinessAccount
    />
  ))
  .add('past reminders, for a team member and contributor', () => (
    <PostList
      listHeader={listHeader}
      posts={pastRemindersPosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onMobileClick={action('onMobileClick')}
      onShareAgainClick={action('onShareAgainClick')}
      isPastReminder
      isManager={false}
      isBusinessAccount
    />
  ))
  .add('missing type', () => (
    <PostList
      listHeader={listHeader}
      posts={missingTypePosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
    />
  ))
  .add('link posts', () => (
    <PostList
      listHeader={listHeader}
      posts={linkPosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
    />
  ))
  .add('image posts', () => (
    <PostList
      listHeader={listHeader}
      posts={imagePosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
    />
  ))
  .add('multiple image posts', () => (
    <PostList
      listHeader={listHeader}
      posts={multipleImagePosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
    />
  ))
  .add('video posts', () => (
    <PostList
      listHeader={listHeader}
      posts={videoPosts}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
    />
  ));
