import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';

import BusinessTrialOrUpgradeCard from './index';

storiesOf('BusinessTrialOrUpgradeCard', module)
  .addDecorator(checkA11y)
  .add('Analytics tab CTA', () => (
    <div style={{ margin: '32px' }}>
      <BusinessTrialOrUpgradeCard
        heading="Unlock Great Insights"
        body="Gain a deeper understanding of how you are performing on social media with advanced analytics."
        cta="Start a Free 14-Day Trial of the Business Plan"
        onCtaClick={() => {}}
        backgroundImage="circles"
      />
    </div>
  ))
  .add('Drafts tab CTA', () => (
    <div style={{ margin: '32px' }}>
      <BusinessTrialOrUpgradeCard
        heading="Collaborate With Your Team"
        body="Add your team to your Buffer account so you can collaborate and save even more time."
        cta="Start a Free 14-Day Trial of the Business Plan"
        onCtaClick={() => {}}
        backgroundImage="squares"
      />
    </div>
  ));
