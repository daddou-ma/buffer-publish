import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { queueItems } from '@bufferapp/publish-test-utils/mock-ui-data';
import QueueItems from './index';

storiesOf('Queue|QueueItems', module)
  .addDecorator(withA11y)
  .add('default queue', () => (
    <QueueItems
      items={queueItems({ isSent: false })}
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
      items={queueItems({ isSent: false, isDraft: true })}
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
