import React from 'react';
import PropTypes from 'prop-types';
import DateTimeSlotPicker from '../../../composer/composer/components/DateTimeSlotPicker';
import styled from 'styled-components';

const DateTimeSlotPickerWrapper = ({
  onDateTimeSlotPickerSubmit,
  timezone,
  weekStartsMonday,
  uses24hTime,
}) => (
  <div>
    <DateTimeSlotPicker
      onSubmit={onDateTimeSlotPickerSubmit}
      shouldUse24hTime={uses24hTime}
      timezone={timezone}
      weekStartsMonday={weekStartsMonday}
    />
  </div>
);

DateTimeSlotPickerWrapper.propTypes = {
  timezone: PropTypes.string.isRequired,
  weekStartsMonday: PropTypes.bool.isRequired,
  uses24hTime: PropTypes.bool.isRequired,
  onDateTimeSlotPickerSubmit: PropTypes.func.isRequired,
};

export default DateTimeSlotPickerWrapper;
