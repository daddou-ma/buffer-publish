import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import BufferTrialOrUpgradeBanner from './index';

const canStartBusinessTrialCopy = {
  cta: 'Learn About Buffer for Business',
  subtext: 'TRY IT FREE FOR 14 DAYS',
};

storiesOf('BusinessTrialOrUpgradeBanner', module)
  .addDecorator(checkA11y)
  .add('Can start business trial', () => (
    <BufferTrialOrUpgradeBanner
      body={'Get in-depth post analytics by upgrading to Buffer for Business.'}
      cta={canStartBusinessTrialCopy.cta}
      subtext={canStartBusinessTrialCopy.subtext}
      onCtaClick={() => {}}
    />
  ))
  .add('Unable to start business trial', () => (
    <BufferTrialOrUpgradeBanner
      body={'Get in-depth post analytics by upgrading to Buffer for Business.'}
      cta={'Upgrade to Buffer for Business'}
      onCtaClick={() => {}}
    />
));
