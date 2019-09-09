import React from 'react';
import PropTypes from 'prop-types';
import DateTimeSlotPicker from '@bufferapp/publish-composer/composer/components/DateTimeSlotPicker';
import styled from 'styled-components';

const DateTimePickerStyle = styled.div`
  background: white;
  position: absolute;
  top: 50%;
  right: 25%;
  border: 1px solid #d5dce3;
`;

const DateTimeSlotPickerWrapper = ({
  onDateTimeSlotPickerSubmit,
  timezone,
  weekStartsMonday,
  uses24hTime,
}) => (
  <DateTimePickerStyle>
    <DateTimeSlotPicker
      onSubmit={onDateTimeSlotPickerSubmit}
      shouldUse24hTime={uses24hTime}
      timezone={timezone}
      weekStartsMonday={weekStartsMonday}
    />
  </DateTimePickerStyle>
);

DateTimeSlotPickerWrapper.propTypes = {
  timezone: PropTypes.string.isRequired,
  weekStartsMonday: PropTypes.bool.isRequired,
  uses24hTime: PropTypes.bool.isRequired,
  onDateTimeSlotPickerSubmit: PropTypes.func.isRequired,
};

export default DateTimeSlotPickerWrapper;
