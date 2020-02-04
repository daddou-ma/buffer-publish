import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import StepNumber from './index';

storiesOf('Steps|StepNumber', module)
  .addDecorator(withA11y)
  .add('default', () => <StepNumber number={1} />);
