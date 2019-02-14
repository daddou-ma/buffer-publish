import React from 'react';
import PropTypes from 'prop-types';
import PostMetaBar from '../../PostMetaBar';

const InstagramPostMetaBar = ({
  dragging,
  locationName,
  isSent,
  isPastReminder,
}) => {
  const leftContent = { title: 'Location:', text: locationName };
  return (
    <PostMetaBar
      dragging={dragging}
      leftContent={leftContent}
      isSent={isSent}
      isPastReminder={isPastReminder}
    />
  );
};

InstagramPostMetaBar.propTypes = {
  locationName: PropTypes.string,
  dragging: PropTypes.bool,
  isSent: PropTypes.bool,
  isPastReminder: PropTypes.bool,
};

export default InstagramPostMetaBar;
