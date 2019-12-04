import { MediaTypes, UploadTypes } from '@bufferapp/publish-constants';
import { getStillDataUriFromGif } from '@bufferapp/publish-composer/composer/utils/DOMUtils';
import Uploader from './Uploader';

const createFileUploaderCallback = ({
  s3UploadSignature,
  userId,
  csrfToken,
  imageDimensionsKey,
  serverNotifiers,
}) => (id, file, uploadType, notifiers) => {
  const uploader = new Uploader({
    csrf_token: csrfToken,
    userId,
    s3UploadSignature,
    errorNotifier: notifiers.queueError,
    notifiers: serverNotifiers,
    imageDimensionsKey,
  });

  notifiers.uploadStarted({ id, uploaderInstance: uploader, file });

  uploader
    .upload(file)
    .then(uploadedFile => {
      if (uploadedFile.success === false) {
        notifiers.queueError({
          message:
            'Uh oh! It looks like we had an issue connecting to our servers. Up for trying again?',
        });
      }

      if (uploadType === UploadTypes.LINK_THUMBNAIL) {
        notifiers.uploadedLinkThumbnail({
          id,
          uploaderInstance: uploader,
          url: uploadedFile.url,
          width: uploadedFile.width,
          height: uploadedFile.height,
          file,
        });
      } else {
        switch (uploadedFile.type) {
          case MediaTypes.IMAGE:
            notifiers.uploadedDraftImage({
              id,
              uploaderInstance: uploader,
              url: uploadedFile.url,
              location: window.location, //eslint-disable-line
              width: uploadedFile.width,
              height: uploadedFile.height,
              file,
            });
            break;

          case MediaTypes.VIDEO:
            notifiers.uploadedDraftVideo({
              id,
              uploaderInstance: uploader,
              uploadId: uploadedFile.uploadId,
              fileExtension: uploadedFile.fileExtension,
              file,
            });
            break;

          case MediaTypes.GIF:
            getStillDataUriFromGif(uploadedFile.url)
              .then(dataUri => dataUri)
              .catch(() => null)
              .then(dataUriOrNull => {
                notifiers.draftGifUploaded({
                  id,
                  uploaderInstance: uploader,
                  url: uploadedFile.url,
                  stillGifUrl: dataUriOrNull,
                  width: uploadedFile.width,
                  height: uploadedFile.height,
                  file,
                });
              });
            break;

          default:
            break;
        }
      }
    })
    .catch(e => {
      notifiers.queueError({
        message:
          'Uh oh! It looks like we had an issue connecting to our servers. Up for trying again?',
      });
    });

  notifiers.monitorFileUploadProgress({
    id,
    uploaderInstance: uploader,
    file,
  });
};

export default createFileUploaderCallback;
