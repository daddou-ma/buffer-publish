import ValidationSuccess from './ValidationSuccess';
import ValidationFail from './ValidationFail';

function validateVideoForService(video, service) {
  // TODO: Refactor this method to be used only for reminders once back end is updated
  if (service.videoMaxSize && video.size > service.videoMaxSize) {
    const maxFileSizeInMb = service.videoMaxSize / 1024 / 1024;
    return new ValidationFail(`Please try again with a smaller file. Videos need to be smaller than ${maxFileSizeInMb}MB`);
  }

  if (service.videoMinDurationMs && video.durationMs < service.videoMinDurationMs) {
    return new ValidationFail(`Please lengthen your video and try again. Videos need to be longer than ${service.videoMinDurationMs / 1000} seconds`);
  }

  if (service.videoMaxDurationMs
    && video.durationMs > service.videoMaxDurationMs) {
    return new ValidationFail(`Please shorten your video and try again. Videos need to be under ${service.videoMaxDurationMs / 1000} seconds long`);
  }

  // Context: https://github.com/bufferapp/buffer-composer/pull/134
  // if (service.videoMinAspectRatio && service.videoMaxAspectRatio) {
  //   const aspectRatio = video.width / video.height;
  //   if (aspectRatio < service.videoMinAspectRatio ||
  //     aspectRatio > service.videoMaxAspectRatio) {
  //     return new ValidationFail(`Sorry, your video needs to be between the aspect ratios ${service.videoMinAspectRatioHumanReadable} and ${service.videoMaxAspectRatioHumanReadable}. Please retry with another video`);
  //   }
  // }

  return new ValidationSuccess();
}

function validateDraft(draft) {
  let validationResult = new ValidationSuccess();

  if (draft.hasVideoAttached()) {
    validationResult = validateVideoForService(draft.video, draft.service);
  }

  return validationResult;
}

export default validateDraft;
