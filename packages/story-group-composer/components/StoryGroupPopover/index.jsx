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
  selectedProfile,
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
      selectedProfile={selectedProfile}
    />
  </Popover>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  ...DateTimeSlotPickerWrapper.propTypes,
  selectedProfile: PropTypes.shape({
    id: PropTypes.string,
    avatarUrl: PropTypes.string,
    avatar_https: PropTypes.string,
    serviceUsername: PropTypes.string,
    serviceId: PropTypes.string,
    organizationId: PropTypes.string,
    username: PropTypes.string,
    service: PropTypes.string,
    handle: PropTypes.string,
  }),

};

export default StoryGroupPopover;
