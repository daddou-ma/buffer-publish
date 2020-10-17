import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';
import TabTag from './index';

storiesOf('Nav|TabTag', module)
  .addDecorator(withA11y)
  .add('new', () => <TabTag type="new" labelName="New" />)
  .add('counter', () => <TabTag type="counter" labelName="32" />);
