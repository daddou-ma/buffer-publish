import React from 'react';
import PropTypes, { bool } from 'prop-types';
import { Button } from '@bufferapp/ui';
import styled from 'styled-components';

const StyledButton = styled(Button)`
  position: absolute;
  top: -1000px;
  left: -1000px;
  height: 1px;
  width: 1px;
  overflow: hidden;

  :focus {
    left: auto;
    top: auto;
    position: relative;
    height: 44px;
    width: auto;
    overflow: visible;
    margin-left: 7px;
  }
`;

const SkipToComposer = ({ onSkipToComposerClick }) => (
  <div>
    <StyledButton label="Skip to Composer" onClick={onSkipToComposerClick} />
  </div>
);

SkipToComposer.propTypes = {
  onSkipToComposerClick: PropTypes.func.isRequired,
  translations: PropTypes.shape({
    skipToComposer: PropTypes.string,
  }).isRequired,
};

export default SkipToComposer;
