import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import IGFirstCommentModal from './index';

const profile = {
  id: 'abc',
  canPostComment: false,
  service: 'instagram',
  should_post_direct: true,
};

storiesOf('IGFirstCommentModal', module)
  .addDecorator(withA11y)
  .add('should show instagram modal', () => (
    <IGFirstCommentModal
      translations={translations['instagram-first-comment-modal']}
      hideModal={action('hide-modal')}
      launchRequestMorePermission={() => {}}
      profile={profile}
      selectedProfiles={[profile]}
      appId={'abc123'}
      loadFacebook={() => {}}
    />
  ));
