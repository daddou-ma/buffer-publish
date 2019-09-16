import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y/register';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import InstagramFirstCommentProTrialModal from './index';

storiesOf('InstagramFirstCommentProTrialModal', module)
  .addDecorator(checkA11y)
  .add('should show instagram modal', () => (
    <InstagramFirstCommentProTrialModal
      translations={translations['instagram-first-comment-pro-trial-modal']}
      hideModal={action('hide-modal')}
    />
  ));
