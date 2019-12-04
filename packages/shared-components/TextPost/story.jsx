import React from 'react';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import TextPost from './index';

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

const retweetComment = 'Awesome book news here: http://buff.ly/2oZYTnY';

const retweetCommentLinks = [
  {
    rawString: 'http://buff.ly/2oZYTnY',
    displayString: 'http://buff.ly/2oZYTnY',
    url: 'https://www.theguardian.com/books',
    indices: [24, 46],
  },
];

const postDetails = {
  isRetweet: false,
  postAction: 'This post will be sent at 9:21 (GMT)',
};

const postDetailsSent = {
  isRetweet: false,
  postAction: 'This post was sent at 9:21 (GMT)',
};

const isARetweetPostDetails = {
  ...postDetails,
  isRetweet: true,
};

const postDetailsError = {
  ...postDetails,
  error: 'Woops something went wrong. Try again?',
};

const retweetProfile = {
  name: 'Joel Gascoigne',
  handle: '@joelgascoigne',
  avatarUrl:
    'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png',
};

storiesOf('Cards|Posts/TextPost', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <Provider store={store}>{getStory()}</Provider>)
  .add('queued text post', () => (
    <TextPost
      links={links}
      postDetails={postDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
    />
  ))
  .add('queued text post with multi-line text', () => (
    <TextPost
      links={multilineLinks}
      postDetails={postDetails}
      text={multilineText}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
    />
  ))
  .add('sent', () => (
    <TextPost
      links={links}
      postDetails={postDetailsSent}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent
    />
  ))
  .add('retweet', () => (
    <TextPost
      links={links}
      postDetails={isARetweetPostDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      retweetProfile={retweetProfile}
      isSent={false}
    />
  ))
  .add('retweet with comment', () => (
    <TextPost
      links={links}
      postDetails={isARetweetPostDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      retweetProfile={retweetProfile}
      retweetComment={retweetComment}
      retweetCommentLinks={retweetCommentLinks}
      isSent={false}
    />
  ))
  .add('error', () => (
    <TextPost
      links={links}
      postDetails={postDetailsError}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      isSent={false}
    />
  ));
