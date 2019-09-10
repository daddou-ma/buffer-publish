import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Carousel from '@bufferapp/publish-shared-components/Carousel';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import HeaderBar from '../HeaderBar';
import AddNote from '../AddNote';
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
  editingStoryGroup,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
  onComposerClick,
  onSetShowDatePicker,
  showDatePicker,
  userData,
  draft,
}) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(ADD_NOTE);
  const cards = editingStoryGroup ? editingStoryGroup.storyDetails.stories : [];
  return (
    <Fragment>
      <WrapperStyle>
        <HeaderBar
          selectedProfile={selectedProfile}
        />
        {viewMode === ADD_STORY && (
          <React.Fragment>
            <Carousel
              editMode
              cards={cards}
              userData={userData}
            />
            <AddStoryFooter
              onClick={() => onComposerClick(showDatePicker)}
              timezone={timezone}
              weekStartsMonday={weekStartsMonday}
              uses24hTime={uses24hTime}
              isScheduleLoading={isScheduleLoading}
              translations={translations}
              editingStoryGroup={editingStoryGroup}
              onCreateStoryGroup={onCreateStoryGroup}
              onUpdateStoryGroup={onUpdateStoryGroup}
              onSetShowDatePicker={onSetShowDatePicker}
              showDatePicker={showDatePicker}
            />
          </React.Fragment>
        )}
        {viewMode === ADD_NOTE && (
          <AddNote
            translations={translations}
            onCancelClick={() => setViewMode(ADD_STORY)}
            story={draft.stories[0]}
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
  ...HeaderBar.PropTypes,
  ...DateTimeSlotPickerWrapper.propTypes,
  ...AddStoryFooter.propTypes,
};

export default StoryGroupWrapper;
