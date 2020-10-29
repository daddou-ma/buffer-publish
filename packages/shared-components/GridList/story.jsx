import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import { gridItems } from '@bufferapp/publish-test-utils/mock-ui-data';
import GridList from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const profile = {
  id: 'abc',
  loading: false,
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

storiesOf('GridLists', module)
  .addDecorator(withA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('should show grid list', () => (
    <GridList
      profileId="abc"
      timezone={profile.timezone}
      gridPosts={gridItems}
      onChangePostUrl={action('onChangePostUrl')}
      onSavePostUrl={action('onSavePostUrl')}
      onImageClick={action('onImageClick')}
      onImageClose={action('onImageClose')}
      hasWriteAccess
    />
  ));
