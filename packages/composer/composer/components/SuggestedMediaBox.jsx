/**
 * Component that displays and allows to navigate among a provided list
 * of suggested media
 */

import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';
import { MediaTypes } from '@bufferapp/publish-constants';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import AppActionCreators from '../action-creators/AppActionCreators';
import Button from '../components/Button';
import SuggestedMediaThumbnailInfo from './SuggestedMediaThumbnailInfo';
import styles from './css/SuggestedMediaBox.css';
import videoAttachmentThumbnailStyles from './css/VideoAttachmentThumbnail.css';
import {
  getHumanReadableSize,
  getHumanReadableTime,
} from '../utils/StringUtils';

class SuggestedMediaBox extends React.Component {
  static propTypes = {
    draftId: PropTypes.string.isRequired,
    suggestedMedia: PropTypes.array.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      canScrollLeft: false,
      canScrollRight: false,
    };
  }

  componentDidMount = () => this.updateScrollButtonsDisplay();

  componentDidUpdate = () => this.updateScrollButtonsDisplay();

  componentWillUnmount = () => this.updateScrollButtonsDisplay.cancel();

  onThumbnailClick = media => {
    switch (media.mediaType) {
      case MediaTypes.IMAGE:
        ComposerActionCreators.addDraftImage(this.props.draftId, media);
        AppActionCreators.trackUserAction(
          ['composer', 'media', 'added_photo'],
          {
            addedFrom: 'suggested_media',
            isGif: false,
          }
        );
        break;

      case MediaTypes.VIDEO:
        ComposerActionCreators.addDraftVideo(this.props.draftId, media);
        break;

      case MediaTypes.GIF:
        ComposerActionCreators.addDraftGif(this.props.draftId, media);
        AppActionCreators.trackUserAction(
          ['composer', 'media', 'added_photo'],
          {
            addedFrom: 'suggested_media',
            isGif: true,
          }
        );
        break;

      default:
        break;
    }
  };

  onThumbnailMouseOver = media => {
    const tempImage =
      media.mediaType === MediaTypes.VIDEO ? media.thumbnail : media.url;
    ComposerActionCreators.updateDraftTempImage(this.props.draftId, tempImage);
  };

  onThumbnailMouseOut = e => {
    ComposerActionCreators.removeDraftTempImage(this.props.draftId);
  };

  getSuggestedMediaItem = suggestedItem => {
    const mediaType = suggestedItem.mediaType;
    let suggestedMediaItem;
    const hasDimensionsData = suggestedItem.width && suggestedItem.height;

    if (mediaType === MediaTypes.IMAGE) {
      suggestedMediaItem = (
        <Button
          className={styles.thumbnailContainer}
          onClick={this.onThumbnailClick.bind(this, suggestedItem)} // eslint-disable-line
          onMouseOver={this.onThumbnailMouseOver.bind(this, suggestedItem)} // eslint-disable-line
          onMouseMove={this.onThumbnailMouseOver.bind(this, suggestedItem)} // eslint-disable-line
          onMouseOut={this.onThumbnailMouseOut}
          key={suggestedItem.url}
        >
          <img
            src={suggestedItem.url}
            className={styles.thumbnail}
            alt="Thumbnail of Suggested Media"
          />

          {hasDimensionsData && (
            <SuggestedMediaThumbnailInfo
              width={suggestedItem.width}
              height={suggestedItem.height}
            />
          )}
        </Button>
      );
    } else if (mediaType === MediaTypes.GIF) {
      suggestedMediaItem = (
        <Button
          className={styles.thumbnailContainer}
          onClick={this.onThumbnailClick.bind(this, suggestedItem)} // eslint-disable-line
          onMouseOver={this.onThumbnailMouseOver.bind(this, suggestedItem)} // eslint-disable-line
          onMouseMove={this.onThumbnailMouseOver.bind(this, suggestedItem)} // eslint-disable-line
          onMouseOut={this.onThumbnailMouseOut}
          key={`${suggestedItem.url}-${this.props.draftId}`}
        >
          <img
            src={suggestedItem.url}
            className={styles.thumbnail}
            alt="Thumbnail of Suggested GIF"
          />

          {hasDimensionsData && (
            <SuggestedMediaThumbnailInfo
              width={suggestedItem.width}
              height={suggestedItem.height}
            />
          )}
        </Button>
      );
    } else if (mediaType === MediaTypes.VIDEO) {
      const iconClassName = [
        'bi bi-video',
        videoAttachmentThumbnailStyles.videoIcon,
      ].join(' ');

      suggestedMediaItem = (
        <div
          className={styles.suggestedMediaItem}
          key={suggestedItem.thumbnail}
        >
          <Button
            className={styles.thumbnailContainer}
            onClick={this.onThumbnailClick.bind(this, suggestedItem)} // eslint-disable-line
            onMouseOver={this.onThumbnailMouseOver.bind(this, suggestedItem)} // eslint-disable-line
            onMouseMove={this.onThumbnailMouseOver.bind(this, suggestedItem)} // eslint-disable-line
            onMouseOut={this.onThumbnailMouseOut}
          >
            <img
              src={suggestedItem.thumbnail}
              className={styles.thumbnail}
              alt="Thumbnail of Suggested Video"
            />

            <span className={videoAttachmentThumbnailStyles.videoDataContainer}>
              <div className={iconClassName} />
              <div className={videoAttachmentThumbnailStyles.thumbnailInfo}>
                <div
                  className={videoAttachmentThumbnailStyles.thumbnailInfoText}
                >
                  <div className={videoAttachmentThumbnailStyles.videoSize}>
                    {getHumanReadableSize(suggestedItem.size)}
                  </div>
                  <div className={videoAttachmentThumbnailStyles.videoDuration}>
                    {getHumanReadableTime(suggestedItem.duration)}
                  </div>
                </div>
              </div>
            </span>
          </Button>
        </div>
      );
    }

    return suggestedMediaItem;
  };

  scrollXBy = delta => {
    this.suggestionsScrollContainer.scrollLeft += delta;
  };

  scrollLeft = e => {
    e.preventDefault();
    this.scrollXBy(-120);
    this.updateScrollButtonsDisplay();
  };

  scrollRight = e => {
    e.preventDefault();
    this.scrollXBy(120);
    this.updateScrollButtonsDisplay();
  };

  updateScrollButtonsDisplay = throttle(() => {
    const container = this.suggestionsScrollContainer;
    const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight =
      container.scrollLeft < container.scrollWidth - container.offsetWidth - 1;

    if (
      canScrollLeft !== this.state.canScrollLeft ||
      canScrollRight !== this.state.canScrollRight
    ) {
      this.setState({ canScrollLeft, canScrollRight });
    }
  }, 100);

  render() {
    const { suggestedMedia, className } = this.props;
    const { canScrollLeft, canScrollRight } = this.state;

    const suggestedMediaBoxContainerClassName = [
      styles.suggestedMediaBoxContainer,
      className,
    ].join(' ');

    const scrollLeftButtonClassName = [
      styles.scrollButton,
      'bi bi-arrow-left',
    ].join(' ');

    const scrollRightButtonClassName = [
      styles.scrollButton,
      'bi bi-arrow-right',
    ].join(' ');

    return (
      <div className={suggestedMediaBoxContainerClassName}>
        <div className={styles.suggestedMediaBox}>
          <div className={styles.header} role="heading">
            {`Suggested media (${suggestedMedia.length}):`}
          </div>

          <div className={styles.scrollControlsContainer}>
            <Button
              className={scrollLeftButtonClassName}
              onClick={this.scrollLeft}
              aria-label="Scroll suggested media left"
              disabled={!canScrollLeft}
            />
            <Button
              className={scrollRightButtonClassName}
              onClick={this.scrollRight}
              aria-label="Scroll suggested media right"
              disabled={!canScrollRight}
            />
          </div>

          <div className={styles.suggestionsContainer}>
            <div
              className={styles.suggestionsScrollContainer}
              ref={ref => (this.suggestionsScrollContainer = ref)}
              onScroll={this.updateScrollButtonsDisplay}
            >
              {[...suggestedMedia].map(suggestedItem =>
                this.getSuggestedMediaItem(suggestedItem)
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuggestedMediaBox;
