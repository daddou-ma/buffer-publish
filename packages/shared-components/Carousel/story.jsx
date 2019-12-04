import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import Carousel, { CarouselCard, getCardSizes } from './index';
import carouselData from './carouselData';

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
  <Provider store={store}>{storyFn()}</Provider>
);

storiesOf('Carousel', module)
  .addDecorator(withA11y)
  .addDecorator(UpgradeModalDecorator)
  .add('should show carousel with stories', () => {
    const { cardWidth, cardHeight } = getCardSizes();

    return (
      <Carousel totalCardsToShow={carouselData.length}>
        {carouselData.map(card => (
          <CarouselCard
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            card={card}
          />
        ))}
      </Carousel>
    );
  })
  .add('should carousel with slots', () => {
    const { cardWidth, cardHeight } = getCardSizes(true);

    return (
      <Carousel largeCards totalCardsToShow={carouselData.length}>
        {carouselData.map(card => (
          <CarouselCard
            largeCards
            cardWidth={cardWidth}
            cardHeight={cardHeight}
            card={card}
          />
        ))}
      </Carousel>
    );
  });
