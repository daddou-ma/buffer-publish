import React from 'react';
import { action, storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import ScheduleTableHeader from './index';

const dayName = 'Monday';

storiesOf('ScheduleTableHeader', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <ScheduleTableHeader
      dayName={dayName}
      disabled={false}
      paused={false}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('paused', () => (
    <ScheduleTableHeader
      dayName={dayName}
      disabled={false}
      paused
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('disabled', () => (
    <ScheduleTableHeader
      dayName={dayName}
      disabled
      paused={false}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ));
