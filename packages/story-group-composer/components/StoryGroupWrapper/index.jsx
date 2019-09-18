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
  userData,
  onUploadFinished,
  onDropCard,
  storyGroup,
  editMode,
}) => {
  const cards = storyGroup ? storyGroup.stories : [];
  const [viewMode, setViewMode] = useState(ADD_STORY);
  const [story, setStory] = useState();
  const uploadsCompleted = storyGroup.stories.filter(card => card.processing || card.uploading).length === 0

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
                totalCardsToShow={15}
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
              />
            </Carousel>
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
              uploadsCompleted={uploadsCompleted}
              storiesLength={storyGroup.stories.length}
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
