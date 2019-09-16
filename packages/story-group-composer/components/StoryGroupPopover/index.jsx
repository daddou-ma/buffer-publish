import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import StoryGroupWrapper from '../StoryGroupWrapper';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import CarouselCardHover from '../Carousel/CarouselCardHover';
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
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
  onDeleteStory,
  onComposerClick,
  onCreateNewStoryCard,
  onUpdateStoryUploadProgress,
  onVideoUploadProcessingStarted,
  onVideoUploadProcessingComplete,
  onMonitorUpdateProgress,
  onUploadImageComplete,
  onUploadDraftFile,
  userData,
  storyGroup,
  editMode,
  onUploadFinished,
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
      translations={translations}
      isScheduleLoading={isScheduleLoading}
      onCreateStoryGroup={onCreateStoryGroup}
      onUpdateStoryGroup={onUpdateStoryGroup}
      onDeleteStoryGroup={onDeleteStoryGroup}
      onDeleteStory={onDeleteStory}
      onCreateNewStoryCard={onCreateNewStoryCard}
      onUploadFinished={onUploadFinished}
      onComposerClick={onComposerClick}
      onUpdateStoryUploadProgress={onUpdateStoryUploadProgress}
      onVideoUploadProcessingStarted={onVideoUploadProcessingStarted}
      onVideoUploadProcessingComplete={onVideoUploadProcessingComplete}
      onMonitorUpdateProgress={onMonitorUpdateProgress}
      onUploadImageComplete={onUploadImageComplete}
      onUploadDraftFile={onUploadDraftFile}
      userData={userData}
      storyGroup={storyGroup}
      editMode={editMode}
    />
  </Popover>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  saveNote: PropTypes.func.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
  userData: PropTypes.shape({}).isRequired,
};

StoryGroupPopover.defaultProps = {
  ...DateTimeSlotPickerWrapper.propTypes,
  ...HeaderBar.propTypes,
  ...DateTimeSlotPickerWrapper.propTypes,
  ...CarouselCardHover.propTypes,
};

export default StoryGroupPopover;
