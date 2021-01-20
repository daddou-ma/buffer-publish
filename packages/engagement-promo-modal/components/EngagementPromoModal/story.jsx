import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import EngagementPromoModal from './index';

storiesOf('EngagementPromoModal', module)
  .addDecorator(withA11y)
  .add('modal', () => (
    <EngagementPromoModal
      dismissModal={action('dismiss-modal')}
      startTrial={action('start-trial')}
    />
  ))
  .add('modal already seen', () => (
    <EngagementPromoModal
      dismissModal={action('dismiss-modal')}
      startTrial={action('start-trial')}
      alreadySawModal
    />
  ));
