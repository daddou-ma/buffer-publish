import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withA11y } from '@storybook/addon-a11y';
import ScheduleTableColumn from './index';

const dayName = 'Monday';
const times = [
  {
    value: {
      hours: 9,
      minutes: 41,
    },
  },
  {
    value: {
      hours: 19,
      minutes: 0,
    },
  },
];
const timesSingle = [
  {
    value: {
      hours: 9,
      minutes: 41,
    },
  },
];

const timesEmpty = [];

storiesOf('ScheduleTableColumn', module)
  .addDecorator(withA11y)
  .add('default', () => (
    <ScheduleTableColumn
      dayName={dayName}
      paused={false}
      times={times}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('paused', () => (
    <ScheduleTableColumn
      dayName={dayName}
      paused
      times={times}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('disabled', () => (
    <ScheduleTableColumn
      dayName={dayName}
      paused={false}
      disabled
      times={times}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('24-hour time setting', () => (
    <ScheduleTableColumn
      dayName={dayName}
      paused={false}
      select24Hours
      times={times}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('24-hour time setting, disabled', () => (
    <ScheduleTableColumn
      dayName={dayName}
      paused={false}
      disabled
      select24Hours
      times={times}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('single time', () => (
    <ScheduleTableColumn
      dayName={dayName}
      paused={false}
      times={timesSingle}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ))
  .add('without times', () => (
    <ScheduleTableColumn
      paused={false}
      dayName={dayName}
      times={timesEmpty}
      onUpdateTime={action('on-update-time')}
      onRemoveTimeClick={action('on-remove-time-click')}
      onPauseToggleClick={action('on-pause-toggle-click')}
    />
  ));
