import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import StoriesPromoModal from './index';

storiesOf('Modals|StoriesPromoModal', module)
  .addDecorator(withA11y)
  .add('modal', () => (
    <StoriesPromoModal
      onStartTrialClick={action('trial-clicked')}
      onCloseModalClick={action('close-clicked')}
    />
  ));
