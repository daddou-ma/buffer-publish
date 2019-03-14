import React from 'react';
import {
  storiesOf,
} from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import QueueButtonGroup from './index';

const buttons = ['Day', 'Week', 'Month'];

storiesOf('QueueButtonGroup', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <QueueButtonGroup buttons={buttons} onClick={() => {}} />
  ));
