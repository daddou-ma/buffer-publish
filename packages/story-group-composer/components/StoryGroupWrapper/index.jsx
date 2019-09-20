import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from '@bufferapp/publish-shared-components/Carousel';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import HeaderBar from '../HeaderBar';
import AddNote from '../AddNote';
import CarouselCards from '../Carousel/CarouselCards';
import CardItem from '../Carousel/CardItem';
import AddStoryFooter from '../AddStoryFooter';

const ADD_STORY = 'addStory';
const ADD_NOTE = 'addNote';

const WrapperStyle = styled.div`
  width: 686px;
  height: 100%;
  background-color: white;
  top: 0;
  right: 0;
  border-radius: 3px;
  padding: 16px;
`;

const ErrorMessage = styled.div`
  display: block;
  background-color: rgba(243, 175, 185, 0.25);
  color: #9D2637;
  margin: 8px 0;
  padding: 8px;
  font-size: 0.875rem;
  font-weight: 400;
`;

const ErrorHandler = ({ errorMessages }) => {
  if (!errorMessages) return null;
  return errorMessages && errorMessages.map(err => <ErrorMessage key={`${err}`}>{err}</ErrorMessage>);
};

/*
 * Wrapper to make sure to display add story view or add note view
 */

const StoryGroupWrapper = ({
  uses24hTime,
  timezone,
  weekStartsMonday,
  translations,
  selectedProfile,
  isScheduleLoading,
  saveNote,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStory,
  onCreateNewStoryCard,
  onUpdateStoryUploadProgress,
  onVideoUploadProcessingStarted,
  onVideoUploadProcessingComplete,
  onMonitorUpdateProgress,
  onUploadImageComplete,
  onUploadDraftFile,
  onPreviewClick,
  onRemoveNotifications,
  onShowErrorNotification,
  userData,
  onUploadFinished,
  onDropCard,
  storyGroup,
  editMode,
  errorMessages,
  emptySlotData,
  maxStories,
}) => {
  const cards = storyGroup ? storyGroup.stories : [];
  const [viewMode, setViewMode] = useState(ADD_STORY);
  const [story, setStory] = useState();

  return (
    <Fragment>
      <WrapperStyle>
        <HeaderBar
          selectedProfile={selectedProfile}
        />
        {viewMode === ADD_STORY
        && (
          <React.Fragment>
            <Carousel
              userData={userData}
              totalCardsToShow={maxStories}
              largeCards
            >
              <CarouselCards
                createNewFile={onCreateNewStoryCard}
                updateUploadProgress={onUpdateStoryUploadProgress}
                videoProcessingStarted={onVideoUploadProcessingStarted}
                videoProcessingComplete={onVideoUploadProcessingComplete}
                monitorUpdateProgress={onMonitorUpdateProgress}
                uploadImageComplete={onUploadImageComplete}
                uploadDraftFile={onUploadDraftFile}
                cards={cards}
                totalCardsToShow={maxStories}
                userData={userData}
                largeCards
                editMode
                onDropCard={onDropCard}
                onAddNoteClick={(storyCard) => {
                  setStory(storyCard);
                  setViewMode(ADD_NOTE);
                }}
                onDeleteStoryClick={storyCard => onDeleteStory(storyCard)}
                onUploadFinished={fileUploaded => onUploadFinished(fileUploaded, storyGroup)}
                removeNotifications={onRemoveNotifications}
                notifyError={onShowErrorNotification}
              />
            </Carousel>
            <ErrorHandler errorMessages={errorMessages} />
            <AddStoryFooter
              timezone={timezone}
              weekStartsMonday={weekStartsMonday}
              uses24hTime={uses24hTime}
              isScheduleLoading={isScheduleLoading}
              translations={translations}
              storyGroup={storyGroup}
              editMode={editMode}
              onCreateStoryGroup={onCreateStoryGroup}
              onUpdateStoryGroup={onUpdateStoryGroup}
              onPreviewClick={onPreviewClick}
              emptySlotData={emptySlotData}
            />
          </React.Fragment>
        )}
        {viewMode === ADD_NOTE && (
          <AddNote
            translations={translations}
            onCancelClick={() => setViewMode(ADD_STORY)}
            story={story}
            onSaveNoteClick={({ order, note }) => {
              saveNote({ order, note });
              setViewMode(ADD_STORY);
            }}
          />
        )}
      </WrapperStyle>
    </Fragment>
  );
};

StoryGroupWrapper.propTypes = {
  saveNote: PropTypes.func.isRequired,
  isScheduleLoading: PropTypes.bool.isRequired,
  userData: PropTypes.shape({}).isRequired,
  ...CardItem.propTypes,
};

StoryGroupWrapper.defaultProps = {
  ...HeaderBar.PropTypes,
  selectedProfile: HeaderBar.propTypes.selectedProfile.isRequired,
  ...HeaderBar.propTypes,
  ...DateTimeSlotPickerWrapper.propTypes,
  ...AddStoryFooter.propTypes,
  ...CardItem.defaultProps,
};

export default StoryGroupWrapper;
