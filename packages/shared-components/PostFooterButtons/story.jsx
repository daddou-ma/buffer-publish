import React from 'react';
import {
  action,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import PostFooterButtons from './index';

storiesOf('PostFooterButtons', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <PostFooterButtons
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
    />
  ))
  .add('isConfirmingDelete', () => (
    <PostFooterButtons
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isConfirmingDelete
    />
  ))
  .add('isDeleting', () => (
    <PostFooterButtons
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isDeleting
    />
  ))
  .add('isWorking', () => (
    <PostFooterButtons
      onCancelConfirmClick={action('cancel-confirm-click')}
      onDeleteClick={action('delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isWorking
    />
  ));
