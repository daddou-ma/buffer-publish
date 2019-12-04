import React from 'react';
import { storiesOf } from '@storybook/react';
import InstagramFeedback from './InstagramFeedback';

const feedback = [
  {
    message:
      "Due to Instagram limitations, we can't post images directly to Instagram with aspect\n        ratios outside the range 4:5 to 1.91:1. You will receive a reminder to post manually when the time comes!", // eslint-disable-line max-len
    composerId: 'instagram',
    code: 'ASPECT_RATIO',
  },
];

storiesOf('InstagramFeedback').add('should render correctly', () => (
  <div>
    <InstagramFeedback feedback={feedback} />
  </div>
));
