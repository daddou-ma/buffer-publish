import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import Example from './index';


storiesOf('Example', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <Example />
  ));
