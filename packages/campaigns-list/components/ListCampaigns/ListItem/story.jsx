import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import { MemoryRouter } from 'react-router-dom';
import '@bufferapp/publish-web/components/i18n';

import ListItem from './index';

const campaign = {
  name: '#SaveOurSeasWeek',
  color: '#9C2BFF',
  dateRange: 'Oct 19-39, 2020',
  scheduled: 8,
  sent: 0,
  lastUpdated: 'Last updated 12 days ago',
  id: '2',
};

const campaignWithoutPosts = {
  name: 'Awareness Day',
  color: '#9C2BFF',
  dateRange: null,
  scheduled: 0,
  sent: 0,
  lastUpdated: 'Last updated yesterday',
  id: '3',
};

storiesOf('Campaigns|ListItem', module)
  .addDecorator(withA11y)
  .addDecorator(getStory => <MemoryRouter>{getStory()}</MemoryRouter>)
  .add('Owner view of campaign list item', () => (
    <ListItem
      campaign={campaign}
      isEvenItem
      onViewCampaignClick={action('view campaign')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      showCampaignActions
    />
  ))
  .add('Admin view of campaign list item', () => (
    <ListItem
      campaign={campaign}
      isEvenItem
      onViewCampaignClick={action('view campaign')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      showCampaignActions
      hideAnalyzeReport
    />
  ))
  .add('Team member view of campaign list item', () => (
    <ListItem
      campaign={campaign}
      isEvenItem
      onViewCampaignClick={action('view campaign')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      showCampaignActions={false}
    />
  ))
  .add('Campaign list item with gray background', () => (
    <ListItem
      campaign={campaign}
      isEvenItem={false}
      onViewCampaignClick={action('view campaign')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      showCampaignActions
    />
  ))
  .add('Campaign list item without any posts', () => (
    <ListItem
      campaign={campaignWithoutPosts}
      isEvenItem={false}
      onViewCampaignClick={action('view campaign')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      showCampaignActions
    />
  ))
  .add('Campaign list item skeleton', () => (
    <ListItem
      campaign={campaign}
      isEvenItem={false}
      onViewCampaignClick={action('view campaign')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      showCampaignActions
      displaySkeleton
    />
  ));
