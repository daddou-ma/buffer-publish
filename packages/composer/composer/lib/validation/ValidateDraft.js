import { isValidURL } from '@bufferapp/publish-grid/util';
import ValidationSuccess from './ValidationSuccess';
import ValidationFail from './ValidationFail';
import { Services } from '../../AppConstants';
import ValidationResults from './ValidationResults';

function validateVideoForInstagram(video) {
  const instagramService = Services.get('instagram');

  if (video === null) {
    return new ValidationSuccess();
  }

  // TODO: Refactor this method to be used only for reminders once back end is updated
  if (
    instagramService.videoMaxSize &&
    video.size > instagramService.videoMaxSize
  ) {
    const maxFileSizeInMb = instagramService.videoMaxSize / 1024 / 1024;
    return new ValidationFail(
      `Please try again with a smaller file. Videos need to be smaller than ${maxFileSizeInMb}MB`
    );
  }

  if (
    instagramService.videoMinDurationMs &&
    video.durationMs < instagramService.videoMinDurationMs
  ) {
    return new ValidationFail(
      `Please lengthen your video and try again. Videos need to be longer than ${instagramService.videoMinDurationMs /
        1000} seconds`
    );
  }

  if (
    instagramService.videoMaxDurationMs &&
    video.durationMs > instagramService.videoMaxDurationMs
  ) {
    return new ValidationFail(
      `Please shorten your video and try again. Videos need to be under ${instagramService.videoMaxDurationMs /
        1000} seconds long`
    );
  }

  // Context: https://github.com/bufferapp/buffer-composer/pull/134
  // if (instagramService.videoMinAspectRatio && instagramService.videoMaxAspectRatio) {
  //   const aspectRatio = video.width / video.height;
  //   if (aspectRatio < instagramService.videoMinAspectRatio ||
  //     aspectRatio > instagramService.videoMaxAspectRatio) {
  //     return new ValidationFail(`Sorry, your video needs to be between the aspect ratios ${instagramService.videoMinAspectRatioHumanReadable} and ${service.videoMaxAspectRatioHumanReadable}. Please retry with another video`);
  //   }
  // }

  return new ValidationSuccess();
}

const validateDraftFunctions = [
  function maxHashtags(draft) {
    if (
      draft.service.maxHashtags !== null &&
      draft.getNumberOfHashtags() > draft.service.maxHashtags
    ) {
      return new ValidationFail(
        `At most ${draft.service.maxHashtags} hashtags can be used for caption and comment`
      );
    }
    return new ValidationSuccess();
  },

  function maxMentions(draft) {
    if (
      draft.service.maxMentions !== null &&
      draft.getNumberOfMentions() > draft.service.maxMentions
    ) {
      return new ValidationFail(
        `At most ${draft.service.maxMentions} mentions can be used for caption and comment`
      );
    }
    return new ValidationSuccess();
  },

  function maxCharactersInComment(draft) {
    if (
      draft.service.commentCharLimit !== null &&
      draft.characterCommentCount > draft.service.commentCharLimit
    ) {
      return new ValidationFail(
        `We can only fit ${draft.service.commentCharLimit} characters for comments`
      );
    }
    return new ValidationSuccess();
  },

  function isValidShopgridUrl(draft) {
    if (draft.service.name === 'instagram') {
      const shopgridLink = draft.shopgridLink;

      if (typeof shopgridLink !== 'undefined' && shopgridLink !== null) {
        if (
          shopgridLink.replace(/\s+/g, '') !== '' &&
          !isValidURL(shopgridLink)
        ) {
          return new ValidationFail('The link URL format is invalid');
        }
      }
    }
    return new ValidationSuccess();
  },
];

function validateDraft(draft) {
  const validationResults = [];
  for (let i = 0; i < validateDraftFunctions.length; i += 1) {
    validationResults.push(validateDraftFunctions[i](draft));
  }

  return new ValidationResults(validationResults);
}

export { validateDraft, validateVideoForInstagram };
