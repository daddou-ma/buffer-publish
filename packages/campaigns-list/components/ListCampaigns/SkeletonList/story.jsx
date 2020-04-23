import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import SkeletonList from './index';

storiesOf('Campaigns|ListCampaigns/SkeletonList', module)
  .addDecorator(withA11y)
  .add('Skeleton list of campaigns', () => (
    <SkeletonList showCampaignActions />
  ));
