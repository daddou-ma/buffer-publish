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
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import Button from '../components/Button';
import styles from './css/UploadZone.css';
import { getHumanReadableSize, getFileTypeFromPath } from '../utils/StringUtils';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';
import { NotificationScopes, UploadTypes, MediaTypes, Services, ContentTypeMediaTypeMap }
  from '../AppConstants';
import FileUploader from '../file-uploads/FileUploader';

class UploadZone extends React.Component {
  static propTypes = {
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
    uploadType: PropTypes.oneOf(Object.keys(UploadTypes)).isRequired,
    service: PropTypes.oneOf(Object.values(Services)).isRequired,
  };

  static defaultProps = {
    disabled: false,
    multiple: true,
  };

  onHiddenA11yButtonClick = () => {
    const { disabled } = this.props;
    if (disabled) return;
    this.dropzone.open();
  };

  onDrop = (files) => {
    const { disabled } = this.props;
    if (disabled) return;

    this.cleanUpNotifications();
    if (files.length === 0) return;

    this.uploadFiles(files);
  }

  getUploadableNewFiles = (files) => {
    const { uploadFormatsConfig } = this.props;

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
        NotificationActionCreators.queueError({
          scope: NotificationScopes.FILE_UPLOAD,
          message: `We can't upload "${preventXss(file.name)}" because it's too large: we can
                    only handle files of that type up to ${formattedMaxSize}. Could you try
                    a smaller file?`,
        });
        return false;
      }

      return true;
    });

    if (invalidFormatFilesCount > 0) {
      const acceptedFilesText = [...uploadFormatsConfig.keys()].join(', ');
      let message;

      if (invalidFormatFilesCount > 1) {
        if (invalidFormatFilesCount === files.length) {
          message = `We can't quite use any of the selected types of files. Could you try one
                    of the following instead: ${acceptedFilesText}?`;
        } else {
          message = `We can't quite use some of the selected types of files. Could you try one
                    of the following instead: ${acceptedFilesText}?`;
        }
      } else if (invalidFormatFilesCount === 1) {
        if (files.length > 1) {
          message = `We can't quite use one of the selected types of files. Could you try one
                    of the following instead: ${acceptedFilesText}?`;
        } else {
          message = `We can't quite use that type of file. Could you try one of the
                    following instead: ${acceptedFilesText}?`;
        }
      }

      NotificationActionCreators.queueError({
        scope: NotificationScopes.FILE_UPLOAD,
        message,
      });
    }

    return validFiles;
  };

  uploadFiles = (files) => {
    const { draftId, service } = this.props;

    const fileMediaTypes = files.map((file) => (
      ContentTypeMediaTypeMap.get(getFileTypeFromPath(file.name).toUpperCase())
    ));
    const uniqueFileMediaTypes = [...new Set(fileMediaTypes)].filter((v) => !!v);
    const containsMixedMediaTypes = uniqueFileMediaTypes.length > 1;

    if (containsMixedMediaTypes) {
      FileUploader.throwMixedMediaTypesError(service);
      return;
    }

    // Truncate files to upload to the max attachable images count
    if (files.length > service.maxAttachableImagesCount) {
      files.splice(service.maxAttachableImagesCount);
    }

    const uploadableNewFiles = this.getUploadableNewFiles(files);

    if (uploadableNewFiles.length > 0) {
      uploadableNewFiles.forEach((file) => {
        ComposerActionCreators.uploadDraftFile(draftId, file, this.props.uploadType);
      });
    }
  }

  cleanUpNotifications = () =>
    NotificationActionCreators.removeAllNotificationsByScope(NotificationScopes.FILE_UPLOAD);

  render() {
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
          title="Upload media"
        />
      </div>

    );
  }
}

export default UploadZone;
