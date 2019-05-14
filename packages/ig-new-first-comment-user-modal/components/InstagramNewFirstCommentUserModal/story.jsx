import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import InstagramNewFirstCommentUserModal from './index';

storiesOf('IGNewFirstCommentUserModal', module)
  .addDecorator(checkA11y)
  .add('should show instagram modal', () => (
    <InstagramNewFirstCommentUserModal
      translations={translations['instagram-new-first-comment-user-modal']}
      hideModal={action('hide-modal')}
    />
  ));
