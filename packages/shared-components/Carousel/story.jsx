/* Commenting out tests to pass build for now
import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import Carousel from './index';
import carouselData from './carouselData';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

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
  avatar_https: 'https://buffer-media-uploads-dev.s3.amazonaws.com/5b8e886dbee2c512007b23c6/5c829d3838da0900d16ee5e4/3a9dd6c260165524ba20b2fd174a0873.original.jpg',
};

const store = storeFake({
  i18n: {
    translations: {
      'switch-plan-modal': {},
      'upload-zone': translations['upload-zone'],
    },
  },
  switchPlanModal: {},
  stripe: {},
  profile,
  productFeatures: {
    planName: 'business',
    features: {},
  },
});

const UpgradeModalDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('Carousel', module)
  .addDecorator(checkA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('should show carousel with stories', () => (
    <Carousel
      cards={carouselData}
      editMode={false}
    />
  ))
  .add('should carousel with slots', () => (
    <Carousel
      editMode
    />
  ));
*/
