import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import MultipleImagesPost from './index';
import { Provider } from 'react-redux';

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

const links = [
  {
    displayString: 'http://buff.ly/1LTbUqv',
    indices: [74, 96],
    rawString: 'http://buff.ly/1LTbUqv',
    url:
      'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  },
];
const multilineLinks = [
  {
    ...links[0],
    indices: [78, 100],
  },
];

const text =
  'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';
const multilineText =
  'What is a Product Designer? \n\nAn awesome story by @jgadapee over on Medium! \n\nhttp://buff.ly/1LTbUqv';

const postDetails = {
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsSent = {
  postAction: 'This post was sent at 9:21 (GMT)',
};

const postDetailsError = {
  ...postDetails,
  error: 'Sharing failed. Try again?',
};

const imageUrls = [
  'http://via.placeholder.com/400x400',
  'http://via.placeholder.com/400x400',
  'http://via.placeholder.com/400x400',
  'http://via.placeholder.com/400x400',
];

storiesOf('Cards|Posts/MultipleImagesPost', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('queued multiple image post', () => (
    <MultipleImagesPost
      postDetails={postDetails}
      links={links}
      imageUrls={imageUrls}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      currentImage={0}
      type="multipleImage"
    />
  ))
  .add('queued multiple image post with multi-line text', () => (
    <MultipleImagesPost
      postDetails={postDetails}
      links={multilineLinks}
      imageUrls={imageUrls}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={multilineText}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      currentImage={0}
      type="multipleImage"
    />
  ))
  .add('sent multiple image post', () => (
    <MultipleImagesPost
      postDetails={postDetailsSent}
      links={links}
      imageUrls={imageUrls}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      isSent
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      currentImage={0}
      type="multipleImage"
    />
  ))
  .add('error', () => (
    <MultipleImagesPost
      postDetails={postDetailsError}
      links={links}
      imageUrls={imageUrls}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      isSent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      currentImage={0}
      type="multipleImage"
    />
  ));
