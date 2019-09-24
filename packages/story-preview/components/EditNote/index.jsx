import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, TextArea } from '@bufferapp/ui';
import { storyPropTypes } from '../../utils/commonPropTypes';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NoteWrapper = styled.div`
  flex-grow: 1;
  margin-bottom: 24px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  button:last-of-type {
    margin-left: 10px;
  }
`;

const EditNote = ({
  onSaveNoteClick,
  onCancelClick,
  story,
}) => {
  const [note, setNote] = useState(story.note || '');
  const setNoteValue = (event) => {
    const { value } = event.target;
    setNote(value);
  };

  return (
    <ContentWrapper>
      <NoteWrapper>
        <TextArea
          label="Note"
          value={note}
          placeholder="Add your caption or a note-to-self"
          onChange={setNoteValue}
          id="noteTextArea"
          fullHeight
          autoFocus
        />
      </NoteWrapper>
      <ButtonWrapper>
        <Button
          type="text"
          label="Cancel"
          onClick={onCancelClick}
        />
        <Button
          type="primary"
          label="Save Note"
          onClick={() => onSaveNoteClick({ order: story.order, note })}
        />
      </ButtonWrapper>
    </ContentWrapper>
  );
};

EditNote.propTypes = {
  onSaveNoteClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  story: storyPropTypes, // eslint-disable-line react/require-default-props
};

export default EditNote;
