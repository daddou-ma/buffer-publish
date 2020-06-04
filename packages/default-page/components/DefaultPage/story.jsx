import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import DefaultPage from './index';

storiesOf('DefaultPage', module)
  .addDecorator(withA11y)
  .add('admin user', () => <DefaultPage isAdmin />)
  .add('non admin user', () => (
    <DefaultPage
      isAdmin={false}
      ownerEmail="ana@buffer.com"
      orgName="Cool Org"
    />
  ));
