import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../__legacy-buffer-web-shared-components__/modal/modal';
import styles from './css/MediaZoomBox.css';
import ImageDescriptionInput from '../components/ImageDescriptionInput';
import { MediaTypes } from '../AppConstants';
import { getHumanReadableSize } from '../utils/StringUtils';

class MediaZoomBox extends React.Component {
  static propTypes = {
    media: PropTypes.object.isRequired,
    draftId: PropTypes.string.isRequired,
    showTwitterImageDescription: PropTypes.bool.isRequired,
    composerPosition: PropTypes.object,
  };

  static defaultProps = {
    composerPosition: null,
  };

  render() {
    const { media, draftId, showTwitterImageDescription, composerPosition } = this.props;

    const modalClassNames = {
      modal: styles.modalStyles,
      closeButton: styles.closeButton,
    };

    const modalDynamicStyles = {
      top: composerPosition !== null ? `${composerPosition.top}px` : '30px',
    };

    return (
      <Modal classNames={modalClassNames} modalCustumStyle={modalDynamicStyles}>
        {media.mediaType === MediaTypes.GIF &&
          <div className={styles.mediaContainer}>
            <img className={styles.media} alt="" src={media.url} />
          </div>}
        {media.mediaType === MediaTypes.IMAGE &&
          <div className={styles.mediaContainer}>
            <img className={styles.media} alt="" src={media.url} />
            {showTwitterImageDescription &&
              <ImageDescriptionInput draftId={draftId} mediaAttachment={media} />}
          </div>}
        {media.mediaType === MediaTypes.VIDEO &&
          <div className={styles.mediaContainer}>
            <video className={styles.media} poster={media.thumbnail} controls src={media.url} />
            <div className={styles.fileSize}>{getHumanReadableSize(media.size)}</div>
          </div>
        }
      </Modal>
    );
  }
}

export default MediaZoomBox;
