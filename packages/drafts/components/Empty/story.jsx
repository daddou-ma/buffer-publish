import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import Empty from './index';

storiesOf('Empty drafts', module)
  .addDecorator(checkA11y)
  .add('should display empty state for drafts when manager', () => (
    <Empty
      isManager
      view={'drafts'}
    />
  ))
  .add('should display empty state for drafts when contributor', () => (
    <Empty
      isManager={false}
      view={'drafts'}
    />
  ))
  .add('should display empty state for approval when manager', () => (
    <Empty
      isManager
      view={'awaitingApproval'}
    />
  ))
  .add('should display empty state for approval when contributor', () => (
    <Empty
      isManager={false}
      view={'awaitingApproval'}
    />
  ));
