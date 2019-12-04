import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import InstagramReminders from './index';

storiesOf('InstagramReminders', module)
  .addDecorator(withA11y)
  .add('default', () => <InstagramReminders />)
  .add('if user is contributor only', () => (
    <InstagramReminders isManager={false} />
  ));
