import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import PostErrorBanner from './index';

const error = `Uh-oh! It looks like this profile was locked when we tried to
  send this update. Up for retrying? If you still run into troubles, get in touch!`;

storiesOf('PostErrorBanner', module)
  .addDecorator(withA11y)
  .add('default', () => <PostErrorBanner error={error} dragging={false} />);
