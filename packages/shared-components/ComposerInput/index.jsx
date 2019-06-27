import React from 'react';
import PropTypes from 'prop-types';
import CameraIcon from '@bufferapp/ui/Icon/Icons/Camera';

const composerInputStyle = {
  alignItems: 'center',
  backgroundColor: '#ffffff',
  border: '1px solid #B8B8B8',
  borderRadius: '4px',
  boxShadow: '0 1px 4px rgba(0,0,0,.16)',
  color: '#999999',
  cursor: 'pointer',
  display: 'flex',
  fontFamily: 'Roboto',
  fontSize: '14px',
  height: '48px',
  outline: 'none',
  paddingLeft: '16px',
  paddingRight: '16px',
  width: '100%',
};

const composerInputIcoCameraStyle = {
  width: '16px',
  height: '16px',
  marginLeft: 'auto',
};

const ComposerInput = ({
  onPlaceholderClick,
  placeholder,
  isDisabled,
}) =>
  <button
    style={composerInputStyle}
    onClick={onPlaceholderClick}
    disabled={isDisabled}
  >
    {placeholder}
    <div style={composerInputIcoCameraStyle}>
      <CameraIcon />
    </div>
  </button>;


ComposerInput.propTypes = {
  onPlaceholderClick: PropTypes.func,
  placeholder: PropTypes.string,
  isDisabled: PropTypes.bool,
};

ComposerInput.defaultProps = {
  isDisabled: false,
};

export default ComposerInput;
