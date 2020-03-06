import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import List from './index';

const campaigns = [
  {
    name: '#SaveOurSeasWeek',
    color: '#9C2BFF',
    dateRange: 'Jan 5-18, 2020',
    scheduled: '7 Scheduled',
    sent: '1 Sent',
    lastUpdated: 'Last updated 3 hours ago',
    campaignId: '1',
    hasPosts: true
  },
  {
    name: 'A Longer Campaign Name',
    color: '#9C2BFF',
    dateRange: 'Feb 15-28, 2020',
    scheduled: '8 Scheduled',
    sent: '0 Sent',
    lastUpdated: 'Last updated 2 days ago',
    campaignId: '2',
    hasPosts: false
  },
  {
    name: 'Hello World',
    color: '#9C2BFF',
    dateRange: 'March 23-April 4, 2020',
    scheduled: '11 Scheduled',
    sent: '25 Sent',
    lastUpdated: 'Last updated yesterday',
    campaignId: '3',
    hasPosts: true
  },
];

storiesOf('Campaigns|ListCampaigns', module)
  .addDecorator(withA11y)
  .add('List of campaigns', () => (
    <List
      campaigns={campaigns}
      translations={translations.campaigns.viewCampaign}
      onViewCampaignClick={action('view campaign')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      isUsingPublishAsTeamMember
    />
  ));
