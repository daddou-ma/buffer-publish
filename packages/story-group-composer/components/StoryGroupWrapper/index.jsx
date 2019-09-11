import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import HeaderBar from '../HeaderBar';
import AddNote from '../AddNote';
import Carousel from '@bufferapp/publish-shared-components/Carousel';

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

const FooterBar = styled.div`
  padding: 13px 0;
  display: flex;
`;

/*
 * Wrapper to make sure to display add story view or add note view
 */

const StoryGroupWrapper = ({
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  translations,
  selectedProfile,
  saveNote,
  editingStoryGroup,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
  userData,
  onUploadFinished,
}) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(ADD_STORY);
  const cards = editingStoryGroup ? editingStoryGroup.storyDetails.stories : [];

  return (
    <Fragment>
      <WrapperStyle>
        <HeaderBar
          selectedProfile={selectedProfile}
        />
        {viewMode === ADD_STORY &&
        /* TODO: delete this button once the create story group is in place */
        (
          <React.Fragment>
            <Carousel
              editMode
              cards={cards}
              userData={userData}
              onUploadFinished={fileUploaded => onUploadFinished(fileUploaded, editingStoryGroup)}
            />
            <Button
              type="primary"
              size="small"
              label="Create"
              onClick={() => onCreateStoryGroup()}
            />
            {editingStoryGroup && (
              <Button
                type="primary"
                size="small"
                label="Update"
                onClick={() => onUpdateStoryGroup(
                  editingStoryGroup.scheduledAt,
                  cards,
                  editingStoryGroup.id,
                )}
              />
            )}
            <FooterBar>
              <Button label="Preview" onClick={() => true} />
              <Button label="Schedule Story" onClick={() => true} />
            </FooterBar>
          </React.Fragment>
        )}
        {viewMode === ADD_NOTE && (
          <AddNote
            translations={translations}
            onCancelClick={() => setViewMode(ADD_STORY)}
            onSaveNoteClick={({storyId, note}) => {
              saveNote({storyId, note});
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
  selectedProfile: HeaderBar.propTypes.selectedProfile.isRequired,
  ...DateTimeSlotPickerWrapper.propTypes,
  userData: PropTypes.shape({}).isRequired,
  onUploadFinished: PropTypes.func,
};

StoryGroupWrapper.defaultProps = {
  onUploadFinished: () => {},
};

export default StoryGroupWrapper;
