import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';

const FooterBar = styled.div`
  padding: 13px;
  display: flex;
`;

const ButtonStyle = styled.div`
  margin-left: auto;
  margin-right: 5px;
`;

const AddStoryFooter = ({
  onDateTimeSlotPickerSubmit,
  timezone,
  weekStartsMonday,
  uses24hTime,
  isScheduleLoading,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <Fragment>
      <FooterBar>
        <ButtonStyle>
          <Button
            type="secondary"
            label="Preview"
            onClick={() => {}}
          />
        </ButtonStyle>
        <Button
          onClick={() => setShowDatePicker(true)}
          type="primary"
          disabled={isScheduleLoading}
          label={isScheduleLoading ? 'Scheduling Story...' : 'Schedule Story'}
        />
        {showDatePicker && (
          <DateTimeSlotPickerWrapper
            shouldUse24hTime={uses24hTime}
            timezone={timezone}
            weekStartsMonday={weekStartsMonday}
            onDateTimeSlotPickerSubmit={(scheduledAt) => {
              setShowDatePicker(false);
              onDateTimeSlotPickerSubmit(scheduledAt);
            }}
          />
        )}
      </FooterBar>

    </Fragment>
  );
};

AddStoryFooter.propTypes = {
  timezone: PropTypes.string.isRequired,
  weekStartsMonday: PropTypes.bool.isRequired,
  uses24hTime: PropTypes.bool.isRequired,
  onDateTimeSlotPickerSubmit: PropTypes.func.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
};

export default AddStoryFooter;
