import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { queueItems } from '@bufferapp/publish-test-utils/mock-ui-data';
import { Provider } from 'react-redux';
import PastRemindersPosts from './index';

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
});

const StoreDecorator = storyFn => (
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('PastRemindersPosts', module)
  .addDecorator(withA11y)
  .addDecorator(StoreDecorator)
  .add('default', () => (
    <PastRemindersPosts
      total={10}
      loading={false}
      isManager
      userData={{}}
      items={queueItems({ isSent: false, isPastReminder: true })}
      viewType="posts"
      onPreviewClick={action('onPreviewClick')}
      showStoryPreview={false}
      showStoriesComposer={false}
      isDisconnectedProfile={false}
      onClosePreviewClick={action('onClosePreviewClick')}
      fetchCampaignsIfNeeded={action('fetchCampaignsIfNeeded')}
      hasShareAgainFeature
    />
  ))
  .add('loading', () => (
    <PastRemindersPosts
      total={10}
      loading
      isManager
      userData={{}}
      items={queueItems({ isSent: false, isPastReminder: true })}
      viewType="posts"
      onPreviewClick={action('onPreviewClick')}
      showStoryPreview={false}
      showStoriesComposer={false}
      isDisconnectedProfile={false}
      onClosePreviewClick={action('onClosePreviewClick')}
      fetchCampaignsIfNeeded={action('fetchCampaignsIfNeeded')}
      hasShareAgainFeature
    />
  ))
  .add('if Manager and in Business Account', () => (
    <PastRemindersPosts
      total={5}
      loading={false}
      isManager
      userData={{}}
      items={queueItems({ isSent: false, isPastReminder: true })}
      viewType="posts"
      onPreviewClick={action('onPreviewClick')}
      showStoryPreview={false}
      showStoriesComposer={false}
      isDisconnectedProfile={false}
      onClosePreviewClick={action('onClosePreviewClick')}
      fetchCampaignsIfNeeded={action('fetchCampaignsIfNeeded')}
      hasShareAgainFeature
    />
  ))
  .add('if Contributor and in Business Account', () => (
    <PastRemindersPosts
      total={10}
      loading={false}
      isManager={false}
      userData={{}}
      items={queueItems({ isSent: false, isPastReminder: true })}
      viewType="posts"
      onPreviewClick={action('onPreviewClick')}
      showStoryPreview={false}
      showStoriesComposer={false}
      isDisconnectedProfile={false}
      onClosePreviewClick={action('onClosePreviewClick')}
      fetchCampaignsIfNeeded={action('fetchCampaignsIfNeeded')}
      hasShareAgainFeature
    />
  ));
