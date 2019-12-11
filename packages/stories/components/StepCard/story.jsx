import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import StepCard from './index';

storiesOf('Stories|StepCard', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <StepCard
      imageUrl="https://buffer-publish.s3.amazonaws.com/images/reminders-step1.jpg"
      number={1}
      title="Set Up Reminders"
      description="Due to Instagram limitations, Stories can't be directly scheduled. A Reminder is a notification from the Buffer Publish app."
    />
  ));
