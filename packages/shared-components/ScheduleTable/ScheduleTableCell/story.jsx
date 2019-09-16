import React from 'react';
import {
  action,
  storiesOf,
} from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y/register';
import ScheduleTableCell from './index';

const dayName = 'Monday';
const timeIndex = 0;

const time = {
  value: {
    hours: 19,
    minutes: 41,
  },
};

storiesOf('ScheduleTableCell', module)
  .addDecorator(checkA11y)
  .add('default', () => (
    <ScheduleTableCell
      time={time}
      paused={false}
      onUpdateTime={action('on-update-time')}
      dayName={dayName}
      timeIndex={timeIndex}
      onRemoveTimeClick={action('on-remove-time-click')}
    />
  ))
  .add('disabled', () => (
    <ScheduleTableCell
      disabled
      paused={false}
      time={time}
      onUpdateTime={action('on-update-time')}
      dayName={dayName}
      timeIndex={timeIndex}
      onRemoveTimeClick={action('on-remove-time-click')}
    />
  ))
  .add('paused', () => (
    <ScheduleTableCell
      time={time}
      paused={true}
      onUpdateTime={action('on-update-time')}
      dayName={dayName}
      timeIndex={timeIndex}
      onRemoveTimeClick={action('on-remove-time-click')}
    />
  ))

  .add('24-hour time setting', () => (
    <ScheduleTableCell
      select24Hours
      paused={false}
      time={time}
      onUpdateTime={action('on-update-time')}
      dayName={dayName}
      timeIndex={timeIndex}
      onRemoveTimeClick={action('on-remove-time-click')}
    />
  ))
  .add('24-hour time setting, disabled', () => (
    <ScheduleTableCell
      disabled
      paused={false}
      select24Hours
      time={time}
      onUpdateTime={action('on-update-time')}
      dayName={dayName}
      timeIndex={timeIndex}
      onRemoveTimeClick={action('on-remove-time-click')}
    />
  ));
