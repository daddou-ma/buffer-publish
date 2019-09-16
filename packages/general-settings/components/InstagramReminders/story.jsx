import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import InstagramReminders from './index';


storiesOf('InstagramReminders', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <InstagramReminders />
  ))
  .add('if user is contributor only', () => (
    <InstagramReminders
      isManager={false}
    />
  ));
