import React from 'react';
import { storiesOf } from '@storybook/react';
import { Text } from '@bufferapp/components';
import { withA11y } from '@storybook/addon-a11y';
import RetweetPanel from './index';

const retweetComment =
  'What is a Product Designer? An awesome story by @jgadapee over on Medium! http://buff.ly/1LTbUqv';

const retweetCommentLinks = [
  {
    rawString: 'http://buff.ly/1LTbUqv',
    displayString: 'http://buff.ly/1LTbUqv',
    url:
      'https://austinstartups.com/what-is-a-product-designer-who-cares-eb38fc7afa7b#.i3r34a75x',
    indices: [74, 96],
  },
];
const retweetProfile = {
  avatarUrl:
    'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png',
  handle: '@joelgascoigne',
  name: 'Joel Gascoigne',
};

const children = <Text color="black" size="mini">Rubber baby buggy bumpers.</Text>;

storiesOf('Cards|Shared Elements/RetweetPanel', module)
  .addDecorator(withA11y)
  .add('with retweet comment', () => (
    <RetweetPanel
      retweetComment={retweetComment}
      retweetCommentLinks={retweetCommentLinks}
      retweetProfile={retweetProfile}
    >
      {children}
    </RetweetPanel>
  ))
  .add('no retweet comment', () => (
    <RetweetPanel
      retweetCommentLinks={retweetCommentLinks}
      retweetProfile={retweetProfile}
    >
      {children}
    </RetweetPanel>
  ))
  .add('basic retweet', () => (
    <RetweetPanel
      retweetComment={retweetComment}
      retweetCommentLinks={retweetCommentLinks}
      basic
      retweetProfile={retweetProfile}
    >
      {children}
    </RetweetPanel>
  ));
