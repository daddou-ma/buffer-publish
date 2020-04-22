import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import UpdateContent from './index';

const post = {
  text:
    'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv',
  links: [
    {
      rawString: 'http://buff.ly/1LTbUqv',
      displayString: 'http://buff.ly/1LTbUqv',
      url:
        'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
      indices: [74, 96],
    },
  ],
};

const link = {
  type: 'link',
  linkAttachment: {
    title: 'What is a Product Designer?',
    description:
      'A brief history at how history and markets influence design titles',
    url:
      'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
    thumbnailUrl:
      'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
  },
};

const image = {
  type: 'image',
  imageSrc:
    'https://cdn-images-1.medium.com/max/2000/1*1Kua7bNJfvLlTxWqgxVKfw.jpeg',
};

storiesOf('Cards|Updates/Content', module)
  .addDecorator(withA11y)
  .add('text', () => <UpdateContent {...post} />)
  .add('with attachment', () => <UpdateContent {...post} {...link} />)
  .add('with media', () => <UpdateContent {...post} {...image} />);
