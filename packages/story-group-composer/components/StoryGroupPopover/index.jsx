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
  saveNote,
  editingStoryGroup,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
  userData,
  onUploadFinished,
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
      onCreateStoryGroup={onCreateStoryGroup}
      onUpdateStoryGroup={onUpdateStoryGroup}
      onDeleteStoryGroup={onDeleteStoryGroup}
      onUploadFinished={onUploadFinished}
      userData={userData}
    />
  </Popover>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  ...DateTimeSlotPickerWrapper.propTypes,
  saveNote: PropTypes.func.isRequired,
  selectedProfile: HeaderBar.propTypes.selectedProfile.isRequired,
  userData: PropTypes.shape({}).isRequired,
  onUploadFinished: PropTypes.func,
};

StoryGroupPopover.defaultProps = {
  onUploadFinished: () => {},
};

export default StoryGroupPopover;
