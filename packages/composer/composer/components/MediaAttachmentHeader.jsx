/**
 * Component that provides a bit of context at the top of each Media Attachment
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/MediaAttachmentHeader.css';

const MediaAttachmentHeader = props => {
  const maxAttachableImagesCount = props.maxAttachableImagesCount;

  const mediaAttachmentHeaderClassName = [
    styles.mediaAttachmentHeader,
    props.className,
  ].join(' ');

  return (
    <div className={mediaAttachmentHeaderClassName}>
      Add up to {maxAttachableImagesCount} image
      {maxAttachableImagesCount > 1 ? 's ' : ' '}
      or 1 video
    </div>
  );
};

MediaAttachmentHeader.propTypes = {
  maxAttachableImagesCount: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default MediaAttachmentHeader;
