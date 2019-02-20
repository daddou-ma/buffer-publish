import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import BDSButton from './index';

const cta = 'Learn About Buffer for Business';

storiesOf('BDSButton', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <BDSButton onCtaClick={() => {}}> {cta} </BDSButton>
  ));
