import React from 'react';
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { queueItems } from '@bufferapp/publish-test-utils/mock-ui-data';
import SentPosts from './index';

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

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('SentPosts', module)
  .addDecorator(withA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('default', () => (
    <SentPosts
      total={1}
      loading={false}
      items={queueItems({ isSent: true, isPastReminder: false })}
      onComposerCreateSuccess={action('onComposerCreateSuccess')}
      onClickUpgrade={action('onClickUpgrade')}
      onShareAgainClick={action('onShareAgainClick')}
      fetchSentPosts={action('fetchSentPosts')}
      fetchCampaignsIfNeeded={action('fetchCampaignsIfNeeded')}
      linkShortening={{}}
    />
  ))
  .add('with stats', () => (
    <SentPosts
      total={1}
      loading={false}
      items={queueItems({ isSent: true, isPastReminder: false })}
      onComposerCreateSuccess={action('onComposerCreateSuccess')}
      onClickUpgrade={action('onClickUpgrade')}
      onShareAgainClick={action('onShareAgainClick')}
      fetchSentPosts={action('fetchSentPosts')}
      fetchCampaignsIfNeeded={action('fetchCampaignsIfNeeded')}
      linkShortening={{}}
      hasAnalyticsOnPosts
      hasTwitterImpressions
    />
  ));
