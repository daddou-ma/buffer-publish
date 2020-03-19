import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';
import campaignDetails from '../story';

import Header from './index';

storiesOf('Campaigns|ViewCampaignHeader', module)
  .addDecorator(withA11y)
  .add('Campaign view header with posts', () => (
    <Header
      campaignDetails={campaignDetails}
      translations={translations.campaigns.viewCampaign}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      hasPosts
      hideAnalyzeReport
    />
  ))
  .add('Campaign view header without posts', () => (
    <Header
      campaignDetails={campaignDetails}
      translations={translations.campaigns.viewCampaign}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      hasPosts={false}
      hideAnalyzeReport
    />
  ))
  .add('Campaign view header as team member', () => (
    <Header
      campaignDetails={campaignDetails}
      translations={translations.campaigns.viewCampaign}
      onCreatePostClick={action('create post')}
      onDeleteCampaignClick={action('delete campaign')}
      onEditCampaignClick={action('edit campaign')}
      goToAnalyzeReport={action('go to analyze report')}
      hasPosts={false}
      hideAnalyzeReport={false}
    />
  ));
