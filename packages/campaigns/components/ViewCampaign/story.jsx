import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import ViewCampaign from './index';

const campaignDetails = {
  name: '#SaveOurSeasWeek',
  color: '#9C2BFF',
  dateRange: 'Jan 5-18, 2020',
  scheduled: '5 Scheduled',
  sent: '2 Sent',
  lastUpdated: 'Last updated 3 hours ago',
};

storiesOf('Campaigns|ViewCampaign', module)
  .addDecorator(withA11y)
  .add('Campaign view with posts', () => (
    <ViewCampaign
      campaignDetails={campaignDetails}
      translations={translations.campaigns}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      hasPosts
      isUsingPublishAsTeamMember
    />
  ))
  .add('Campaign view without posts', () => (
    <ViewCampaign
      campaignDetails={campaignDetails}
      translations={translations.campaigns}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      hasPosts={false}
      isUsingPublishAsTeamMember
    />
  ));

export default campaignDetails;
