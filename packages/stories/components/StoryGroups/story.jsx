import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y/register';

import StoryGroups from './index';
import storyGroups from './storiesData';

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
  productFeatures: {
    planName: 'free',
    features: {},
  },
  appSidebar: {
    user: {
      profile_limit: 3,
      id: 'id1',
    },
  },
  profileSidebar: {
    selectedProfile: {
      ownerId: 'id1',
    },
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('StoryGroups', module)
  .addDecorator(checkA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('should show stories storyPosts', () => (
    <StoryGroups
      total={2}
      loading={false}
      isManager
      isBusinessAccount
      storyGroups={storyGroups}
      isLockedProfile={false}
      showStoriesComposer={action('showStoriesComposer')}
      onEmptySlotClick={action('onEmptySlotClick')}
      onEditClick={action('onEditClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onComposerPlaceholderClick={action('onComposerPlaceholderClick')}
      onShareNowClick={action('onShareNowClick')}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onCalendarClick={action('onCalendarClick')}
    />
  ));
