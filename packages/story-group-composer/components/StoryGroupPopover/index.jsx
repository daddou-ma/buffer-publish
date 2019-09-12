import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import StoryGroupWrapper from '../StoryGroupWrapper';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import HeaderBar from '../HeaderBar';

const StoryGroupPopover = ({
  onOverlayClick,
  translations,
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
  onSetShowDatePicker,
  onCreateNewStoryCard,
  onUpdateStoryUploadProgress,
  showDatePicker,
  userData,
  draft,
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <StoryGroupWrapper
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
      onCreateNewStoryCard={onCreateNewStoryCard}
      onComposerClick={onComposerClick}
      onSetShowDatePicker={onSetShowDatePicker}
      onUpdateStoryUploadProgress={onUpdateStoryUploadProgress}
      showDatePicker={showDatePicker}
      userData={userData}
      draft={draft}
    />
  </Popover>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
  userData: PropTypes.shape({}).isRequired,
  ...DateTimeSlotPickerWrapper.propTypes,
  ...HeaderBar.propTypes,
  ...DateTimeSlotPickerWrapper.propTypes,
};

export default StoryGroupPopover;
