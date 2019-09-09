import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ViewNote from '../ViewNote';
import EditNote from '../EditNote';

const SEE_NOTE = 'seeNote';
const EDIT_NOTE = 'editNote';

const WrapperStyle = styled.div`
  width: 275px;
  height: 592px; 
  border: 1px solid gray;
  padding: 32px 16px 24px;
`;

/*
 * Wrapper to make sure to display one of two views: see note or edit note
 */

const NoteWrapper = ({
  onSaveNoteClick,
}) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(SEE_NOTE);
  return (
    <Fragment>
      <WrapperStyle>
        {viewMode === SEE_NOTE
          && (
            <ViewNote
              onEditNoteClick={() => setViewMode(EDIT_NOTE)}
            />
          )
        }
        {viewMode === EDIT_NOTE
          && (
            <EditNote
              onSaveNoteClick={onSaveNoteClick}
              onCancelClick={() => setViewMode(SEE_NOTE)}
            />
          )
        }
      </WrapperStyle>
    </Fragment>
  );
};

NoteWrapper.propTypes = {
  onSaveNoteClick: PropTypes.func.isRequired,
};

export default NoteWrapper;
