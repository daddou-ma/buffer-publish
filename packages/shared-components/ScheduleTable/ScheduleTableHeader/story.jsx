import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import ScheduleTableHeader from './index';

const dayName = 'Monday';

storiesOf('ScheduleTableHeader', module)
  .addDecorator(withA11y)
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
