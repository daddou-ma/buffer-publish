import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import ViewCampaign from './index';

console.log('translations', translations)

storiesOf('Campaigns|ViewCampaign', module)
  .addDecorator(withA11y)
  .add('Campaign view with posts', () => (
    <ViewCampaign
      campaignDetails={{
        name: '#SaveOurSeasWeek',
        color: 'red',
        dateRange: 'Jan 5-18, 2020',
        scheduled: '5 Scheduled',
        sent: '2 Sent',
        lastUpdated: 'Last updated 3 hours ago',
      }}
      translations={translations.campaigns}
      hasPosts
    />
  ))
  .add('Campaign view without posts', () => (
    <ViewCampaign
      campaignDetails={{
        name: '#SaveOurSeasWeek',
        color: 'red',
        dateRange: 'Jan 5-18, 2020',
        scheduled: '5 Scheduled',
        sent: '2 Sent',
        lastUpdated: 'Last updated 3 hours ago',
      }}
      translations={translations.campaigns}
      hasPosts={false}
    />
  ));
  