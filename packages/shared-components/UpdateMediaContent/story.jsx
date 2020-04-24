import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import UpdateMediaContent from './index';

const imageSrc =
  'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg';
const imageUrls = [imageSrc, imageSrc, imageSrc, imageSrc];

storiesOf('Cards|Updates/MediaContent', module)
  .addDecorator(withA11y)
  .add('image', () => (
    <UpdateMediaContent tag="Image" type="image" imageSrc={imageSrc} />
  ))
  .add('video', () => (
    <UpdateMediaContent tag="Video" type="video" imageSrc={imageSrc} />
  ))
  .add('multiple image', () => (
    <UpdateMediaContent type="multipleImage" imageUrls={imageUrls} />
  ));
