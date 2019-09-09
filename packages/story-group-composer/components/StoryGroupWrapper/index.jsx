import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Button } from '@bufferapp/ui';
import DateTimeSlotPickerWrapper from '../DateTimeSlotPickerWrapper';
import HeaderBar from '../HeaderBar';
import AddNote from '../AddNote';
import CardCarousel from '../CardCarousel';

const cardsToShow = 15;

const WrapperStyle = styled.div`
  background-color: white;
  border-radius: 3px;
  height: 100%;
  padding: 16px;
  right: 0;
  top: 0;
  width: 686px;
`;

const FooterBar = styled.div`
  padding: 13px 0;
  display: flex;
`;

const BodyContainer = styled.div`
  display: flex;
  position: relative;
  margin-left: -16px;
  margin-right: -16px;
  max-width: 718px;
  overflow: hidden;
`;

const ADD_STORY = 'addStory';
const ADD_NOTE = 'addNote';

const StoryGroupWrapper = ({
  translations,
  saveNote,
  onCreateStoryGroup,
  onUpdateStoryGroup,
  onDeleteStoryGroup,
  onDateTimeSlotPickerSubmit,
  uses24hTime,
  timezone,
  weekStartsMonday,
  selectedProfile,
  userData,
}) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(ADD_STORY);

  return (
    <WrapperStyle>
      {viewMode === ADD_STORY
      && (
        <React.Fragment>
          <HeaderBar selectedProfile={selectedProfile} />
          <BodyContainer>
            <CardCarousel userData={userData} cardsToShow={cardsToShow} />
          </BodyContainer>
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
          onSaveNoteClick={({ storyId, note }) => {
            saveNote({ storyId, note });
            setViewMode(ADD_STORY);
          }}
        />
      )}
    </WrapperStyle>
  );
};

StoryGroupWrapper.propTypes = {
  saveNote: PropTypes.func.isRequired,
  selectedProfile: HeaderBar.propTypes.selectedProfile.isRequired,
  ...DateTimeSlotPickerWrapper.propTypes,
  userData: PropTypes.shape({}).isRequired,
};

export default StoryGroupWrapper;
