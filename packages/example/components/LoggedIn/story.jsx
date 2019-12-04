import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import LoggedIn from './index';

const translations = {
  loggedIn: 'Logged In...',
  loggedOut: 'Logged Out...',
};

storiesOf('LoggedIn', module)
  .addDecorator(withA11y)
  .add('should show user is logged in', () => (
    <LoggedIn translations={translations} loggedIn />
  ))
  .add('should show user is not logged in', () => (
    <LoggedIn translations={translations} />
  ));
