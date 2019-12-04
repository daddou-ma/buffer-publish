import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import EmptyState from './index';

storiesOf('EmptyState', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <EmptyState
      title={"It looks like you haven't got any posts in your queue!"}
      subtitle={'Click the box above to add a post to your queue :)'}
      heroImg={'https://s3.amazonaws.com/buffer-publish/images/fresh-queue.png'}
      heroImgSize={{ width: '229px', height: '196px' }}
    />
  ))
  .add('with emoji', () => (
    <EmptyState
      title={"Looks like you don't have any drafts yet!"}
      subtitle={'This is where drafts from your team members will appear.'}
      emoji={'✍️'}
    />
  ));
