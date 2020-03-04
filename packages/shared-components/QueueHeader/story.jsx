import React from 'react';
import { storiesOf } from '@storybook/react';
import { withA11y } from '@storybook/addon-a11y';

import QueueHeader from './index';

storiesOf('Queue|QueueHeader', module)
  .addDecorator(withA11y)
  .add('default', () => <QueueHeader dayOfWeek="Today" date="May 2" />)
  .add('date', () => <QueueHeader text="Today, May 2" />);
