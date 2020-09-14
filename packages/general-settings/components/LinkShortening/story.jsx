import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import LinkShortener from './index';

const linkList = [{ domain: 'option1', name: 'option2', selected: true }];
const linkListMulti = [
  { domain: 'option1', name: 'option2', selected: true },
  { domain: 'option2', name: 'option2', selected: false },
];

storiesOf('LinkShortener', module)
  .addDecorator(withA11y)
  .add('default', () => <LinkShortener hasBitlyFeature={false} />)
  .add('Show single shortener option', () => (
    <LinkShortener
      hasBitlyFeature={false}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkList}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show single shortener option with Connect Bitly button', () => (
    <LinkShortener
      hasBitlyFeature
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkList}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show multiple shortener options', () => (
    <LinkShortener
      hasBitlyFeature={false}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkListMulti}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show multiple shortener options with Connect Bitly button', () => (
    <LinkShortener
      hasBitlyFeature
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkListMulti}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show pinterest message', () => (
    <LinkShortener hasBitlyFeature={false} profileService="pinterest" />
  ))
  .add('Options disabled if isContributor', () => (
    <LinkShortener
      hasBitlyFeature={false}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkList}
      onOptionSelect={() => {}}
      loading={false}
      isManager={false}
    />
  ));
