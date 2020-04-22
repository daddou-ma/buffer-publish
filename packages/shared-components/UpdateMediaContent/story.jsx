import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import UpdateMediaContent from './index';

const imageSrc =
  'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg';
const imageUrls = [imageSrc, imageSrc, imageSrc, imageSrc];

storiesOf('Cards|Updates/MediaContent', module)
  .addDecorator(withA11y)
  .add('image', () => (
    <UpdateMediaContent
      onImageClick={action('on-image-click')}
      onImageClickPrev={action('on-image-prev-click')}
      onImageClickNext={action('on-image-next-click')}
      onImageClose={action('on-image-close-click')}
      tag="Image"
      type="image"
      imageSrc={imageSrc}
    />
  ))
  .add('video', () => (
    <UpdateMediaContent
      onImageClick={action('on-image-click')}
      onImageClickPrev={action('on-image-prev-click')}
      onImageClickNext={action('on-image-next-click')}
      onImageClose={action('on-image-close-click')}
      tag="Video"
      type="video"
      imageSrc={imageSrc}
    />
  ))
  .add('multiple image', () => (
    <UpdateMediaContent
      onImageClick={action('on-image-click')}
      onImageClickPrev={action('on-image-prev-click')}
      onImageClickNext={action('on-image-next-click')}
      onImageClose={action('on-image-close-click')}
      type="multipleImage"
      imageUrls={imageUrls}
    />
  ));
