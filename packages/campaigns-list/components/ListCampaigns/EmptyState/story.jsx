import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import EmptyState from './index';

storiesOf('Campaigns|EmptyState', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <EmptyState
      onOpenCreateCampaignClick={action('createCampaign')}
      showCampaignActions
    />
  ))
  .add('team member on pro', () => (
    <EmptyState
      onOpenCreateCampaignClick={action('createCampaign')}
      showCampaignActions={false}
      shouldDisplayLockedCopy
      ownerEmail="ana@buffer.com"
    />
  ))
  .add('non-admin', () => (
    <EmptyState
      onOpenCreateCampaignClick={action('createCampaign')}
      showCampaignActions={false}
      ownerEmail="ana@buffer.com"
    />
  ));
