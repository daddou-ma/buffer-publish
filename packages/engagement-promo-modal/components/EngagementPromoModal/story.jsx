import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import EngagementPromoModal from './index';

storiesOf('EngagementPromoModal', module)
  .addDecorator(withA11y)
  .add('modal', () => <EngagementPromoModal />);
