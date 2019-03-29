import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import GridPosts from './index';
import {
  gridPosts,
} from './postData';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const profile = {
  id: 'abc',
  loading: false,
  business: true,
  service: 'instagram',
  timezone: 'London/Europe',
  avatar_https: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5c829d3838da0900d16ee5e4/3a9dd6c260165524ba20b2fd174a0873.original.jpg',
};

const store = storeFake({
  i18n: {
    translations: {
      'upgrade-modal': {},
    },
  },
  upgradeModal: {},
  stripe: {},
  generatedUrl: 'https://buff.ly/2UYXSK5',
  profile,
  productFeatures: {
    planName: 'business',
    features: {},
  },
});

const features = { isFreeUser: () => false };

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('GridPosts', module)
  .addDecorator(checkA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('should show grid posts', () => (
    <GridPosts
      profileId="abc"
      loading={false}
      isLockedProfile={false}
      gridPosts={gridPosts}
      profile={profile}
      generatedUrl="https://buff.ly/2UYXSK5"
      total={2}
      features={features}
      onImageClick={action('onImageClick')}
      onImageClose={action('onImageClose')}
    />
  ));
