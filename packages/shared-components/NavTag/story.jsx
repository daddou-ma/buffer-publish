import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import NavTag from './index';

storiesOf('NabTag', module)
  .addDecorator(withA11y)
  .add('new', () => <NavTag type="new" labelName="New" />)
  .add('counter', () => <NavTag type="counter" labelName="32" />);
