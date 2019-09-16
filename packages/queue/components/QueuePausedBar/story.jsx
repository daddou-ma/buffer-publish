import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';

import QueuePausedBar from './index';

storiesOf('QueuePausedBar', module)
  .addDecorator(withA11y)
  .add('isManager', () => (
    <QueuePausedBar
      isManager
      handleClickUnpause={action('handleClickUnpause')}
    />
  ))
  .add('isContributor', () => (
    <QueuePausedBar
      isManager={false}
      handleClickUnpause={action('handleClickUnpause')}
    />
  ));
