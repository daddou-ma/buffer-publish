import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import StoryGroupWrapper from '../StoryGroupWrapper';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import HeaderBar from '../HeaderBar';

const StoryGroupPopover = ({
  onOverlayClick,
  translations,
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  selectedProfile,
  isScheduleLoading,
  saveNote,
  editingStoryGroup,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
  onComposerClick,
  setShowDatePicker,
  showDatePicker,
  userData,
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
      saveNote={saveNote}
      editingStoryGroup={editingStoryGroup}
      translations={translations}
      isScheduleLoading={isScheduleLoading}
      onCreateStoryGroup={onCreateStoryGroup}
      onUpdateStoryGroup={onUpdateStoryGroup}
      onDeleteStoryGroup={onDeleteStoryGroup}
      onComposerClick={onComposerClick}
      setShowDatePicker={setShowDatePicker}
      showDatePicker={showDatePicker}
      userData={userData}
    />
  </Popover>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  ...DateTimeSlotPickerWrapper.propTypes,
  saveNote: PropTypes.func.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
  ...HeaderBar.propTypes,
  ...DateTimeSlotPickerWrapper.propTypes,
  userData: PropTypes.shape({}).isRequired,
};

export default StoryGroupPopover;
