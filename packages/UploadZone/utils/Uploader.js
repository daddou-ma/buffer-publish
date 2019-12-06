/**
 * Upload a file.
 *
 * Returns a Promise that resolves with an object literal containing the uploaded
 * image's url and its thumbnail url as well.
 */

import RPCClient from 'micro-rpc-client';
import PropTypes from 'prop-types';
import { MediaTypes } from '@bufferapp/publish-constants';
import { getFileTypeFromPath } from '@bufferapp/publish-composer/composer/utils/StringUtils';
import WebAPIUtils from '@bufferapp/publish-composer/composer/utils/WebAPIUtils';
import WebSocket from './WebSocket';

class Uploader {
  constructor({
    errorNotifier,
    userId,
    s3UploadSignature,
    csrf_token,
    notifiers,
    imageDimensionsKey,
  }) {
    this._xhr = null;
    this._uploadProgressSub = () => {};
    this.errorNotifier = errorNotifier;
    this.userId = userId;
    this.s3UploadSignature = s3UploadSignature;
    this.csrf_token = csrf_token;
    this.notifiers = notifiers;
    this.imageDimensionsKey = imageDimensionsKey;
  }

  upload(file) {
    return this.uploadToS3(file)
      .then(uploadKey => this.uploadToBuffer(uploadKey))
      .then(response =>
        this.attachDimensions(response, {
          key: this.imageDimensionsKey,
          userId: this.userId,
        })
      )
      .then(response => this.listenToProcessingEventsForVideos(response))
      .then(response => this.formatResponse(response));
  }

  getProgressIterator() {
    const progressGenerator = function*() {
      while (this.isUploading()) {
        // eslint-disable-next-line no-loop-func
        yield new Promise(resolve => {
          this._uploadProgressSub = resolve;
        });
      }
    };

    return this::progressGenerator();
  }

  isUploading = () => this._xhr !== null;

  uploadToS3(file) {
    const formData = new FormData();

    const userId = this.userId;
    const userS3UploadSignature = this.s3UploadSignature;
    const url = `https://${userS3UploadSignature.bucket}.s3.amazonaws.com`;

    this._xhr = new XMLHttpRequest(); // Use XHR to have access to a progress callback
    this._uploadProgressSub = () => {};

    const timestamp = Date.now();
    const encodedFileName = encodeURIComponent(file.name);

    const data = [
      ['key', `${userId}/uploads/${timestamp}-${encodedFileName}`],
      ['Content-Type', 'video/mp4'], // Doesn't really matter for this first upload to S3
      ['acl', 'public-read'],
      ['success_action_status', userS3UploadSignature.successActionStatus],
      ['policy', userS3UploadSignature.base64Policy],
      ['X-amz-algorithm', userS3UploadSignature.algorithm],
      ['X-amz-credential', userS3UploadSignature.credentials],
      ['X-amz-date', userS3UploadSignature.date],
      ['X-amz-expires', userS3UploadSignature.expires],
      ['X-amz-signature', userS3UploadSignature.signature],
      ['file', file],
    ];

    data.forEach(([key, val]) => formData.append(key, val));

    const promise = new Promise(resolve => {
      this._xhr.open('POST', url, true);

      this._xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

      this._xhr.addEventListener('readystatechange', () => {
        if (
          this._xhr.readyState === 4 &&
          (this._xhr.status === 200 || this._xhr.status === 201)
        ) {
          const uploadKey = this._xhr.responseXML.getElementsByTagName('Key')[0]
            .textContent;
          resolve(uploadKey);

          this._xhr = null;
          this._uploadProgressSub(100);
        }
      });

      this._xhr.addEventListener('error', () => {
        this.errorNotifier({
          message:
            'Uh oh! It looks like we had trouble connecting to our servers, mind trying again?',
        });
      });

      this._xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
          const progress = (e.loaded / e.total) * 100;
          this._uploadProgressSub(progress);
        }
      });

      this._xhr.send(formData);
    });

    return promise;
  }

  getMediaType(mediaString) {
    return mediaString.match(/[^/]+(jpg|jpeg|png|gif)$/i) ? 'photo' : 'video';
  }

  uploadToBuffer(uploadKey) {
    const data = {
      key: uploadKey,
      csrf_token: this.csrf_token,
    };

    const rpc = new RPCClient({
      url: '/rpc',
      sendCredentials: 'same-origin',
    });

    const type = this.getMediaType(uploadKey);

    return rpc
      .call('composerApiProxy', {
        url: `/i/upload_${type === 'photo' ? 'image' : 'video'}.json`,
        args: data,
      })
      .then(response => {
        response = { ...response, type };
        return response;
      })
      .then(response => {
        if (response.success === false) {
          this.errorNotifier({
            message:
              'Uh oh! It looks like we had trouble connecting to our servers, mind trying again?',
          });
        }
        return response;
      });
  }

  attachDimensions(response, { key, userId }) {
    if (response.type !== 'photo') {
      return response;
    }

    return WebAPIUtils.getImageDimensions({
      url: response.fullsize,
      key,
      user_id: userId,
    })
      .then(({ width, height }) => ({ ...response, width, height }))
      .catch(() => response);
  }

  listenToProcessingEventsForVideos(response) {
    if (response.type === 'video') {
      WebSocket.init({
        userId: this.userId,
        notifiers: this.notifiers,
        appEnvironment: null,
      });
    }
    return response;
  }

  formatResponse(response) {
    let formattedResponse;
    switch (response.type) {
      case 'photo':
        if (getFileTypeFromPath(response.fullsize) === 'gif') {
          formattedResponse = {
            type: MediaTypes.GIF,
            url: response.fullsize,
            thumbnailUrl: response.thumbnail,
            success: response.success,
            width: response.width,
            height: response.height,
          };
        } else {
          formattedResponse = {
            type: MediaTypes.IMAGE,
            url: response.fullsize,
            thumbnailUrl: response.thumbnail,
            success: response.success,
            width: response.width,
            height: response.height,
          };
        }
        break;

      case 'video':
        formattedResponse = {
          type: MediaTypes.VIDEO,
          uploadId: response.upload_id,
          name: response.title,
          fileExtension: response.details && response.details.file_extension,
          success: response.success,
        };
        break;

      default:
        formattedResponse = {};
        break;
    }

    return formattedResponse;
  }
}

Uploader.propTypes = {
  errorNotifier: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  s3UploadSignature: PropTypes.shape({
    bucket: PropTypes.string,
    successActionStatus: PropTypes.string,
    base64Policy: PropTypes.string,
    algorithm: PropTypes.string,
    credentials: PropTypes.string,
    date: PropTypes.string,
    expires: PropTypes.string,
    signature: PropTypes.string,
  }).isRequired,
  csrf_token: PropTypes.string.isRequired,
  notifiers: PropTypes.shape({
    videoProcessed: PropTypes.func,
    profileGroupCreated: PropTypes.func,
    profileGroupUpdated: PropTypes.func,
    profileGroupDeleted: PropTypes.func,
  }).isRequired,
};

export default Uploader;
