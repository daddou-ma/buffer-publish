import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Text, Button } from '@bufferapp/ui';
import { fontWeightMedium } from '@bufferapp/ui/style/fonts';

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
  font-weight: ${fontWeightMedium};
`;

const Note = styled(Text)`
  margin-top: 8px;
`;

const ViewNote = ({
  onEditNoteClick,
  story,
}) => {
  const hasNoNote = !story.note || story.note.length < 0;
  return (
    <ContentWrapper>
      <Title type="p">Note</Title>
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
    note: PropTypes.string,
    type: PropTypes.oneOf(['image', 'video', 'gif']),
    order: PropTypes.string,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  }).isRequired,
};

export default ViewNote;
