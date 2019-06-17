import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from 'storybook-addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import InstagramFirstCommentStartTrialModal from './index';

storiesOf('InstagramFirstCommentStartTrialModal', module)
  .addDecorator(checkA11y)
  .add('should show instagram modal', () => (
    <InstagramFirstCommentStartTrialModal
      translations={translations['instagram-first-comment-start-trial-modal']}
      hideModal={action('hide-modal')}
    />
  ));
