import React from 'react';
import PropTypes from 'prop-types';
import { Popover } from '@bufferapp/components';
import StoryGroupWrapper from '../StoryGroupWrapper';

const StoryGroupPopover = ({
  onOverlayClick,
}) => (
  <Popover
    width="100%"
    top="5rem"
    onOverlayClick={onOverlayClick}
  >
    <StoryGroupWrapper />
  </Popover>
);

StoryGroupPopover.propTypes = {
  onOverlayClick: PropTypes.func.isRequired,
};

export default StoryGroupPopover;
