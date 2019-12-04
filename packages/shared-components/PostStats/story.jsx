import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import PostStats from './index';

const stats = {
  reach: 10,
  likes: 0,
  comments: 1,
  notToDisplay: 20,
};

const linkedinStats = {
  clicks: 24,
  comments: 10,
  likes: 1273,
  reshares: 40,
};

const twitterStats = {
  retweets: 10,
  favorites: 29,
  mentions: 0,
  clicks: 1,
  reach: 3,
};

storiesOf('Cards|Posts/PostStats', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <PostStats statistics={stats} profileService="facebook" />
  ))
  .add('linkedin stats', () => (
    <PostStats statistics={linkedinStats} profileService="linkedin" />
  ))
  .add('twitter stats', () => (
    <PostStats statistics={twitterStats} profileService="twitter" />
  ));
