import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import DeleteCampaignModal from './index';

const campaign = {
  name: 'Awareness Week',
  color: 'blue',
  id: '1',
};

storiesOf('Campaigns|DeleteCampaignModal', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <DeleteCampaignModal
      translations={translations.campaigns.deleteCampaignModal}
      onDeleteCampaign={action('delete campaign')}
      onCloseModal={action('close modal')}
      campaign={campaign}
    />
  ));
