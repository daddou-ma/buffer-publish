import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import InstagramPostMetaBar from './index';

storiesOf('InstagramPostMetaBar', module)
  .addDecorator(checkA11y)
  .add('Post with location', () => (
    <InstagramPostMetaBar
      location={'New Zealand'}
      dragging
    />
  ));
