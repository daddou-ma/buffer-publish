import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
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
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('default', () => (
    <PostLists
      postLists={postLists}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
    />
  ));
