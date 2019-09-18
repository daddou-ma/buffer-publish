import React from 'react';
import PropTypes from 'prop-types';
import DateTimeSlotPicker from '@bufferapp/publish-composer/composer/components/DateTimeSlotPicker';
import styled from 'styled-components';

const DateTimePickerStyle = styled.div`
  background: white;
  position: absolute;
  top: 35%;
  border: 1px solid #d5dce3;
`;

const getDateTimePickerPosition = editMode => ({
  right: editMode ? '9%' : '21%',
});

const DateTimeSlotPickerWrapper = ({
  onDateTimeSlotPickerSubmit,
  timezone,
  weekStartsMonday,
  uses24hTime,
  editMode,
  initialDateTime,
}) => (
  <DateTimePickerStyle style={getDateTimePickerPosition(editMode)}>
    <DateTimeSlotPicker
      onSubmit={onDateTimeSlotPickerSubmit}
      shouldUse24hTime={uses24hTime}
      timezone={timezone}
      weekStartsMonday={weekStartsMonday}
      initialDateTime={initialDateTime}
    />
  </DateTimePickerStyle>
);

DateTimeSlotPickerWrapper.propTypes = {
  timezone: PropTypes.string.isRequired,
  weekStartsMonday: PropTypes.bool.isRequired,
  uses24hTime: PropTypes.bool,
  onDateTimeSlotPickerSubmit: PropTypes.func,
  editMode: PropTypes.bool,
};

DateTimeSlotPickerWrapper.defaultProps = {
  editMode: false,
  uses24hTime: false,
  onDateTimeSlotPickerSubmit: () => {},
};

export default DateTimeSlotPickerWrapper;
