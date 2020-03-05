import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import CampaignForm from './index';

storiesOf('Campaigns|CampaignForm', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <CampaignForm
      translations={translations.campaigns.createCampaign}
      onSaveCampaignClick={action('saveCampaign')}
      onCancelClick={action('cancel')}
    />
  ));
