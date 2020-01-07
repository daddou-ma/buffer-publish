/**
 * Component that displays toggles for attachments.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { AttachmentTypes } from '../AppConstants';
import { escapeParens } from '../utils/StringUtils';
import styles from './css/AttachmentGlance.css';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import AppActionCreators from '../action-creators/AppActionCreators';

class AttachmentGlance extends React.Component {
  static propTypes = {
    draft: PropTypes.object.isRequired,
    attachmentType: PropTypes.string.isRequired,
    attachmentThumbnails: PropTypes.array,
  };

  onClick = e => {
    e.preventDefault();
    ComposerActionCreators.expand(this.props.draft.id);
  };

  render() {
    const { draft, attachmentType, attachmentThumbnails } = this.props;
    let iconClassName;

    if (attachmentType === AttachmentTypes.MEDIA && draft.video !== null) {
      iconClassName = ['bi bi-video', styles.attachmentIcon].join(' ');
    } else if (attachmentType === AttachmentTypes.MEDIA && draft.gif !== null) {
      iconClassName = ['bi bi-gif', styles.attachmentIcon].join(' ');
    } else if (
      attachmentType === AttachmentTypes.MEDIA &&
      draft.images.length > 0
    ) {
      iconClassName = ['bi bi-image', styles.attachmentIcon].join(' ');
    } else if (attachmentType === AttachmentTypes.LINK && draft.link !== null) {
      iconClassName = ['bi bi-link', styles.attachmentIcon].join(' ');
    } else if (
      attachmentType === AttachmentTypes.RETWEET &&
      draft.retweet !== null
    ) {
      iconClassName = ['bi bi-retweet', styles.attachmentIcon].join(' ');
    }
    const hasThumbnail = attachmentThumbnails !== null;

    let thumbnailContainerClassName = '';
    if (attachmentThumbnails === null) {
      thumbnailContainerClassName = '';
    } else if (attachmentThumbnails.length === 1) {
      thumbnailContainerClassName = [
        styles.singleThumbnailContainer,
        styles.thumbnailContainer,
      ].join(' ');
    } else if (attachmentThumbnails.length === 2) {
      thumbnailContainerClassName = [
        styles.twoThumbnailContainer,
        styles.thumbnailContainer,
      ].join(' ');
    } else if (attachmentThumbnails.length === 3) {
      thumbnailContainerClassName = [
        styles.threeThumbnailContainer,
        styles.thumbnailContainer,
      ].join(' ');
    } else if (attachmentThumbnails.length === 4) {
      thumbnailContainerClassName = [
        styles.fourThumbnailContainer,
        styles.thumbnailContainer,
      ].join(' ');
    }

    const containerClass = [
      hasThumbnail
        ? styles.containerWithThumbnail
        : styles.containerNoThumbnail,
      styles.container,
    ].join(' ');

    return (
      <div className={containerClass} onClick={this.onClick}>
        <div className={iconClassName} />
        {hasThumbnail && (
          <div className={thumbnailContainerClassName}>
            {attachmentThumbnails.map(thumbnail => (
              <div
                src={thumbnail}
                key={thumbnail}
                className={styles.thumbnail}
                role="presentation"
                style={{ backgroundImage: `url(${escapeParens(thumbnail)})` }}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default AttachmentGlance;
