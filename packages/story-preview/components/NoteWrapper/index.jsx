import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ViewNote from '../ViewNote';
import EditNote from '../EditNote';

const SEE_NOTE = 'seeNote';
const EDIT_NOTE = 'editNote';

const WrapperStyle = styled.div`
  flex: 1;
  padding: 32px 16px 24px;
`;

/*
 * Wrapper to make sure to display one of two views: see note or edit note
 */

const NoteWrapper = ({
  onSaveNoteClick,
  story,
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
              story={story}
            />
          )
        }
        {viewMode === EDIT_NOTE
          && (
            <EditNote
              onSaveNoteClick={({ order, note }) => {
                onSaveNoteClick({ order, note });
                setViewMode(SEE_NOTE);
              }}
              onCancelClick={() => setViewMode(SEE_NOTE)}
              story={story}
            />
          )
        }
      </WrapperStyle>
    </Fragment>
  );
};

NoteWrapper.propTypes = {
  onSaveNoteClick: PropTypes.func.isRequired,
  story: PropTypes.shape({
    note: PropTypes.string,
    type: PropTypes.oneOf(['image', 'video', 'gif']),
    order: PropTypes.number,
    asset_url: PropTypes.string,
    thumbnail_url: PropTypes.string,
  }).isRequired,
};

export default NoteWrapper;
