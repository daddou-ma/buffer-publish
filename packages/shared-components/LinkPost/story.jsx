import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import LinkPost from './index';
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
    rawString: 'http://buff.ly/1LTbUqv',
    displayString: 'http://buff.ly/1LTbUqv',
    url:
      'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
    indices: [74, 96],
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

const linkAttachment = {
  title: 'What is a Product Designer?',
  description:
    'A brief history at how history and markets influence design titles',
  url:
    'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  thumbnailUrl:
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
};

const postDetails = {
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsSent = {
  postAction: 'This post was sent at 9:21 (GMT)',
};

const postDetailsError = {
  ...postDetails,
  error: 'Woops something went wrong. Try again?',
};

const squareImage = 'http://via.placeholder.com/400x400';
const tallImage = 'http://via.placeholder.com/400x900';
const wideImage = 'http://via.placeholder.com/900x400';

storiesOf('Cards|Posts/LinkPost', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('queued link post', () => (
    <LinkPost
      links={links}
      linkAttachment={linkAttachment}
      postDetails={postDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      type="link"
    />
  ))
  .add('queued link post with multiline text', () => (
    <LinkPost
      links={multilineLinks}
      linkAttachment={linkAttachment}
      postDetails={postDetails}
      text={multilineText}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      type="link"
    />
  ))
  .add('sent', () => (
    <LinkPost
      links={links}
      linkAttachment={linkAttachment}
      postDetails={postDetailsSent}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent
      type="link"
    />
  ))
  .add('square image', () => (
    <LinkPost
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: squareImage }}
      postDetails={postDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      type="link"
    />
  ))
  .add('tall image', () => (
    <LinkPost
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: tallImage }}
      postDetails={postDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      type="link"
    />
  ))
  .add('wide image', () => (
    <LinkPost
      links={links}
      linkAttachment={{ ...linkAttachment, thumbnailUrl: wideImage }}
      postDetails={postDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      type="link"
    />
  ))
  .add('error', () => (
    <LinkPost
      links={links}
      linkAttachment={linkAttachment}
      postDetails={postDetailsError}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
      type="link"
    />
  ));
