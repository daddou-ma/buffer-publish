import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import UpdateAttachmentContent from './index';

const linkAttachment = {
  title: 'What is a Product Designer?',
  description:
    'A brief history at how history and markets influence design titles',
  url:
    'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
  thumbnailUrl:
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
};

storiesOf('Cards|Updates/AttachmentContent', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <UpdateAttachmentContent linkAttachment={linkAttachment} />
  ));
