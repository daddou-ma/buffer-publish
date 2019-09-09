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
  translations,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <Fragment>
      <FooterBar>
        <ButtonStyle>
          <Button
            type="secondary"
            label={translations.previewButton}
            onClick={() => {}}
          />
        </ButtonStyle>
        <Button
          onClick={() => setShowDatePicker(true)}
          type="primary"
          disabled={isScheduleLoading}
          label={isScheduleLoading ? translations.scheduleLoadingButton : translations.scheduleButton}
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
  translations: PropTypes.shape({
    scheduleLoadingButton: PropTypes.string,
    scheduleButton: PropTypes.string,
    previewButton: PropTypes.string,
  }).isRequired,
};

export default AddStoryFooter;
