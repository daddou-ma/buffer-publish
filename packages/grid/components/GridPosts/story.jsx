import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import GridPosts from './index';
import { gridPosts } from './postData';

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
  timezone: 'Europe/London',
  avatar_https:
    'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5c829d3838da0900d16ee5e4/3a9dd6c260165524ba20b2fd174a0873.original.jpg',
};

const store = storeFake({
  i18n: {
    translations: {
      'switch-plan-modal': {},
    },
  },
  switchPlanModal: {},
  stripe: {},
  publicGridUrl: 'https://shopgr.id/my-brand',
  profile,
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('GridPosts', module)
  .addDecorator(withA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('should show grid posts with write access', () => (
    <GridPosts
      total={2}
      loading={false}
      gridPosts={gridPosts}
      isLockedProfile={false}
      isManager
      isBusinessAccount
      profile={profile}
      onImageClick={action('onImageClick')}
      onImageClose={action('onImageClose')}
      onChangePostUrl={action('onChangePostUrl')}
      onSavePostUrl={action('onSavePostUrl')}
      publicGridUrl="https://shopgr.id/my-brand"
      hasWriteAccess
    />
  ))
  .add('should show grid posts with read only', () => (
    <GridPosts
      total={2}
      loading={false}
      gridPosts={gridPosts}
      isLockedProfile={false}
      isManager
      isBusinessAccount
      profile={profile}
      onImageClick={action('onImageClick')}
      onImageClose={action('onImageClose')}
      onChangePostUrl={action('onChangePostUrl')}
      onSavePostUrl={action('onSavePostUrl')}
      publicGridUrl="https://shopgr.id/my-brand"
      hasWriteAccess={false}
    />
  ));
