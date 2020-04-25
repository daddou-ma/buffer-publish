import React from 'react';
import PropTypes from 'prop-types';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import Button from '../components/styled/Button';
import styles from './css/MediaAttachmentEditor.css';

class MediaAttachmentAvailableThumbnailButton extends React.Component {
  static propTypes = {
    video: PropTypes.object.isRequired,
    thumbnail: PropTypes.string.isRequired,
    setSelectedThumbnailEl: PropTypes.func.isRequired,
    draftId: PropTypes.string.isRequired,
  };

  onSuggestedThumbnailClick = () => {
    ComposerActionCreators.updateDraftVideoThumbnail(
      this.props.draftId,
      this.props.thumbnail
    );
  };

  render() {
    const { video, thumbnail, setSelectedThumbnailEl } = this.props;

    const className =
      thumbnail === video.thumbnail
        ? `${styles.selectedThumbnailContainer} bi bi-checkmark`
        : styles.thumbnailContainer;

    return (
      <Button
        className={className}
        onClick={this.onSuggestedThumbnailClick}
        key={thumbnail}
      >
        <img
          src={thumbnail}
          className={styles.thumbnail}
          alt="Suggested thumbnail for video"
          ref={ref => {
            if (thumbnail === video.thumbnail) setSelectedThumbnailEl(ref);
          }}
        />
      </Button>
    );
  }
}

export default MediaAttachmentAvailableThumbnailButton;
