import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import translations from '@bufferapp/publish-i18n/translations/en-us.json';

import EmptyState from './index';

storiesOf('Campaigns|EmptyState', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <EmptyState
      translations={translations.campaigns.emptyState}
      onCreateCampaignClick={action('createCampaign')}
    />
  ));
