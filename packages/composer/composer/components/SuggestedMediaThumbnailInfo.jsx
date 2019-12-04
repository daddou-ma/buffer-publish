import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/SuggestedMediaBox.css';

const SuggestedMediaThumbnailInfo = props => {
  const iconClassName = [styles.imgIcon, 'bi bi-image'].join(' ');

  return (
    <span className={styles.imgDataContainer}>
      <div className={styles.thumbnailInfo}>
        <div className={styles.thumbnailInfoText}>
          <div className={iconClassName} />
          {props.width} × {props.height}
        </div>
      </div>
    </span>
  );
};

SuggestedMediaThumbnailInfo.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default SuggestedMediaThumbnailInfo;
