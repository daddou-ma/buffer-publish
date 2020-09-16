import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import QueueItems from './index';
import { postLists, postListsNoHeaders } from './postData';

storiesOf('Queue|QueueItems', module)
  .addDecorator(withA11y)
  .add('default queue', () => (
    <QueueItems
      items={postLists}
      onRequeueClick={action('onCancelConfirmClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onDropPost={action('onDropPost')}
      onSwapPosts={action('onSwapPosts')}
      draggable={false}
    />
  ))
  .add('no headers type drafts', () => (
    <QueueItems
      items={postListsNoHeaders}
      onRequeueClick={action('onCancelConfirmClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onDropPost={action('onDropPost')}
      onSwapPosts={action('onSwapPosts')}
      draggable={false}
      type="drafts"
    />
  ));
