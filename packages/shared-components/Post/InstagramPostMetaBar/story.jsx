import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import InstagramPostMetaBar from './index';

storiesOf('InstagramPostMetaBar', module)
  .addDecorator(withA11y)
  .add('Post with location', () => (
    <InstagramPostMetaBar location={'New Zealand'} dragging />
  ));
