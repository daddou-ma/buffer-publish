import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import Example from './index';

storiesOf('Example', module)
  .addDecorator(withA11y)
  .add('default', () => <Example />);
