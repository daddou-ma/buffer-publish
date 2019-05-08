import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import B4bTrialCompleteModal from './index';

const translations = {
  header: 'header',
};

storiesOf('B4bTrialCompleteModal', module)
  .addDecorator(checkA11y)
  .add('should show modal', () => (
    <B4bTrialCompleteModal
      translations={translations}
      hideModal={() => {}}
    />
  ));
