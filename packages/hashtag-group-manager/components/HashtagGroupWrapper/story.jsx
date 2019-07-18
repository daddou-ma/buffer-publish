import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import HashtagGroupWrapper from './index';

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
      hashtagGroups={[{ id: 'id' }]}
    />
  ))
  .add('manage hashtags, no groups', () => (
    <HashtagGroupWrapper
      viewMode={'manageHashtag'}
      hashtagGroups={[]}
    />
  ));
