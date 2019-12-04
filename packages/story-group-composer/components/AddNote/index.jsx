import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@bufferapp/ui';
import { getLargeSafeImageUrl } from '@bufferapp/publish-story-group-composer/utils/SafeImage';
import NoteSection from '../NoteSection';
import { translationsPropTypes } from '../../utils/commonPropTypes';

const FooterBar = styled.div`
  padding: 13px 0px 0px;
  display: flex;
`;

const ContentWrapper = styled.div`
  display: flex;
`;

const ButtonStyle = styled.div`
  margin-left: auto;
  margin-right: 5px;
`;

const StyledImage = styled.img`
  object-fit: cover;
`;

const AddNote = ({ onSaveNoteClick, onCancelClick, translations, story }) => {
  const [note, setNote] = useState(story ? story.note : null);
  const setNoteValue = event => {
    const { value } = event.target;
    setNote(value);
  };

  return (
    <Fragment>
      <ContentWrapper>
        <div>
          <StyledImage
            src={getLargeSafeImageUrl(story.thumbnail_url)}
            alt={translations.noteImageAlt}
            height="320px"
            width="180px"
          />
        </div>
        <NoteSection
          note={note}
          setNote={setNoteValue}
          translations={translations}
        />
      </ContentWrapper>
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
    type: PropTypes.oneOf(['image', 'video', 'gif']),
  }).isRequired,
  translations: translationsPropTypes, // eslint-disable-line react/require-default-props,,
};

export default AddNote;
