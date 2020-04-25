import React from 'react';
import PropTypes from 'prop-types';
import ImagesLoadEvents from '@bufferapp/react-images-loaded';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import MediaAttachmentAvailableThumbnailButton from '../components/MediaAttachmentAvailableThumbnailButton';
import Button from '../components/styled/Button';
import Input from '../components/Input';
import { scrollIntoView } from '../utils/DOMUtils';
import styles from './css/MediaAttachmentEditor.css';

class MediaAttachmentEditor extends React.Component {
  static propTypes = {
    draft: PropTypes.object.isRequired,
    onMouseOut: PropTypes.func,
    onSubmit: PropTypes.func,
    className: PropTypes.string,
  };

  static defaultProps = {
    onMouseOut: () => {},
    onSubmit: () => {},
    className: '',
  };

  onAllThumbnailImagesLoadEvents = () => {
    if (this.selectedThumbnailEl) {
      scrollIntoView({
        el: this.selectedThumbnailEl,
        ref: this.scrollContainerEl,
        axis: 'horizontal',
        padding: 25,
      });
    }
  };

  onTitleChange = (draft, e) => {
    ComposerActionCreators.updateDraftVideoTitle(draft.id, e.target.value);
  };

  setSelectedThumbnailEl = el => {
    this.selectedThumbnailEl = el;
  };

  render() {
    const { draft, onMouseOut, onSubmit, className } = this.props;
    const { attachedMediaEditingPayload: video } = draft;

    const availableThumbnails = video.availableThumbnails || [video.thumbnail];

    return (
      <div
        className={`${styles.container} ${className}`}
        onMouseOut={onMouseOut}
      >
        <label className={styles.header} htmlFor="video-title-input">
          Title:
        </label>
        <Input
          type="text"
          value={video.name}
          onChange={this.onTitleChange.bind(this, draft)}
          id="video-title-input"
          className={styles.input}
        />
        <p className={styles.header}>Thumbnail:</p>
        <div
          className={styles.scrollContainer}
          ref={ref => {
            this.scrollContainerEl = ref;
          }}
        >
          <ImagesLoadEvents onAlways={this.onAllThumbnailImagesLoadEvents}>
            {availableThumbnails.map(thumbnail => (
              <MediaAttachmentAvailableThumbnailButton
                video={video}
                thumbnail={thumbnail}
                setSelectedThumbnailEl={this.setSelectedThumbnailEl}
                draftId={draft.id}
                key={thumbnail}
              />
            ))}
          </ImagesLoadEvents>
        </div>
        <Button onClick={onSubmit} className={styles.submitButton}>
          Done
        </Button>
      </div>
    );
  }
}

export default MediaAttachmentEditor;
