import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import HashtagGroupWrapper from './index';

const hashtagGroups = [
  {
    name: 'Woofers-Booping Snoots & Doing Friday',
    numberOfHashtags: '17',
    hashtags: '#Woofers #Bigwoofer #Woofpack',
  },
  {
    name: 'Woofers-Booping Snoots & Doing Friday',
    numberOfHashtags: '17',
    hashtags: '#Woofers #Bigwoofer #Woofpack',
  },
];

storiesOf('HashtagGroup', module)
  .addDecorator(checkA11y)
  .add('create hashtag group', () => (
    <HashtagGroupWrapper
      viewMode={'createHashtag'}
    />
  ))
  .add('manage hashtags, groups', () => (
    <HashtagGroupWrapper
      viewMode={'manageHashtag'}
      hashtagGroups={hashtagGroups}
    />
  ))
  .add('manage hashtags, no groups', () => (
    <HashtagGroupWrapper
      viewMode={'manageHashtag'}
      hashtagGroups={[]}
    />
  ));
