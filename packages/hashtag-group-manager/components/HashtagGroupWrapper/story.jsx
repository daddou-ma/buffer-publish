import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import HashtagGroupWrapper from './index';

const hashtagGroups = [
  {
    name: 'Woofers-Booping Snoots & Doing Friday',
    id: '1',
    text: '#Woofers #Bigwoofer #Woofpack',
  },
  {
    name: 'Woofers-Booping Snoots & Doing Friday',
    id: '2',
    text: '#Woofers #Bigwoofer #Woofpack',
  },
];

storiesOf('HashtagGroup', module)
  .addDecorator(withA11y)
  .add('create hashtag group', () => (
    <HashtagGroupWrapper viewMode={'createHashtag'} />
  ))
  .add('manage hashtags, groups', () => (
    <HashtagGroupWrapper
      viewMode={'manageHashtag'}
      hashtagGroups={hashtagGroups}
    />
  ))
  .add('manage hashtags, no groups', () => (
    <HashtagGroupWrapper viewMode={'manageHashtag'} hashtagGroups={[]} />
  ));
