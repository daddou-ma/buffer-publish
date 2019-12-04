import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import ProfileSearch from './index';
import { profiles } from '../../mockData/profiles';

const lotsOfProfiles = () =>
  [...Array(10)].reduce(p => [...p, ...profiles], []);

storiesOf('ProfileSearch', module)
  .addDecorator(withA11y)
  .add('should display search popup', () => (
    <ProfileSearch
      profiles={lotsOfProfiles()}
      isSearchPopupVisible
      handleSubmit={action('handleSubmit')}
    />
  ))
  .add('should not display search popup', () => (
    <ProfileSearch
      profiles={lotsOfProfiles()}
      isSearchPopupVisible={false}
      handleSubmit={action('handleSubmit')}
    />
  ));
