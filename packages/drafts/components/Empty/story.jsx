import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import Empty from './index';

storiesOf('Empty drafts', module)
  .addDecorator(withA11y)
  .add('should display empty state for drafts when manager', () => (
    <Empty isManager view={'drafts'} />
  ))
  .add('should display empty state for drafts when contributor', () => (
    <Empty isManager={false} view={'drafts'} />
  ))
  .add('should display empty state for approval when manager', () => (
    <Empty isManager view={'awaitingApproval'} />
  ))
  .add('should display empty state for approval when contributor', () => (
    <Empty isManager={false} view={'awaitingApproval'} />
  ));
