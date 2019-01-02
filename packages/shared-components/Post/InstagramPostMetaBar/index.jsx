import React from 'react';
import PropTypes from 'prop-types';
import PostMetaBar from '../../PostMetaBar';

const InstagramPostMetaBar = ({
  dragging,
  locationName,
  isSent,
}) => {
  const leftContent = { title: 'Location:', text: locationName };
  return (
    <PostMetaBar
      dragging={dragging}
      leftContent={leftContent}
      isSent={isSent}
    />
  );
};

InstagramPostMetaBar.propTypes = {
  locationName: PropTypes.string,
  dragging: PropTypes.bool,
  isSent: PropTypes.bool,
};

export default InstagramPostMetaBar;
