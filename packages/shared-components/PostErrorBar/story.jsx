import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import PostErrorBar from './index';

const error = `Uh-oh! It looks like this profile was locked when we tried to
  send this update. Up for retrying? If you still run into troubles, get in touch!`;

storiesOf('PostErrorBar', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <PostErrorBar
      error={error}
      dragging={false}
    />
));
