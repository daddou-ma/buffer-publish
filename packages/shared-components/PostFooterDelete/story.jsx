import React from 'react';
import {
  action,
  linkTo,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import PostFooterDelete from './index';

storiesOf('PostFooterDelete', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <PostFooterDelete
      onCancelConfirmClick={linkTo('PostFooterDelete', 'default')}
      onDeleteClick={linkTo('PostFooterDelete', 'isConfirmingDelete')}
      onDeleteConfirmClick={action('delete-confirm-click')}
    />
  ))
  .add('black text', () => (
    <PostFooterDelete
      color={'black'}
      onCancelConfirmClick={linkTo('PostFooterDelete', 'default')}
      onDeleteClick={linkTo('PostFooterDelete', 'isConfirmingDelete')}
      onDeleteConfirmClick={action('delete-confirm-click')}
    />
  ))
  .add('isConfirmingDelete', () => (
    <PostFooterDelete
      onDeleteClick={action('on-delete-click')}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onCancelConfirmClick={linkTo('PostFooterDelete', 'default')}
      isConfirmingDelete
    />
  ));
