import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import styled from 'styled-components';
import Arrow from './index';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const ContentWrapper = styled.div`
  display: flex;
  width: 592px;
  height: 592px;
`;

const Content = styled.div`
  display: flex;
  width: 300px;
  justify-content: center;
`;

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

const ArrowDecorator = storyFn => (
  <Provider store={store}>
    {storyFn()}
  </Provider>
);

storiesOf('Arrow', module)
  .addDecorator(checkA11y)
  .addDecorator(ArrowDecorator)
  .add('should show left arrow', () => (
    <Arrow
      isLeft
    />
  ))
  .add('should show left and right arrows', () => (
    <ContentWrapper>
      <Arrow
        isLeft
        onClick={() => {}}
      />
      <Content>
        Content here
      </Content>
      <Arrow
        isLeft={false}
        onClick={() => {}}
      />
    </ContentWrapper>
  ))
  .add('should show right arrow', () => (
    <Arrow
      isLeft={false}
    />
  ));
