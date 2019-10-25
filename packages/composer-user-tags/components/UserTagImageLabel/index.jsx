import React from 'react';
import PropTypes from 'prop-types';

const calculateTagStyles = ({ tag, showTags }) => ({
  position: 'absolute',
  left: `${tag.clientX}px`,
  top: `${tag.clientY}px`,
  color: 'white',
  backgroundColor: 'black',
  borderRadius: '7%',
  padding: '2px 5px',
  opacity: '0.7',
  display: showTags ? 'block' : 'none',
});

const UserTagImageLabel = ({ tag, showTags }) => (
  <div style={calculateTagStyles({ tag, showTags })}>{tag.username}</div>
);

UserTagImageLabel.propTypes = {
  tag: PropTypes.shape({
    username: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
  }).isRequired,
  showTags: PropTypes.bool.isRequired,
};

export default UserTagImageLabel;
