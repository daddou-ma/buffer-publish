import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import campaignDetails from '../story';
import Header from './index';

const campaignWithoutDaterange = {
  ...campaignDetails,
  dateRange: null,
  sent: 0,
  scheduled: 0,
};

storiesOf('Campaigns|ViewCampaignHeader', module)
  .addDecorator(withA11y)
  .add('Campaign view header with posts', () => (
    <Header
      campaignDetails={campaignDetails}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      hideAnalyzeReport={false}
      showCampaignActions={false}
    />
  ))
  .add('Campaign view header without a date range', () => (
    <Header
      campaignDetails={campaignWithoutDaterange}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      hideAnalyzeReport={false}
      showCampaignActions={false}
    />
  ))
  .add('Campaign view header as team member', () => (
    <Header
      campaignDetails={campaignDetails}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      hideAnalyzeReport
      showCampaignActions={false}
    />
  ))
  .add('Campaign loading', () => (
    <Header
      campaignDetails={campaignDetails}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      hideAnalyzeReport={false}
      showCampaignActions={false}
      isLoading
    />
  ));
