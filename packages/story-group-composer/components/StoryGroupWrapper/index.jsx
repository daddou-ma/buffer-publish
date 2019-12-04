import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel, {
  CarouselCard,
  getCardSizes,
} from '@bufferapp/publish-shared-components/Carousel';
import {
  fontSizeMini,
  fontWeight,
  fontWeightMedium,
  fontFamily,
} from '@bufferapp/components/style/font';
import { red } from '@bufferapp/components/style/color';
import HeaderBar from '../HeaderBar';
import AddNote from '../AddNote';
import CarouselCards from '../Carousel/CarouselCards';
import CardItem from '../Carousel/CardItem';
import AddStoryFooter from '../AddStoryFooter';
import { selectedProfilePropTypes } from '../../utils/commonPropTypes';

const ADD_STORY = 'addStory';
const ADD_NOTE = 'addNote';

const WrapperStyle = styled.div`
  width: 728px;
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
  color: ${red};
  margin: 8px 0;
  padding: 8px;
  font-size: ${fontSizeMini};
  font-weight: ${fontWeight};
`;

const CarouselCardCongrats = styled.span`
  color: inherit;
  font-family: ${fontFamily};
  font-size: ${fontSizeMini};
  font-weight: ${props => props.weight};
  line-height: inherit;
  margin: 8px;
  text-align: center;
`;

const ErrorHandler = ({ errorMessages }) => {
  if (!errorMessages) return null;
  return (
    errorMessages &&
    errorMessages.map(err => <ErrorMessage key={`${err}`}>{err}</ErrorMessage>)
  );
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
  sentPost,
}) => {
  const cards = storyGroup ? storyGroup.stories : [];
  const [viewMode, setViewMode] = useState(ADD_STORY);
  const [story, setStory] = useState();

  const hasReachedMaxStories = maxStories - cards.length <= 0;
  const totalStoriesInCarousel = hasReachedMaxStories
    ? maxStories + 1
    : maxStories;
  const { cardWidth, cardHeight } = getCardSizes(true);
  return (
    <Fragment>
      <WrapperStyle>
        <HeaderBar selectedProfile={selectedProfile} />
        {viewMode === ADD_STORY && (
          <React.Fragment>
            <Carousel
              userData={userData}
              totalCardsToShow={totalStoriesInCarousel}
              largeCards
              totalStories={
                (storyGroup.stories && storyGroup.stories.length) || 0
              }
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
                onAddNoteClick={storyCard => {
                  setStory(storyCard);
                  setViewMode(ADD_NOTE);
                }}
                onDeleteStoryClick={storyCard => onDeleteStory(storyCard)}
                onUploadFinished={fileUploaded =>
                  onUploadFinished(fileUploaded, storyGroup)
                }
                removeNotifications={onRemoveNotifications}
                notifyError={onShowErrorNotification}
                translations={translations}
              />
              {hasReachedMaxStories && (
                <CarouselCard
                  key="congrats"
                  cardHeight={cardHeight}
                  cardWidth={cardWidth}
                  largeCards
                  onMouseEnter={() => false}
                  onMouseLeave={() => false}
                  isTarget={false}
                >
                  <CarouselCardCongrats weight={fontWeightMedium}>
                    You’re a Stories superstar!
                  </CarouselCardCongrats>
                  <CarouselCardCongrats weight={fontWeight}>
                    {`You’ve hit the ${maxStories} media limit per scheduled Story.`}
                  </CarouselCardCongrats>
                </CarouselCard>
              )}
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
              selectedProfile={selectedProfile}
              isPastDue={storyGroup.isPastDue}
              sentPost={sentPost}
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
  uses24hTime: PropTypes.bool.isRequired,
  weekStartsMonday: PropTypes.bool.isRequired,
  selectedProfile: selectedProfilePropTypes, // eslint-disable-line react/require-default-props
  timezone: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  maxStories: PropTypes.number.isRequired,
  ...CardItem.propTypes,
};

StoryGroupWrapper.defaultProps = {
  editMode: false,
};

export default StoryGroupWrapper;
