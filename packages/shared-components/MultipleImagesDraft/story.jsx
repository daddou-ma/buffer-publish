import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import MultipleImagesDraft from './index';

const links = [
  {
    displayString: 'http://buff.ly/1LTbUqv',
    indices: [74, 96],
    rawString: 'http://buff.ly/1LTbUqv',
    url:
      'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
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

const imageUrls = [
  'http://via.placeholder.com/400x400',
  'http://via.placeholder.com/400x400',
  'http://via.placeholder.com/400x400',
  'http://via.placeholder.com/400x400',
];

storiesOf('Cards|Drafts/MultipleImagesDraft', module)
  .addDecorator(withA11y)
  .add('queued multiple image post', () => (
    <MultipleImagesDraft
      hasPermission
      draftDetails={draftDetails}
      links={links}
      imageUrls={imageUrls}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      sent={false}
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      currentImage={0}
      view="drafts"
    />
  ))
  .add('sent multiple image post', () => (
    <MultipleImagesDraft
      manager
      hasPermission
      draftDetails={draftDetails}
      links={links}
      imageUrls={imageUrls}
      onDeleteConfirmClick={action('delete-confirm-click')}
      onEditClick={action('edit-click')}
      onShareNowClick={action('share-now-click')}
      text={text}
      sent
      onImageClick={action('image-click')}
      onImageClickNext={action('image-click-next')}
      onImageClickPrev={action('image-click-prev')}
      onImageClose={action('image-close')}
      currentImage={0}
      view="approval"
    />
  ));
