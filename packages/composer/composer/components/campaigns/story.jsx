import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import CampaignHeader from './CampaignHeader';

storiesOf('Composer|CampaignHeader', module)
  .addDecorator(withA11y)
  .add('with two campaigns', () => (
    <CampaignHeader
      campaigns={[
        { name: '#SaveOurSeasWeek', color: '#9C2BFF', id: "1" },
        { name: 'Hello World', color: 'blue', id: "2" },
      ]}
    />
  ))
  .add('with a campaign id when editing post', () => (
    <CampaignHeader
      campaigns={[
        { name: '#SaveOurSeasWeek', color: '#9C2BFF', id: "1" },
        { name: 'Hello World', color: 'blue', id: "2" },
      ]}
      campaignId={"2"}
    />
  ))
  .add('with no campaigns created', () => <CampaignHeader campaigns={[]} />);
