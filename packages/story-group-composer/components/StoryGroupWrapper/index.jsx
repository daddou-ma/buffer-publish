import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';

const WrapperStyle = styled.div`
  width: 686px;
  height: 100%;
  background-color: white;
  top: 0;
  right: 0;
  border-radius: 3px;
`;

const ADD_STORY = 'addStory';
const ADD_NOTE = 'addNote';

/*
 * Wrapper to make sure to display add story view or add note view
 */

const StoryGroupWrapper = ({
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
}) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(ADD_STORY);

  return (
    <WrapperStyle>
      {viewMode === ADD_STORY && (
        <div>
          Add story view
          <div onClick={() => onUpdateStoryGroup('', '', '')}> Update</div>
          <div onClick={() => onCreateStoryGroup('')}> Create</div>
          <div onClick={() => onDeleteStoryGroup('')}> Delete</div>
        </div>
      )}
      {viewMode === ADD_NOTE &&
        <div>Add note view</div>
      }
    </WrapperStyle>
  );
};

StoryGroupWrapper.propTypes = {
  ...DateTimeSlotPickerWrapper.propTypes,
};

export default StoryGroupWrapper;
