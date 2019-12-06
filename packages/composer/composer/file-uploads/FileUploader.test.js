/* eslint-disable import/first */

jest.mock('../action-creators/NotificationActionCreators');

import NotificationActionCreators from '../action-creators/NotificationActionCreators';
import { NotificationScopes } from '../AppConstants';

import FileUploader from './FileUploader';

const multipleImagesService = {
  maxAttachableImagesCount: 4,
  canHaveMediaAttachmentType: () => true,
};

const singleImageService = {
  maxAttachableImagesCount: 1,
  canHaveMediaAttachmentType: () => true,
};

describe('FileUploader', () => {
  beforeEach(() => {
    NotificationActionCreators.queueError = jest.fn();
  });
  afterEach(() => jest.resetAllMocks());

  describe('throwMixedMediaTypesError', () => {
    it('triggers a queueError Notification with a FILE_UPLOAD scope', () => {
      FileUploader.throwMixedMediaTypesError(singleImageService);
      expect(NotificationActionCreators.queueError).toHaveBeenCalledWith({
        scope: NotificationScopes.FILE_UPLOAD,
        message: expect.any(String),
      });
    });

    describe('services that allow multiple images', () => {
      it('trigger a message acknowledging multiple images', () => {
        FileUploader.throwMixedMediaTypesError(multipleImagesService);
        expect(NotificationActionCreators.queueError).toHaveBeenCalledWith({
          scope: NotificationScopes.FILE_UPLOAD,
          message:
            'We can only attach one type of file at the same time: either images, or a gif, or a video.<br/>Could you try with only one of those?',
        });
      });
      it('trigger a message not mentioning gifs if the service does not admit them', () => {
        multipleImagesService.canHaveMediaAttachmentType = () => false;
        FileUploader.throwMixedMediaTypesError(multipleImagesService);
        expect(NotificationActionCreators.queueError).toHaveBeenCalledWith({
          scope: NotificationScopes.FILE_UPLOAD,
          message:
            'We can only attach one type of file at the same time: either images or a video.<br/>Could you try with only one of those?',
        });
      });
    });
    describe('services that only allow a single image', () => {
      it('trigger a message acknowledging just one image', () => {
        FileUploader.throwMixedMediaTypesError(singleImageService);
        expect(NotificationActionCreators.queueError).toHaveBeenCalledWith({
          scope: NotificationScopes.FILE_UPLOAD,
          message:
            'We can only attach one type of file at the same time: either an image, or a gif, or a video.<br/>Could you try with only one of those?',
        });
      });
      it('trigger a message not mentioning gifs if the service does not admit them', () => {
        singleImageService.canHaveMediaAttachmentType = () => false;
        FileUploader.throwMixedMediaTypesError(singleImageService);
        expect(NotificationActionCreators.queueError).toHaveBeenCalledWith({
          scope: NotificationScopes.FILE_UPLOAD,
          message:
            'We can only attach one type of file at the same time: either an image or a video.<br/>Could you try with only one of those?',
        });
      });
    });
  });
});
