import React from 'react';
import PropTypes from 'prop-types';
import { mystic, offWhite, torchRed } from '@bufferapp/components/style/color';
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
  marginRight: '1rem',
  display: 'flex',
  alignItems: 'center',
};

const createMarkup = error => (
  { __html: error }
);

// Need to add <a> style because can't directly get to <a> in error html string
const PostErrorBar = ({ dragging, error }) => (
  <div id="errorBar" style={errorBarStyle(dragging)}>
    <style>{`
      #errorBar a { color: ${torchRed}; }
    `}
    </style>
    <div style={postActionDetailsIconStyle}>
      <WarningIcon color={'torchRed'} />
    </div>
    <Text
      size={'small'}
      color={'torchRed'}
    >
      <div dangerouslySetInnerHTML={createMarkup(error)} />
    </Text>
  </div>
);

PostErrorBar.propTypes = {
  error: PropTypes.string,
  dragging: PropTypes.bool,
};

export default PostErrorBar;
