import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from 'storybook-addon-a11y';
import { action } from '@storybook/addon-actions';
import moment from 'moment';

import DatePicker from './index';
import { presets } from '../../reducer';

const mockTimestamp = moment('2017-08-31').valueOf();
Date.now = () => mockTimestamp;

storiesOf('DatePicker')
  .addDecorator(checkA11y)
  .add('should not be open', () => (
    <DatePicker
      presets={presets}
      startDate={moment().subtract(1, 'days').unix()}
      endDate={moment().subtract(1, 'days').unix()}
      open={action('open')}
      close={action('close')}
      isOpen={false}
      month={moment().startOf('month').unix()}
      minDate={moment().subtract(15, 'days').valueOf()}
      maxDate={moment().valueOf()}
    />
  ))
  .add('there is no date if a single day is selected', () => (
    <DatePicker
      presets={presets}
      startDate={moment().subtract(1, 'days').unix()}
      endDate={moment().subtract(1, 'days').unix()}
      open={action('open')}
      close={action('close')}
      isOpen
      month={moment().startOf('month').unix()}
      minDate={moment().subtract(15, 'days').valueOf()}
      maxDate={moment().valueOf()}
    />
  ))
  .add('should be able to open', () => (
    <DatePicker
      presets={presets}
      startDate={moment().subtract(7, 'days').unix()}
      endDate={moment().subtract(1, 'day').unix()}
      close={action('close')}
      month={moment().startOf('month').unix()}
      isOpen
      selectPreset={action('select preset')}
      maxDate={moment().valueOf()}
    />
  ))
  .add('should display some options as disabled', () => (
    <DatePicker
      presets={presets}
      minDate={moment().subtract(28, 'days').valueOf()}
      maxDate={moment().valueOf()}
      startDate={moment().subtract(7, 'days').unix()}
      endDate={moment().subtract(1, 'day').unix()}
      close={action('close')}
      month={moment().startOf('month').unix()}
      isOpen
      selectPreset={action('select preset')}
    />
  ))
  .add('should be able to have a custom date range selected', () => (
    <DatePicker
      presets={presets}
      minDate={moment().subtract(90, 'days').valueOf()}
      maxDate={moment().valueOf()}
      startDate={moment().subtract(10, 'days').unix()}
      endDate={moment().subtract(1, 'day').unix()}
      month={moment().startOf('month').unix()}
    />
  ))
  .add('should display a calendar without a selected date range', () => (
    <DatePicker
      presets={presets}
      minDate={moment().subtract(90, 'days').valueOf()}
      maxDate={moment().valueOf()}
      isOpen
      calendarOpen
      setStartDate={action('set start date')}
      setEndDate={action('set end date')}
      month={moment().startOf('month').unix()}
    />
  ))
  .add('should display a calendar', () => (
    <DatePicker
      presets={presets}
      minDate={null}
      maxDate={moment().valueOf()}
      startDate={moment().subtract(10, 'days').unix()}
      endDate={moment().subtract(1, 'day').unix()}
      setStartDate={action('set start date')}
      setEndDate={action('set end date')}
      isOpen
      calendarOpen
      month={moment().startOf('month').unix()}
    />
  ))
  .add('days before minDate should be disabled', () => (
    <DatePicker
      presets={presets}
      minDate={moment().subtract(15, 'days').valueOf()}
      maxDate={moment().valueOf()}
      startDate={moment().subtract(10, 'days').unix()}
      endDate={moment().subtract(1, 'day').unix()}
      setStartDate={action('set start date')}
      setEndDate={action('set end date')}
      isOpen
      calendarOpen
      month={moment().startOf('month').unix()}
    />
  ))
  .add('should have past 7 days selected', () => (
    <DatePicker
      presets={presets}
      startDate={moment().subtract(7, 'days').unix()}
      endDate={moment().subtract(1, 'day').unix()}
      month={moment().startOf('month').unix()}
    />
  ))
  .add('should render a loading datepicker', () => (
    <DatePicker presets={presets} loading />
  ));
