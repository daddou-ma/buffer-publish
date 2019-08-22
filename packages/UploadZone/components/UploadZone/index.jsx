/**
 * Component that inserts a transparent layer with uploading abilities
 * inside another component.
 *
 * Note: The component is transparent as it's expected to be displayed
 * on top of any UI to unleash its uploading power: make sure that it's
 * the last child of that parent, or play with z-index, in order for it
 * to register clicks. The parent should be positioned.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import preventXss from 'xss';
import { Button } from '@bufferapp/ui';
import { stringTokenizer } from '@bufferapp/publish-i18n';

import styles from './uploadZone.css';
import { getHumanReadableSize, getFileTypeFromPath } from '@bufferapp/publish-composer/composer/utils/StringUtils';

const ContentTypeMediaTypeMap = new Map([
  ['JPG', 'IMAGE'],
  ['JPEG', 'IMAGE'],
  ['PNG', 'IMAGE'],
  ['GIF', 'GIF'],
  ['MOV', 'VIDEO'],
  ['MP4', 'VIDEO'],
  ['M4V', 'VIDEO'],
  ['AVI', 'VIDEO'],
]);

class UploadZone extends React.Component {
  onHiddenA11yButtonClick = () => {
    const {disabled} = this.props;
    if (disabled) return;
    this.dropzone.open();
  };

  onDrop = (files) => {
    const {disabled} = this.props;
    if (disabled) return;

    this.cleanUpNotifications();
    if (files.length === 0) return;

    this.uploadFiles(files);
  };

  getUploadableNewFiles = (files) => {
    const {uploadFormatsConfig, queueError, translations} = this.props;

    let invalidFormatFilesCount = 0;

    const validFiles = files.filter((file) => {
      const fileFormat = getFileTypeFromPath(file.name).toUpperCase();

      if (!uploadFormatsConfig.has(fileFormat)) {
        invalidFormatFilesCount++;
        return false;
      }

      const uploadFormatConfig = uploadFormatsConfig.get(fileFormat);
      if (file.size > uploadFormatConfig.maxSize) {
        const formattedMaxSize = getHumanReadableSize(uploadFormatConfig.maxSize);
        let message = translations.invalidFileSize;
        message = stringTokenizer(message, '{fileName}', preventXss(file.name));
        message = stringTokenizer(message, '{formattedMaxSize}', formattedMaxSize);

        queueError({ message });
        return false;
      }

      return true;
    });

    if (invalidFormatFilesCount > 0) {
      const acceptedFilesText = [...uploadFormatsConfig.keys()].join(', ');
      let message;

      if (invalidFormatFilesCount > 1) {
        if (invalidFormatFilesCount === files.length) {
          message = translations.invalidFormatCantUseAnyFiles
        } else {
          message = translations.invalidFormatCantUseSomeFiles;
        }
      } else if (invalidFormatFilesCount === 1) {
        if (files.length > 1) {
          message = translations.invalidFormatCantOneOfFiles;
        } else {
          message = translations.invalidFormatCantSingleFile;
        }
      }

      //we want to insert our tokenized accepedFilesText string into our message where appropriate
      message = stringTokenizer(message, '{acceptedFilesText}', acceptedFilesText);

      queueError({ message });
    }

    return validFiles;
  };

  uploadFiles = (files) => {
    const {
      draftId,
      service,
      uploadDraftFile,
      mixedMediaUnsupportedCallback,
      uploadType,
      notifiers,
    } = this.props;

    const fileMediaTypes = files.map((file) => (
      ContentTypeMediaTypeMap.get(getFileTypeFromPath(file.name).toUpperCase())
    ));
    const uniqueFileMediaTypes = [...new Set(fileMediaTypes)].filter(v => !!v);
    const containsMixedMediaTypes = uniqueFileMediaTypes.length > 1;

    if (containsMixedMediaTypes) {
      mixedMediaUnsupportedCallback(service);
      return;
    }

    // Truncate files to upload to the max attachable images count
    if (files.length > service.maxAttachableImagesCount) {
      files.splice(service.maxAttachableImagesCount);
    }

    const uploadableNewFiles = this.getUploadableNewFiles(files);

    if (uploadableNewFiles.length > 0) {
      uploadableNewFiles.forEach((file) => {
        uploadDraftFile(draftId, file, uploadType, notifiers);
      });
    }
  };

  cleanUpNotifications = () => {
    const {removeAllNotifications} = this.props;
    removeAllNotifications();
  };

  render () {
    const { translations } = this.props;
    const transparentClickZoneClassName =
      [styles.transparentClickZone, this.props.classNames.uploadZone].join(' ');

    const acceptedFileExtensions =
      Array.from(this.props.uploadFormatsConfig.keys())
        .map((format) => `.${format.toLowerCase()}`)
        .join();

    return (
      <div>
        <Dropzone
          onDrop={this.onDrop}
          activeClassName={this.props.classNames.uploadZoneActive}
          disabledClassName={this.props.classNames.uploadZoneDisabled}
          className={transparentClickZoneClassName}
          ref={(node) => { this.dropzone = node; }}
          multiple={this.props.multiple}
          disabled={this.props.disabled}
        />
        <Button
          className={styles.hiddenA11yButton}
          onClick={this.onHiddenA11yButtonClick}
          title={translations.buttonTitle}
        />
      </div>

    );
  }
}

UploadZone.propTypes = {
  draftId: PropTypes.string.isRequired,
  className: PropTypes.string,
  classNames: PropTypes.shape({
    uploadZone: PropTypes.string,
    uploadZoneActive: PropTypes.string,
    uploadZoneDisabled: PropTypes.string,
  }),
  uploadFormatsConfig: PropTypes.object,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  visibleNotifications: PropTypes.array.isRequired,
  uploadType: PropTypes.string.isRequired,
  service: PropTypes.shape({
    maxAttachableImagesCount: PropTypes.number,
    canHaveMediaAttachmentType: PropTypes.func,
  }).isRequired,
  uploadDraftFile: PropTypes.func.isRequired,
  removeAllNotifications: PropTypes.func.isRequired,
  mixedMediaUnsupportedCallback: PropTypes.func.isRequired,
  queueError: PropTypes.func.isRequired,
  notifiers: PropTypes.shape({
    uploadStarted: PropTypes.func,
    uploadedLinkThumbnail: PropTypes.func,
    uploadedDraftImage: PropTypes.func,
    uploadedDraftVideo: PropTypes.func,
    draftGifUploaded: PropTypes.func,
    queueError: PropTypes.func,
    monitorFileUploadProgress: PropTypes.func,
  }).isRequired,
  translations: PropTypes.shape({
    invalidFormatCantUseAnyFiles: PropTypes.string,
    invalidFormatCantUseSomeFiles: PropTypes.string,
    invalidFormatCantOneOfFiles: PropTypes.string,
    invalidFormatCantSingleFile: PropTypes.string,
    invalidFileSize: PropTypes.string,
    buttonTitle: PropTypes.string,
  }).isRequired
};

UploadZone.defaultProps = {
  disabled: false,
  multiple: true,
};


export default UploadZone;
