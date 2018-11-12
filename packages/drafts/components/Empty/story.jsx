import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import Empty from './index';

storiesOf('Empty drafts', module)
  .addDecorator(checkA11y)
  .add('should display empty state for drafts', () => (
    <Empty
      isManager
      view={'drafts'}
    />
  ))
  .add('should display empty state for approval', () => (
    <Empty
      isManager
      view={'awaitingApproval'}
    />
  ));
