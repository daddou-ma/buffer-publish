import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import Notification from './index';


storiesOf('EmailNotification', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <Notification
      title={'Empty Buffer'}
      description={'Send me an email when one of my Buffers becomes empty.'}
      type={'bufferEmpty'}
    />
  ));
