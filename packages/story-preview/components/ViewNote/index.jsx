import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { fontWeightMedium } from '@bufferapp/ui/style/fonts';
import { grayDark } from '@bufferapp/ui/style/colors';
import { storyPropTypes } from '../../utils/commonPropTypes';

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
  line-height: 16px;
  margin: 0;
  font-weight: ${fontWeightMedium};
`;

const Note = styled(Text)`
  margin-top: 8px;
  color: ${grayDark};
`;

const ViewNote = ({ onEditNoteClick, story, translations }) => {
  const hasNoNote = !story.note || story.note.length < 0;
  return (
    <ContentWrapper>
      <Title type="p">{translations.noteTitle}</Title>
      <NoteWrapper>
        {hasNoNote && <Note type="p">{translations.noteExplanation}</Note>}
        {!hasNoNote && <Note type="p">{story.note}</Note>}
      </NoteWrapper>
      <Button
        type="secondary"
        label={hasNoNote ? translations.addNote : translations.editNote}
        onClick={onEditNoteClick}
        fullWidth
      />
    </ContentWrapper>
  );
};

ViewNote.propTypes = {
  onEditNoteClick: PropTypes.func.isRequired,
  story: storyPropTypes, // eslint-disable-line react/require-default-props
  translations: PropTypes.shape({
    noteTitle: PropTypes.string.isRequired,
    noteExplanation: PropTypes.string.isRequired,
    addNote: PropTypes.string.isRequired,
    editNote: PropTypes.string.isRequired,
  }).isRequired,
};

export default ViewNote;
