import React from 'react';
import { Provider } from 'react-redux';
import {
  storiesOf,
  action,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import QueueItems from './index';
import {
  postLists,
  postListsNoHeaders,
} from './postData';

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

storiesOf('QueueItems', module)
  .addDecorator(checkA11y)
  .addDecorator(getStory =>
    <Provider store={store}>
      {getStory()}
    </Provider>,
  )
  .add('default queue', () => (
    <QueueItems
      items={postLists}
      onRequeueClick={action('onCancelConfirmClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onDropPost={action('onDropPost')}
      onSwapPosts={action('onSwapPosts')}
      draggable={false}
    />
  ))
  .add('no headers type drafts', () => (
    <QueueItems
      items={postListsNoHeaders}
      onRequeueClick={action('onCancelConfirmClick')}
      onDeleteConfirmClick={action('onDeleteConfirmClick')}
      onEditClick={action('onEditClick')}
      onShareNowClick={action('onShareNowClick')}
      onImageClick={action('onImageClick')}
      onImageClickNext={action('onImageClickNext')}
      onImageClickPrev={action('onImageClickPrev')}
      onImageClose={action('onImageClose')}
      onDropPost={action('onDropPost')}
      onSwapPosts={action('onSwapPosts')}
      draggable={false}
      type="drafts"
    />
  ));
