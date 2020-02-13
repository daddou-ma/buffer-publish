import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import UserDetails from './index';

storiesOf('Cards|Shared Elements/UserDetails', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <UserDetails
      name="Joel Gascoigne"
      handle="@joelgascoigne"
      avatarUrl="https://buffer-uploads.s3.amazonaws.com/503a5c8ffc99f72a7f00002e/f49c2ff693f1c307af5e1b3d84e581ca.png"
    />
  ));
