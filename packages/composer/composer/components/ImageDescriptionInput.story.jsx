import React from 'react';
import { storiesOf } from '@storybook/react';
import ImageDescriptionInput from './ImageDescriptionInput';

const media = {
  altText: null,
  height: 1844,
  mediaType: 'IMAGE',
  url:
    'https://buffer-media-uploads-dev.s3.amazonaws.com/5b7afa96a6aa8518008b4567/5b997cfafc6da620017b23c6/bd34461e59a41bea292946d8e383d7bc.original.jpg',
  width: 2448,
};

const draftId = 'twitter';

storiesOf('ImageDescriptionInput').add('should render correctly', () => (
  <div>
    <ImageDescriptionInput draftId={draftId} mediaAttachment={media} />
  </div>
));
