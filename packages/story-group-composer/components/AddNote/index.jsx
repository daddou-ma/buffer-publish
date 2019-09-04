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

const imageStyle = {
  width: '180px',
  height: '320px',
  objectFit: 'cover',
};

const AddNote = ({
  saveNote,
  setViewMode,
  // dummy data until we get uploading/adding story done
  story = { note: null, id: 1, thumbnail: 'https://images.unsplash.com/photo-1562887189-e5d078343de4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80'},
}) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [note, setNote] = useState(story.note);
  const setStoryNote = (event) => {
    const { value } = event.target;
    setNote(value);
  };

  return (
    <Fragment>
      <BodyWrapperStyle>
        <div>
          <img
            style={imageStyle}
            src={story.thumbnail}
            alt="Instagram story media"
          />
        </div>
        <NoteSection note={story.note} setNote={setStoryNote} />
      </BodyWrapperStyle>
      <FooterBar>
        <ButtonStyle>
          <Button
            type="text"
            label="Cancel"
            onClick={() => setViewMode('addStory')}
          />
        </ButtonStyle>
        <Button
          type="primary"
          label="Save Note"
          onClick={() => {
            saveNote({ storyId: story.id, note });
            setViewMode('addStory');
          }}
        />
      </FooterBar>
    </Fragment>
  );
};

AddNote.propTypes = {
  story: PropTypes.shape({
    thumbnail: PropTypes.string,
    note: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  saveNote: PropTypes.func.isRequired,
  setViewMode: PropTypes.func.isRequired,
};

export default AddNote;
