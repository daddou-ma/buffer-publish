import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import PostEmptySlot from './index';

const twitterPost = {
  time: '08:33 am',
  service: 'twitter',
};

const instagramPost = {
  time: '11:45 pm',
  service: 'instagram',
};

storiesOf('PostEmptySlot', module)
  .addDecorator(withA11y)
  .add('schedule slot for twitter profile', () => (
    <PostEmptySlot onClick={() => {}} {...twitterPost} />
  ))
  .add('schedule slot for instagram profile', () => (
    <PostEmptySlot onClick={() => {}} {...instagramPost} />
  ));
