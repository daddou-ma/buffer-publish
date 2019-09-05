import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import HeaderBar from '../HeaderBar';
import AddNote from '../AddNote';

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
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  selectedProfile,
  saveNote,
}) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(ADD_STORY);
  return (
    <WrapperStyle>
      <HeaderBar
        selectedProfile={selectedProfile}
      />
      {viewMode === ADD_STORY &&
        <div>Add story view</div>
      }
      {viewMode === ADD_NOTE && (
        <AddNote
          setViewMode={setViewMode}
          saveNote={saveNote}
        />
      )}
    </WrapperStyle>
  );
};

StoryGroupWrapper.propTypes = {
  ...DateTimeSlotPickerWrapper.propTypes,
};

export default StoryGroupWrapper;
