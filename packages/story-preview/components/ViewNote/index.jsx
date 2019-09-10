import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';

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
  margin: 0;
`;

const Note = styled(Text)`
  margin-top: 8px;
`;

const ViewNote = ({
  onEditNoteClick,
  // dummy data until we get uploading/adding story done
  story = { note: '', id: 1, thumbnail: 'https://images.unsplash.com/photo-1562887189-e5d078343de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80' },
}) => {
  const hasNoNote = !story.note || story.note.length < 0;
  return (
    <ContentWrapper>
      <Title type="h3">Note</Title>
      <NoteWrapper>
        {hasNoNote
          && (
            <Note type="p" color="gray">When it comes time to post, you'll be able to copy and past your note into instagram.</Note>
          )
        }
        {!hasNoNote
          && (
            <Note type="p">{story.note}</Note>
          )
        }
      </NoteWrapper>
      <Button
        type="secondary"
        label={hasNoNote ? 'Add Note' : 'Edit Note'}
        onClick={onEditNoteClick}
        fullWidth
      />
    </ContentWrapper>
  );
};

ViewNote.propTypes = {
  onEditNoteClick: PropTypes.func.isRequired,
  story: PropTypes.shape({
    thumbnail: PropTypes.string,
    note: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default ViewNote;
