import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y/register';

import QueuePausedBar from './index';

storiesOf('QueuePausedBar', module)
  .addDecorator(checkA11y)
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
