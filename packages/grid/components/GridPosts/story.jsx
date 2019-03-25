import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import GridPosts from './index';

const translations = {
  loggedIn: 'Logged In...',
  loggedOut: 'Logged Out...',
};

storiesOf('GridPosts', module)
  .addDecorator(checkA11y)
  .add('should show user is logged in', () => (
    <GridPosts
      translations={translations}
      loggedIn
    />
  ))
  .add('should show user is not logged in', () => (
    <GridPosts
      translations={translations}
    />
  ));
