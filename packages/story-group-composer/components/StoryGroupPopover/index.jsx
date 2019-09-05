import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import StoryGroupWrapper from '../StoryGroupWrapper';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';

const StoryGroupPopover = ({
  onOverlayClick,
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <StoryGroupWrapper
      onDateTimeSlotPickerSubmit={onDateTimeSlotPickerSubmit}
      uses24hTime={uses24hTime}
      timezone={timezone}
      weekStartsMonday={weekStartsMonday}
      onCreateStoryGroup={onCreateStoryGroup}
      onUpdateStoryGroup={onUpdateStoryGroup}
      onDeleteStoryGroup={onDeleteStoryGroup}
    />
  </Popover>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  ...DateTimeSlotPickerWrapper.propTypes,
};

export default StoryGroupPopover;
