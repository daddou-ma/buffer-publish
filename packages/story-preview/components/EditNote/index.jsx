import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { grayDarker, grayLight } from '@bufferapp/ui/style/colors';
import { fontFamily, fontSize, fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { borderRadius } from '@bufferapp/ui/style/borders';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const NoteWrapper = styled.div`
  flex-grow: 1;
  margin-bottom: 24px;
  overflow-y: auto;
`;

const Title = styled(Text)`
  margin: 0 0 8px;
  font-weight: ${fontWeightMedium};
`;

// Temporary, textarea will be replaced by BDS Textarea component
const TextAreaWrapper = styled.div`
  height: 100%;
  position: relative;
  flex: 1;
  padding: 16px 16px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid ${grayLight};
  border-radius: ${borderRadius};
`;

const textareaStyle = {
  resize: 'none',
  outline: 'none',
  fontSize,
  lineHeight: '20px',
  fontFamily,
  width: '100%',
  height: '100%',
  color: grayDarker,
  border: 'none',
};

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
  const [note, setNote] = useState(story.note);
  const setNoteValue = (event) => {
    const { value } = event.target;
    setNote(value);
  };

  return (
    <ContentWrapper>
      <Title type="p">Note</Title>
      <NoteWrapper>
        <TextAreaWrapper>
          <textarea
            style={textareaStyle}
            type="input"
            value={note}
            onChange={setNoteValue}
            placeholder="Add your caption or a note-to-self"
          />
        </TextAreaWrapper>
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
          onClick={onSaveNoteClick}
        />
      </ButtonWrapper>
    </ContentWrapper>
  );
};

EditNote.propTypes = {
  onSaveNoteClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  story: PropTypes.shape({
    note: PropTypes.string,
    type: PropTypes.oneOf(['image', 'video', 'gif']),
    order: PropTypes.number,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  }).isRequired,
};

export default EditNote;
