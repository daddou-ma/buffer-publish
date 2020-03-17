import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import PostTag from './index';

storiesOf('Cards|Posts/PostTag', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <PostTag
      name="Post Tag"
      color="orange"
      dragging={false}
      onPostTagClick={action('on-tag-click')}
    />
  ));
