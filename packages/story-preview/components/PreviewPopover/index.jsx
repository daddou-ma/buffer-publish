import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import NoteWrapper from '../NoteWrapper';

const PreviewPopover = ({
  onOverlayClick,
  onSaveNoteClick,
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <NoteWrapper
      onSaveNoteClick={onSaveNoteClick}
    />

  </Popover>
);

PreviewPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
  onSaveNoteClick: PropTypes.func.isRequired,
};

export default PreviewPopover;
