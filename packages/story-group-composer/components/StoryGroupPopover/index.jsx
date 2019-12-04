import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import PreviewPopover from '@bufferapp/publish-story-preview';
import StoryGroupWrapper from '../StoryGroupWrapper';

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
  onCreateNewStoryCard,
  onUpdateStoryUploadProgress,
  onVideoUploadProcessingStarted,
  onVideoUploadProcessingComplete,
  onMonitorUpdateProgress,
  onUploadImageComplete,
  onUploadDraftFile,
  onRemoveNotifications,
  onShowErrorNotification,
  userData,
  storyGroup,
  editMode,
  onUploadFinished,
  showStoryPreview,
  onClosePreviewClick,
  onPreviewClick,
  onDropCard,
  errorMessages,
  emptySlotData,
  maxStories,
  sentPost,
}) => (
  <React.Fragment>
    {showStoryPreview && (
      <PreviewPopover onCloseClick={onClosePreviewClick} view="composer" />
    )}
    {!showStoryPreview && (
      <Popover width="100%" top="5rem" onOverlayClick={onOverlayClick}>
        <StoryGroupWrapper
          maxStories={maxStories}
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
          onUpdateStoryUploadProgress={onUpdateStoryUploadProgress}
          onVideoUploadProcessingStarted={onVideoUploadProcessingStarted}
          onVideoUploadProcessingComplete={onVideoUploadProcessingComplete}
          onMonitorUpdateProgress={onMonitorUpdateProgress}
          onUploadImageComplete={onUploadImageComplete}
          onUploadDraftFile={onUploadDraftFile}
          onRemoveNotifications={onRemoveNotifications}
          onShowErrorNotification={onShowErrorNotification}
          onPreviewClick={onPreviewClick}
          onDropCard={onDropCard}
          userData={userData}
          storyGroup={storyGroup}
          editMode={editMode}
          errorMessages={errorMessages}
          emptySlotData={emptySlotData}
          sentPost={sentPost}
        />
      </Popover>
    )}
  </React.Fragment>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  showStoryPreview: PropTypes.bool,
  ...StoryGroupWrapper.propTypes,
};

StoryGroupPopover.defaultProps = {
  showStoryPreview: false,
};

export default StoryGroupPopover;
