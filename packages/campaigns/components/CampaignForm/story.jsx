import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import CampaignForm from './index';

const campaignDetails = {
  id: '123',
  name: '#SaveOurSeasWeek',
  color: '#00C8CF',
};

storiesOf('Campaigns|CampaignForm', module)
  .addDecorator(withA11y)
  .add('default create', () => (
    <CampaignForm
      translations={translations.campaigns.campaignForm}
      onCreateOrUpdateCampaignClick={action('saveCampaign')}
      onCancelClick={action('cancel')}
    />
  ))
  .add('edit form', () => (
    <CampaignForm
      translations={translations.campaigns.campaignForm}
      onCreateOrUpdateCampaignClick={action('saveCampaign')}
      onCancelClick={action('cancel')}
      inEditMode
      campaignDetails={campaignDetails}
    />
  ));
