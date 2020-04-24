import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import '@bufferapp/publish-web/components/i18n';

import CampaignForm from './index';

const campaignDetails = {
  id: '123',
  name: '#SaveOurSeasWeek',
  color: '#00C8CF',
  globalOrganizationId: '123456',
};

storiesOf('Campaigns|CampaignForm', module)
  .addDecorator(withA11y)
  .add('create form', () => (
    <CampaignForm
      onCreateOrUpdateCampaignClick={action('saveCampaign')}
      onCancelClick={action('cancel')}
    />
  ))
  .add('edit form', () => (
    <CampaignForm
      campaignId={campaignDetails.id}
      onCreateOrUpdateCampaignClick={action('saveCampaign')}
      onCancelClick={action('cancel')}
      editMode
      campaign={campaignDetails}
      fetchCampaign={action('fetch campaign')}
    />
  ));
