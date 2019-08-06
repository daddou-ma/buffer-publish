import React from 'react';
import PropTypes from 'prop-types';

import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import AppActionCreators from '../action-creators/AppActionCreators';
import CloseButton from '../components/CloseButton';
import Button from '../components/Button';
import { escapeParens } from '../utils/StringUtils';
import { MediaTypes } from '../AppConstants';
import styles from './css/MediaAttachmentThumbnail.css';
import ModalActionCreators from '../__legacy-buffer-web-shared-components__/modal/actionCreators';

class MediaAttachmentThumbnail extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    className: PropTypes.string,
    media: PropTypes.object.isRequired,
    showTwitterImageDescription: PropTypes.bool.isRequired,
    composerPosition: PropTypes.object,
    canEditVideoAttachment: PropTypes.bool,
  };

  static defaultProps = {
    composerPosition: null,
    canEditVideoAttachment: null,
  };

  onClickVideo = () => {
    const { media, draftId, showTwitterImageDescription, composerPosition } = this.props;
    console.debug("Open modal of video");


    ModalActionCreators.openModal('MediaZoomBox', {
      media, draftId, showTwitterImageDescription, composerPosition,
    });
  }

  onClickImage = () => {
    const { media, draftId, showTwitterImageDescription, composerPosition } = this.props;
    console.debug("Open modal of image");
    console.debug(media);
    // const image = document.getElementById('image');
    // const cropper = new Cropper(image, {
    //   aspectRatio: 16 / 9,
    //   crop(event) {
    //     console.log(event.detail.x);
    //     console.log(event.detail.y);
    //     console.log(event.detail.width);
    //     console.log(event.detail.height);
    //     console.log(event.detail.rotate);
    //     console.log(event.detail.scaleX);
    //     console.log(event.detail.scaleY);
    //   },
    // });
    // console.debug(cropper);
    ModalActionCreators.openModal('ImageEditorWrapper', {
      src: media.url,
      height: media.height,
      width: media.width,
    });
  }

  onCloseButtonClick = () => {
    const { draftId, media } = this.props;

    switch (media.mediaType) {
      case MediaTypes.IMAGE:
        ComposerActionCreators.removeDraftImage(draftId, media);
        AppActionCreators.trackUserAction(['composer', 'media', 'removed', 'photo'], {
          isGif: false,
        });
        break;

      case MediaTypes.VIDEO:
        ComposerActionCreators.removeDraftVideo(draftId);
        AppActionCreators.trackUserAction(['composer', 'media', 'removed', 'video']);
        break;

      case MediaTypes.GIF:
        ComposerActionCreators.removeDraftGif(draftId);
        AppActionCreators.trackUserAction(['composer', 'media', 'removed', 'photo'], {
          isGif: true,
        });
        break;

      default:
        break;
    }
  };

  render() {
    const { media, className, showTwitterImageDescription, canEditVideoAttachment } = this.props;
    const thumbnailClassName = [styles.thumbnail, className].join(' ');
    const isVideo = media.mediaType === MediaTypes.VIDEO;
    const isRegularImage = media.mediaType === MediaTypes.IMAGE;
    const thumbnail = isVideo ? media.thumbnail : media.url;

    const videoThumbnailClass = canEditVideoAttachment ?
      `${styles.editableVideoThumbnail} bi bi-video` :
      `${styles.videoThumbnail} bi bi-video`;
    const tooltipCopy = (isRegularImage && showTwitterImageDescription) ?
      'Click to expand & add description' : 'Click to expand';
    const ariaLabel = (isRegularImage && showTwitterImageDescription) ?
      'Select to expand image and add image description' :
      `Select to expand ${isVideo ? 'video' : 'image'}`;

    const onClickCallback = isVideo ? this.onClickVideo : this.onClickImage;

    return (
      <div className={thumbnailClassName}>
        <div className={styles.buttonWrapper}>
          <Button
            className={styles.imageContainer}
            aria-label={ariaLabel}
            data-tip={tooltipCopy}
            onClick={onClickCallback}
          >
            <img
              alt=""
              src={escapeParens(thumbnail)}
              className={styles.thumbnailImage}
            />
            {isVideo &&
              <span className={videoThumbnailClass} aria-label="video attachment" />}
          </Button>
        </div>

        <CloseButton
          className={styles.closeButton}
          onClick={this.onCloseButtonClick}
          label="Remove media"
        />
      </div>
    );
  }
}

export default MediaAttachmentThumbnail;
