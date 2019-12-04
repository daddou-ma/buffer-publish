import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import PinterestPostMetaBar from './index';

storiesOf('PinterestPostMetaBar', module)
  .addDecorator(withA11y)
  .add('Post with sourceUrl, boardName, boardAvatarUrl', () => (
    <PinterestPostMetaBar
      sourceUrl={'http://google.com'}
      boardName={'Books'}
      boardAvatarUrl={
        'http://i.pinimg.com/200x150/76/4a/36/764a36f92e012937b13d150690747365.jpg'
      }
      dragging
    />
  ));
