import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import ComposerWrapper from './components/ComposerWrapper';

const ComposerPopover = ({
  onSave,
  transparentOverlay,
  preserveComposerStateOnClose,
  type,
}) => (
  <Popover
    width={'100%'}
    top={'5rem'}
    transparentOverlay={transparentOverlay}
    onOverlayClick={onSave}
  >
    <ComposerWrapper
      type={type}
      onSave={onSave}
      preserveStateOnClose={preserveComposerStateOnClose}
    />
  </Popover>
);

ComposerPopover.propTypes = {
  onSave: PropTypes.func.isRequired,
  transparentOverlay: PropTypes.bool,
  preserveComposerStateOnClose: PropTypes.bool,
  type: PropTypes.oneOf(['queue', 'drafts', 'sent', 'pastReminders']),
};

ComposerPopover.defaultProps = {
  transparentOverlay: false,
  preserveComposerStateOnClose: false,
  type: 'queue',
};

export default ComposerPopover;
