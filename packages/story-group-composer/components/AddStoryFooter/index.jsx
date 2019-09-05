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
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  return (
    <Fragment>
      <FooterBar>
        <ButtonStyle>
          <Button
            type="secodary"
            label="Preview"
          />
        </ButtonStyle>
        <Button
          onSelectClick={() => setShowDatePicker(true)}
          onClick={() => setShowDatePicker(true)}
          type="primary"
          isSplit
          items={[
            { id: '1', title: 'Share Now' },
          ]}
          label="Schedule Story"
        />
        {showDatePicker && (
          <DateTimeSlotPickerWrapper
            shouldUse24hTime={uses24hTime}
            timezone={timezone}
            weekStartsMonday={weekStartsMonday}
            onDateTimeSlotPickerSubmit={onDateTimeSlotPickerSubmit}
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
};

export default AddStoryFooter;
