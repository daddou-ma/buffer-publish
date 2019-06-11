import ValidationSuccess from './ValidationSuccess';
import ValidationFail from './ValidationFail';
import { Services } from '../../AppConstants';
import { HASHTAG_REGEX } from '../../utils/draft-js-custom-plugins/hashtag';
import { MENTION_REGEX } from '../../utils/draft-js-custom-plugins/mention';

function validateVideoForInstagram(video) {
  const instagramService = Services.get('instagram');

  // TODO: Refactor this method to be used only for reminders once back end is updated
  if (instagramService.videoMaxSize && video.size > instagramService.videoMaxSize) {
    const maxFileSizeInMb = instagramService.videoMaxSize / 1024 / 1024;
    return new ValidationFail(`Please try again with a smaller file. Videos need to be smaller than ${maxFileSizeInMb}MB`);
  }

  if (instagramService.videoMinDurationMs &&
    (video.durationMs < instagramService.videoMinDurationMs)) {
    return new ValidationFail(`Please lengthen your video and try again. Videos need to be longer than ${instagramService.videoMinDurationMs / 1000} seconds`);
  }

  if (instagramService.videoMaxDurationMs
    && video.durationMs > instagramService.videoMaxDurationMs) {
    return new ValidationFail(`Please shorten your video and try again. Videos need to be under ${instagramService.videoMaxDurationMs / 1000} seconds long`);
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
  function maxHashtagsInText(draft) {
    if (draft.service.maxHashtagsInText !== null) {
      const contentState = draft.editorState.getCurrentContent();
      const text = contentState.getPlainText();
      const matches = text.match(HASHTAG_REGEX);
      if (matches !== null && matches.length > draft.service.maxHashtagsInText) {
        return new ValidationFail(`At most ${draft.service.maxHashtagsInText} hashtags can be used`);
      }
    }
    return new ValidationSuccess();
  },

  function maxHashtagsInComment(draft) {
    if (draft.service.maxHashtagsInText !== null) {
      const text = draft.commentText || '';
      const matches = text.match(HASHTAG_REGEX);

      if (matches !== null && matches.length > draft.service.maxHashtagsInText) {
        return new ValidationFail(`At most ${draft.service.maxHashtagsInText} hashtags can be used for comments`);
      }
    }
    return new ValidationSuccess();
  },

  function maxMentionsInComment(draft) {
    if (draft.service.maxMentionsInComment !== null) {
      const text = draft.commentText || '';
      const matches = text.match(MENTION_REGEX);

      if (matches !== null && matches.length > draft.service.maxMentionsInComment) {
        return new ValidationFail(`At most ${draft.service.maxMentionsInComment} mentions can be used for comments`);
      }
    }
    return new ValidationSuccess();
  },

  function maxCharactersInComment(draft) {
    if (draft.service.commentCharLimit !== null) {
      const commentCount = draft.characterCommentCount;
      if (commentCount > draft.service.commentCharLimit) {
        return new ValidationFail(`We can only fit ${draft.service.commentCharLimit} characters for comments`);
      }
    }
    return new ValidationSuccess();
  }
];

function validateDraft(draft) {
  let validationResult = new ValidationSuccess();
  for (let i = 0; i < validateDraftFunctions.length; i += 1) {
    validationResult = validateDraftFunctions[i](draft);
    if (validationResult.isInvalid()) {
      return validationResult;
    }
  }

  return validationResult;
}

export { validateDraft, validateVideoForInstagram };
