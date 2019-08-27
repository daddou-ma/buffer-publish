import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateTimeSlotPicker from '../../../composer/composer/components/DateTimeSlotPicker';

const WrapperStyle = styled.div`
  width: 686px;
  height: 100%;
  background-color: white;
  top: 0;
  right: 0;
  border-radius: 3px;
`;

const DateTimeSlotPickerWrapper = ({
  onDateTimeSlotPickerSubmit,
  timezone,
  weekStartsMonday,
  uses24hTime,
}) => (
  <WrapperStyle>
    <DateTimeSlotPicker
      onSubmit={onDateTimeSlotPickerSubmit}
      shouldUse24hTime={uses24hTime}
      timezone={timezone}
      weekStartsMonday={weekStartsMonday}
    />
  </WrapperStyle>
);

DateTimeSlotPickerWrapper.propTypes = {
  timezone: PropTypes.string.isRequired,
  weekStartsMonday: PropTypes.string.isRequired,
  uses24hTime: PropTypes.bool.isRequired,
  onDateTimeSlotPickerSubmit: PropTypes.func.isRequired,
};

export default DateTimeSlotPickerWrapper;
