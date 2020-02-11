import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import StepList from './index';

storiesOf('Steps|StepList', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <StepList steps={['step 1 description', 'step 2 description']} />
  ));
