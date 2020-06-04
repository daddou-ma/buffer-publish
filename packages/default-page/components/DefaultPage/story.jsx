import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import DefaultPage from './index';

storiesOf('DefaultPage', module)
  .addDecorator(withA11y)
  .add('Empty state, for admin user', () => (
    <DefaultPage showPermissionsEmptyPage={false} />
  ))
  .add('Permissions empty state, for non admin user', () => (
    <DefaultPage
      showPermissionsEmptyPage
      ownerEmail="ana@buffer.com"
      orgName="Cool Org"
    />
  ));
