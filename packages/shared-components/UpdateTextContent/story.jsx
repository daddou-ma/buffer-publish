import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import UpdateTextContent from './index';

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

storiesOf('Cards|Updates/TextContent', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <UpdateTextContent links={links} text={text} basic={false} />
  ))
  .add('basic', () => <UpdateTextContent links={links} text={text} basic />);
