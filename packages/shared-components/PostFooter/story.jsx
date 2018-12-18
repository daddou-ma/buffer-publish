import React from 'react';
import {
  action,
  linkTo,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PostFooter from './index';

const postDetails = {
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsSent = {
  postAction: 'This post was sent at 9:21 (GMT)',
};

const postDetailsCustomScheduled = {
  postAction: 'This post is custom scheduled for 9:21 (GMT)',
  isCustomScheduled: true,
};

const postDetailsCustomScheduledSent = {
  postAction: 'This post was custom scheduled for 9:21 (GMT)',
  isCustomScheduled: true,
};

const postDetailsInstagramReminder = {
  postAction: 'You will receive a reminder at 9:21 (GMT) when it is time to post',
  isCustomScheduled: true,
  isInstagramReminder: true,
};

const postDetailsError = {
  postAction: 'This post will be sent at 9:21 (GMT)',
  error: 'Woops! Something went wrong. Try again?',
};

storiesOf('PostFooter', module)
  .addDecorator(checkA11y)
  .add('queued post', () => (
    <PostFooter
      onCancelConfirmClick={linkTo('PostFooter', 'queued post')}
      onDeleteClick={linkTo('PostFooter', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('PostFooter', 'isDeleting')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('PostFooter', 'isWorking')}
      postDetails={postDetails}
      isSent={false}
    />
  ))
  .add('post if contributor', () => (
    <PostFooter
      postDetails={postDetails}
      isSent={false}
      isManager={false}
    />
  ))
  .add('sent post', () => (
    <PostFooter
      postDetails={postDetailsSent}
      isSent
    />
  ))
  .add('custom scheduled post', () => (
    <PostFooter
      postDetails={postDetailsCustomScheduled}
      isSent={false}
    />
  ))
  .add('sent custom scheduled post', () => (
    <PostFooter
      postDetails={postDetailsCustomScheduledSent}
      isSent
    />
  ))
  .add('instagram reminder post', () => (
    <PostFooter
      postDetails={postDetailsInstagramReminder}
      isSent={false}
    />
  ))
  .add('post with error', () => (
    <PostFooter
      onCancelConfirmClick={linkTo('PostFooter', 'queued post')}
      onDeleteClick={linkTo('PostFooter', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('PostFooter', 'isDeleting')}
      onEditClick={action('edit-click')}
      onShareNowClick={linkTo('PostFooter', 'isWorking')}
      postDetails={postDetailsError}
      isSent={false}
    />
  ))
  .add('isConfirmingDelete', () => (
    <PostFooter
      onDeleteClick={linkTo('PostFooter', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('PostFooter', 'isDeleting')}
      onCancelConfirmClick={linkTo('PostFooter', 'queued post')}
      onEditClick={action('edit-click')}
      postDetails={postDetails}
      isConfirmingDelete
      isSent={false}
    />
  ))
  .add('isDeleting', () => (
    <PostFooter
      onDeleteClick={linkTo('PostFooter', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('PostFooter', 'isDeleting')}
      onCancelConfirmClick={linkTo('PostFooter', 'queued post')}
      onEditClick={action('edit-click')}
      postDetails={postDetails}
      isDeleting
      isSent={false}
    />
  ))
  .add('isWorking', () => (
    <PostFooter
      onDeleteClick={linkTo('PostFooter', 'isConfirmingDelete')}
      onDeleteConfirmClick={linkTo('PostFooter', 'isDeleting')}
      onCancelConfirmClick={linkTo('PostFooter', 'queued post')}
      onEditClick={action('edit-click')}
      postDetails={postDetails}
      isWorking
      isSent={false}
    />
  ));
