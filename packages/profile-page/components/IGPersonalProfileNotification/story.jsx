import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import IGPersonalProfileNotification from './index';

storiesOf('IGPersonalProfileNotification', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <IGPersonalProfileNotification onDirectSchedulingClick={() => {}} />
  ));
