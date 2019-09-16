import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import PostMetaBar from './index';

storiesOf('PostMetaBar', module)
  .addDecorator(checkA11y)
  .add('Pinterest bar with boards and sourceUrl', () => (
    <PostMetaBar
      leftContent={{
        title: 'Pinned to:',
        avatarUrl: 'http://i.pinimg.com/200x150/76/4a/36/764a36f92e012937b13d150690747365.jpg',
        text: 'Art'
      }}
      rightContent={{ title: 'Source:', text: 'google.com' }}
      dragging={false}
    />
  ))
  .add('Pinterest bar with only boards', () => (
    <PostMetaBar
      leftContent={{
        title: 'Pinned to:',
        avatarUrl: 'http://i.pinimg.com/200x150/76/4a/36/764a36f92e012937b13d150690747365.jpg',
        text: 'Art',
      }}
      dragging={false}
    />
  ))
  .add('Instagram bar with location', () => (
    <PostMetaBar
      leftContent={{ title: 'Location:', text: 'New Zealand' }}
      dragging={false}
    />
));
