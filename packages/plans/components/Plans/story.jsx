import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import Plans from './index';
import translations from '../../../i18n/translations/en-us.json';

storiesOf('Plans', module)
  .addDecorator(checkA11y)
  .add('should display plans page', () => (
    <Plans
      onChoosePlanClick={() => {}}
      currentPlan="pro"
      onBackToDashboardClick={() => {}}
      selectedProfileId={2}
      profiles={[]}
      translations={translations['plans-page']}
    />
  ));
