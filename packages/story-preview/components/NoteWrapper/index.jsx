import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ViewNote from '../ViewNote';
import EditNote from '../EditNote';
import {
  storyPropTypes,
  translationsPropTypes,
} from '../../utils/commonPropTypes';

const SEE_NOTE = 'seeNote';
const EDIT_NOTE = 'editNote';

const WrapperStyle = styled.div`
  flex: 1;
  padding: 32px 16px 24px;
`;

/*
 * Wrapper to make sure to display one of two views: see note or edit note
 */

const NoteWrapper = ({ onSaveNoteClick, story, view, translations }) => {
  // hooks: https://reactjs.org/docs/hooks-state.html
  const [viewMode, setViewMode] = useState(SEE_NOTE);
  return (
    <Fragment>
      <WrapperStyle>
        {viewMode === SEE_NOTE && (
          <ViewNote
            onEditNoteClick={() => setViewMode(EDIT_NOTE)}
            story={story}
            translations={translations}
          />
        )}
        {viewMode === EDIT_NOTE && (
          <EditNote
            onSaveNoteClick={({ order, note }) => {
              onSaveNoteClick({ order, note, view });
              setViewMode(SEE_NOTE);
            }}
            onCancelClick={() => setViewMode(SEE_NOTE)}
            story={story}
            translations={translations}
          />
        )}
      </WrapperStyle>
    </Fragment>
  );
};

NoteWrapper.propTypes = {
  onSaveNoteClick: PropTypes.func.isRequired,
  story: storyPropTypes, // eslint-disable-line react/require-default-props
  view: PropTypes.oneOf(['composer', 'queue']).isRequired,
  translations: translationsPropTypes, // eslint-disable-line react/require-default-props
};

export default NoteWrapper;
