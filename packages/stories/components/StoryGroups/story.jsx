import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import { queueItems } from '@bufferapp/publish-test-utils/mock-ui-data';

import StoryGroups from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  i18n: {
    translations: {
      'switch-plan-modal': {},
    },
  },
  switchPlanModal: {},
  stripe: {},
  user: {
    profileLimit: 3,
    id: 'id1',
  },
  profileSidebar: {
    selectedProfile: {
      ownerId: 'id1',
    },
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('Stories|StoryGroups', module)
  .addDecorator(withA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('should show stories storyPosts', () => (
    <StoryGroups
      loading={false}
      storyGroups={queueItems({
        isSent: false,
        isPastReminder: false,
        isStory: true,
      })}
      isLockedProfile={false}
      showStoriesComposer={false}
      onEmptySlotClick={action('onEmptySlotClick')}
      onEditClick={action('onEditClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onComposerPlaceholderClick={action('onComposerPlaceholderClick')}
      onShareNowClick={action('onShareNowClick')}
      onCalendarClick={action('onCalendarClick')}
      translations={translations['story-group-queue']}
      userData={{ tags: ['has_instagram_stories_mobile'] }}
    />
  ));
