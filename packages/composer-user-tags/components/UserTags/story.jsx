import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import UserTags from './index';

storiesOf('Composer User Tags', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <UserTags
      media={{
        width: 1024,
        height: 1024,
        url:
          'https://buffer-media-uploads-dev.s3.amazonaws.com/5daa35aaaa731800067cfef3/5db0753942c3f7009b653c74/9ba15726fe45ed4f58d326bf2fb73a3c.original.jpeg',
      }}
      saveGlobalTags={action('saving tags!')}
      translations={translations['user-tags']}
    />
  ));
