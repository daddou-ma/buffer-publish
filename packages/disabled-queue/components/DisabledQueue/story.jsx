import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { Provider } from 'react-redux';
import DisabledQueue from './index';

import createStore from '@bufferapp/publish-store';

// const storeFake = state => ({
//   default: () => {},
//   subscribe: () => {},
//   dispatch: () => {},
//   getState: () => ({ ...state }),
// });

// const store = storeFake({
//   productFeatures: {
//     planName: 'free',
//     features: {},
//   },
// });

const store = createStore();

storiesOf('DisabledQueue', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      {getStory()}
    </Provider>,
  )
  .add('should render', () => (
    <DisabledQueue />
  ));
