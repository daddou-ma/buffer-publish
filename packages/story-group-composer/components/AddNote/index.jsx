import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';
import NoteSection from '../NoteSection';

const FooterBar = styled.div`
  padding: 13px 0px 0px;
  display: flex;
`;

const BodyWrapperStyle = styled.div`
  display: flex;
`;

const ButtonStyle = styled.div`
  margin-left: auto;
  margin-right: 5px;
`;

const StyledImage = styled.img`
  width: 180px;
  height: 320px;
  object-fit: cover;
`;

const AddNote = ({
  onSaveNoteClick,
  onCancelClick,
  translations,
  // dummy data until we get uploading/adding story done
  story,
}) => {
  const [note, setNote] = useState(story.note);
  const setNoteValue = (event) => {
    const { value } = event.target;
    setNote(value);
  };

  return (
    <Fragment>
      <BodyWrapperStyle>
        <div>
          <StyledImage
            src={story.thumbnail_url}
            alt={translations.noteImageAlt}
          />
        </div>
        <NoteSection
          note={story.note}
          setNote={setNoteValue}
          translations={translations}
        />
      </BodyWrapperStyle>
      <FooterBar>
        <ButtonStyle>
          <Button
            type="text"
            label={translations.cancelNoteButton}
            onClick={onCancelClick}
          />
        </ButtonStyle>
        <Button
          type="primary"
          label={translations.saveNoteButton}
          onClick={() => onSaveNoteClick({ order: story.order, note })}
        />
      </FooterBar>
    </Fragment>
  );
};

AddNote.propTypes = {
  onSaveNoteClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  story: PropTypes.shape({
    thumbnail_url: PropTypes.string,
    note: PropTypes.string,
    order: PropTypes.number,
  }).isRequired,
  translations: PropTypes.shape({
    saveNoteButton: PropTypes.string,
    cancelNoteButton: PropTypes.string,
    noteImageAlt: PropTypes.string,
  }).isRequired,
};

export default AddNote;
