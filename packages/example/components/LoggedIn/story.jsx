import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import LoggedIn from './index';

const translations = {
  loggedIn: 'Logged In...',
  loggedOut: 'Logged Out...',
};

storiesOf('LoggedIn', module)
  .addDecorator(checkA11y)
  .add('should show user is logged in', () => (
    <LoggedIn
      translations={translations}
      loggedIn
    />
  ))
  .add('should show user is not logged in', () => (
    <LoggedIn
      translations={translations}
    />
  ));
