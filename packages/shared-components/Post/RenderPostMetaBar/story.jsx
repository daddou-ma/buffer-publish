import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import RenderPostMetaBar from './index';

const subprofiles = [
  {
    avatar:
      'http://i.pinimg.com/200x150/76/4a/36/764a36f92e012937b13d150690747365.jpg',
    id: '5bbca83e94803d000e7dca34',
    name: 'Books',
  },
  {
    avatar:
      'http://i.pinimg.com/200x150/ac/c7/15/acc7159eb4a3fd01963087465305b967.jpg',
    id: '5bbca83e94803d000e7dca35',
    name: 'Travel',
  },
];

storiesOf('RenderPostMetaBar', module)
  .addDecorator(withA11y)
  .add('Post with Instagram', () => (
    <RenderPostMetaBar
      profileService={'instagram'}
      locationName={'New Zealand'}
      dragging
    />
  ))
  .add('Post with Pinterest', () => (
    <RenderPostMetaBar
      profileService={'pinterest'}
      sourceUrl={'http://google.com'}
      subprofileID={'5bbca83e94803d000e7dca35'}
      subprofiles={subprofiles}
      dragging
    />
  ));
