import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import ImageDraft from './index';

const links = [
  {
    rawString: 'http://buff.ly/1LTbUqv',
    displayString: 'http://buff.ly/1LTbUqv',
    url:
      'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
    indices: [74, 96],
  },
];

const text =
  'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';

const draftDetails = {
  avatarUrl:
    'https://buffer-uploads.s3.amazonaws.com/510521020a19000b6a00001e/a476fed03b1de4e06563d6063d7d3ee0.jpg',
  createdAt: 'on March 2nd at 12:45pm (GMT)',
  email: 'ash@buffer.com',
  isRetweet: false,
  postAction: 'This post will be added to the queue',
  creatorName: 'Ash',
  via: 'api',
};

const isARetweetDraftDetails = {
  ...draftDetails,
  isRetweet: true,
};

const retweetProfile = {
  name: 'Joel Gascoigne',
  handle: '@joelgascoigne',
  avatarUrl:
    'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png',
};

const imageSrc =
  'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg';
const squareImage = 'http://via.placeholder.com/400x400';
const tallImage = 'http://via.placeholder.com/400x900';
const wideImage = 'http://via.placeholder.com/900x400';

storiesOf('Cards|Drafts/ImageDraft', module)
  .addDecorator(withA11y)
  .add('drafts image draft', () => (
    <ImageDraft
      hasPermission
      isScheduled
      manager
      imageSrc={imageSrc}
      links={links}
      draftDetails={draftDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
      view="drafts"
    />
  ))
  .add('approval image draft', () => (
    <ImageDraft
      hasPermission
      manager
      imageSrc={imageSrc}
      links={links}
      draftDetails={draftDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
      view="approval"
    />
  ))
  .add('square image', () => (
    <ImageDraft
      hasPermission
      imageSrc={squareImage}
      links={links}
      draftDetails={draftDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
      view="drafts"
    />
  ))
  .add('tall image', () => (
    <ImageDraft
      hasPermission
      imageSrc={tallImage}
      links={links}
      draftDetails={draftDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
      view="drafts"
    />
  ))
  .add('wide image', () => (
    <ImageDraft
      hasPermission
      imageSrc={wideImage}
      links={links}
      draftDetails={draftDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
      view="drafts"
    />
  ))
  .add('retweet', () => (
    <ImageDraft
      hasPermission
      imageSrc={imageSrc}
      links={links}
      draftDetails={isARetweetDraftDetails}
      text={text}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      retweetProfile={retweetProfile}
      sent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
      view="drafts"
    />
  ))
  .add('tag', () => (
    <ImageDraft
      hasPermission
      imageSrc={imageSrc}
      links={links}
      draftDetails={draftDetails}
      text={text}
      tag="GIF"
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      sent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      isLightboxOpen={false}
      view="drafts"
    />
  ));
