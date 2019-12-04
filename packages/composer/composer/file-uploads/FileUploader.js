import { MediaTypes } from '@bufferapp/publish-constants';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';
import { NotificationScopes } from '../AppConstants';

export default class FileUploader {
  static throwMixedMediaTypesError(service) {
    let message =
      'We can only attach one type of file at the same time: either ';
    message += service.maxAttachableImagesCount > 1 ? 'images' : 'an image';
    message += service.canHaveMediaAttachmentType(MediaTypes.GIF)
      ? ', or a gif,'
      : '';
    message += ' or a video.<br/>';
    message += 'Could you try with only one of those?';
    NotificationActionCreators.queueError({
      scope: NotificationScopes.FILE_UPLOAD,
      message,
    });
  }
}
