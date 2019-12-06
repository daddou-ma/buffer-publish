import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import LinkShortener from './index';

const linkList = [{ domain: 'option1', name: 'option2', selected: true }];
const linkListMulti = [
  { domain: 'option1', name: 'option2', selected: true },
  { domain: 'option2', name: 'option2', selected: false },
];

const features = { isFreeUser: () => true };
const featuresNotFree = { isFreeUser: () => false };

storiesOf('LinkShortener', module)
  .addDecorator(withA11y)
  .add('default', () => <LinkShortener features={features} />)
  .add('Show single shortener option', () => (
    <LinkShortener
      features={features}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkList}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show single shortener option with Connect Bitly button', () => (
    <LinkShortener
      features={featuresNotFree}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkList}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show multiple shortener options', () => (
    <LinkShortener
      features={features}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkListMulti}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show multiple shortener options with Connect Bitly button', () => (
    <LinkShortener
      features={featuresNotFree}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkListMulti}
      onOptionSelect={() => {}}
      loading={false}
    />
  ))
  .add('Show pinterest message', () => (
    <LinkShortener features={features} profileService="pinterest" />
  ))
  .add('Options disabled if isContributor', () => (
    <LinkShortener
      features={features}
      onConnectBitlyURLClick={() => {}}
      onDisconnectBitlyURLClick={() => {}}
      linkShorteners={linkList}
      onOptionSelect={() => {}}
      loading={false}
      isManager={false}
    />
  ));
