import React from 'react';
import {
  action,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import BDSButton from './index';

const cta = 'Learn About Buffer for Business';

storiesOf('BDSButton', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <BDSButton
      onClick={action('on-click')}
      type="normal"
    >
      {cta}
    </BDSButton>
  ))
  .add('small', () => (
    <BDSButton
      onClick={action('on-click')}
      type="small"
    >
      {cta}
    </BDSButton>
  ))
  .add('text only', () => (
    <BDSButton
      onClick={action('on-click')}
      type="textOnly"
    >
      {cta}
    </BDSButton>
  ));
