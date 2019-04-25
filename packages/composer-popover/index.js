import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import ComposerWrapper from './components/ComposerWrapper';

const ComposerPopover = ({
  onSave,
  onInteraction,
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
      onInteraction={onInteraction}
      preserveStateOnClose={preserveComposerStateOnClose}
    />
  </Popover>
);

ComposerPopover.propTypes = {
  onSave: PropTypes.func.isRequired,
  onInteraction: PropTypes.func,
  transparentOverlay: PropTypes.bool,
  preserveComposerStateOnClose: PropTypes.bool,
  type: PropTypes.oneOf(['queue', 'drafts', 'sent', 'pastReminders']),
};

ComposerPopover.defaultProps = {
  transparentOverlay: false,
  preserveComposerStateOnClose: false,
  type: 'queue',
  onInteraction: () => {},
};

export default ComposerPopover;
