import React from 'react';
import PropTypes from 'prop-types';
import { Card, Text, Button } from '@bufferapp/components';
import AppActionCreators from '../action-creators/AppActionCreators';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import {
  addBlobIfNeeded,
  resizeImageIfNeeded,
  isSafari,
  isEdge,
} from '../utils/DOMUtils';
import { InstagramThumbnailMaxSize } from '../AppConstants';
import Modal from '../__legacy-buffer-web-shared-components__/modal/modal';
import InstagramThumbnailSlider from './InstagramThumbnailSlider';
import ComposerStore from '../stores/ComposerStore';
import styles from './css/InstagramThumbnailEditor.css';

class InstagramThumbnailEditor extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    video: PropTypes.object.isRequired,
    composerPosition: PropTypes.object,
  };

  static defaultProps = {
    composerPosition: null,
  };

  constructor(props) {
    super(props);
    this.state = { loading: false };
  }

  componentDidMount() {
    // though canvas is widely supported within browsers,
    // canvas.toBlob method isn't fully supported on Edge browsers
    addBlobIfNeeded();
  }

  setThumbnail = draftId => {
    const video = document.getElementById('thumbnailVideo');
    const canvas = document.getElementById('canvas');
    const maxSize = !isEdge() ? InstagramThumbnailMaxSize : null;
    const { width, height } = resizeImageIfNeeded(maxSize, {
      width: video.videoWidth,
      height: video.videoHeight,
    });
    canvas.width = width;
    canvas.height = height;
    this.setState({
      loading: true,
    });
    AppActionCreators.setThumbnailLoading(true); // disables add to queue btn
    if (isSafari()) {
      // Need this for safari browsers because of a timing issue with drawImage
      canvas.getContext('2d').drawImage(video, 0, 0, width, height);
      setTimeout(() => {
        this.createUploadCanvasFile(canvas, video, draftId, { width, height });
      }, 300);
    } else {
      this.createUploadCanvasFile(canvas, video, draftId, { width, height });
    }
  };

  createUploadCanvasFile = (canvas, video, draftId, sizeObj) => {
    const draft = ComposerStore.getDraft(draftId);
    const videoName = draft.video ? `${draft.video.name}_thumbnail.png` : '';
    const { width, height } = sizeObj;
    // draw image from video and format it to upload to AWS
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    canvas.toBlob(blob => {
      let imageFile;
      if (isEdge()) {
        // send as blob because Edge doesn't support file constructors. Currently
        // not resizing images sents as blobs because they appear incorrectly
        imageFile = blob;
        imageFile.name = videoName;
      } else {
        imageFile = new File([blob], videoName, { type: blob.type });
      }
      ComposerActionCreators.uploadInstagramDraftThumbnail(
        draftId,
        imageFile,
        video
      );
    });
  };

  render() {
    const { draftId, video, composerPosition } = this.props;

    const btnWrapperStyle = {
      padding: '15px 0px',
    };

    const cardWrapperStyle = {
      maxHeight: '100vh',
      overflow: 'auto',
    };

    const modalDynamicStyles = {
      top: composerPosition !== null ? `${composerPosition.top}px` : '75px',
    };

    return (
      <div id="instagramThumbnail">
        <Modal
          classNames={{ modal: styles.modalStyles }}
          hideCloseButton
          modalCustomStyle={modalDynamicStyles}
        >
          <div style={cardWrapperStyle}>
            <Card noPadding>
              <div style={{ padding: '0px 10px' }}>
                <div style={{ padding: '15px 0px 7px' }}>
                  <Text>
                    Select a frame from your video to save as your thumbnail.
                  </Text>
                </div>
                <div className={styles.mediaContainer}>
                  <video
                    crossOrigin="anonymous"
                    className={styles.media}
                    id="thumbnailVideo"
                    src={video.url}
                    muted
                    preload="auto"
                  />
                  <InstagramThumbnailSlider />
                  <canvas id="canvas" style={{ display: 'none' }} />
                  <div style={btnWrapperStyle}>
                    <Button
                      onClick={e => {
                        e.preventDefault();
                        this.setThumbnail(draftId);
                      }}
                    >
                      {this.state.loading ? 'Saving Cover...' : 'Save Cover'}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Modal>
      </div>
    );
  }
}

export default InstagramThumbnailEditor;
