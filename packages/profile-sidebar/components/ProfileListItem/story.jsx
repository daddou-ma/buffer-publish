import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import ProfileListItem from './index';

const avatarUrl =
  'https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png';

storiesOf('ProfileListItem', module)
  .addDecorator(withA11y)
  .add('should display twitter profile list item', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      onClick={action('profile click')}
    />
  ))
  .add('should display number of notifications', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      notifications={1}
      onClick={action('profile click')}
    />
  ))
  .add('should display locked', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      notifications={1}
      locked
      onClick={action('profile click')}
    />
  ))
  .add('should display selected', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      notifications={1}
      selected
      onClick={action('profile click')}
    />
  ))
  .add('should display location in hover state', () => (
    <ProfileListItem
      avatarUrl={avatarUrl}
      type={'twitter'}
      handle={'joelgascoigne'}
      location={'New York'}
      notifications={1}
      onClick={action('profile click')}
    />
  ));
