import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import IGPersonalProfileNotification from './index';

storiesOf('IGPersonalProfileNotification', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <IGPersonalProfileNotification
      profileId="123"
      tabId="queue"
      onDirectSchedulingClick={() => {}}
    />
  ));
