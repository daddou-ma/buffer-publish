import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import { action } from '@storybook/addon-actions';
import MissingAccessPage from './index';

storiesOf('MissingAccessPage', module)
  .addDecorator(withA11y)
  .add('missing access page as admin', () => (
    <MissingAccessPage
      accessType="admin"
      orgName="Buffer"
      orgNameWithAccess={null}
      ownerEmail="email@test.com"
      switchOrganization={action('switchOrganization')}
    />
  ))
  .add('missing access page as nonAdmin', () => (
    <MissingAccessPage
      accessType="nonAdmin"
      orgName="Buffer"
      orgNameWithAccess={null}
      ownerEmail="email@test.com"
      switchOrganization={action('switchOrganization')}
    />
  ))
  .add('missing access page as nonAdminWithOrgAccess', () => (
    <MissingAccessPage
      accessType="nonAdminWithOrgAccess"
      orgName="Buffer"
      orgNameWithAccess="Alpenglow"
      ownerEmail="email@test.com"
      switchOrganization={action('switchOrganization')}
    />
  ))
  .add('missing access page as adminWithOrgAccess', () => (
    <MissingAccessPage
      accessType="adminWithOrgAccess"
      orgName="Buffer"
      orgNameWithAccess="Alpenglow"
      ownerEmail="email@test.com"
      switchOrganization={action('switchOrganization')}
    />
  ));
