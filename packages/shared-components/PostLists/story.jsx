import React from 'react';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { Provider } from 'react-redux';
import PostLists from './index';
import postLists from './postListData';

const storeFake = state => ({
  default: () => {},
  subscribe: () => {},
  dispatch: () => {},
  getState: () => ({ ...state }),
});

const store = storeFake({
  productFeatures: {
    planName: 'free',
    features: {},
  },
});

storiesOf('PostLists', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      {getStory()}
    </Provider>,
  )
  .add('default', () => (
    <PostLists
      postLists={postLists}
      onCancelConfirmClick={action('onCancelConfirmClick')}
      onDeleteClick={action('onDeleteClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ));
