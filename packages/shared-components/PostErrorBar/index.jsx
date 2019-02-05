import React from 'react';
import PropTypes from 'prop-types';
import { mystic, offWhite } from '@bufferapp/components/style/color';
import { borderWidth } from '@bufferapp/components/style/border';
import { Text, WarningIcon } from '@bufferapp/components';

const errorBarStyle = dragging => ({
  display: 'flex',
  padding: '0.5rem 1rem',
  backgroundColor: offWhite,
  borderTop: `${borderWidth} solid ${mystic}`,
  borderBottom: `${borderWidth} solid ${mystic}`,
  opacity: dragging ? 0 : 1,
  marginBottom: 10,
});

const postActionDetailsIconStyle = {
  marginRight: '0.5rem',
  display: 'flex',
  alignItems: 'center',
};

const PostErrorBar = ({ dragging, error }) => (
  <div style={errorBarStyle(dragging)}>
    <div style={postActionDetailsIconStyle}>
      <WarningIcon color={'torchRed'} />
    </div>
    <Text
      size={'small'}
      color={'torchRed'}
    >
      {error}
    </Text>
  </div>
);

PostErrorBar.propTypes = {
  error: PropTypes.string,
  dragging: PropTypes.bool,
};

export default PostErrorBar;
