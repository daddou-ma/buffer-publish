import React from 'react';
import { storiesOf } from '@storybook/react';
import Notification from './Notification';

const TWITTER_MAX_PROFILES = {
  className: null,
  classNames: {
    closeButton:
      'ComposerSection__twitterMaxProfileNotificationCloseButton___zRfRl',
    notification:
      'ComposerSection__twitterMaxProfileNotification___3h47s bi-notification',
  },
  cta: null,
  id: '5gxzbc',
  message:
    'Due to recent changes with Twitter, you\'re only able to post to one Twitter account at a time, so <b>you are only posting to @otter_es</b>. <a href="https://support.buffer.com/hc/en-us/articles/360037727174-Limitations-with-sharing-duplicate-content-on-Twitter" target="_blank">Learn more about the changes</a>.',
  showCloseIcon: true,
  showSoftAndHardCloseOptions: true,
  type: 'INFO',
};

storiesOf('Notification').add(
  'should render an info notification for multiple Twitter profiles',
  () => (
    <div>
      <Notification {...TWITTER_MAX_PROFILES} />
    </div>
  )
);
