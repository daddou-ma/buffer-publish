import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import ShopGridPromoModal from './index';

storiesOf('Modals|ShopGridPromoModal', module)
  .addDecorator(withA11y)
  .add('modal', () => (
    <ShopGridPromoModal
      onStartTrialClick={action('trial-clicked')}
      onCloseModalClick={action('close-clicked')}
    />
  ));
