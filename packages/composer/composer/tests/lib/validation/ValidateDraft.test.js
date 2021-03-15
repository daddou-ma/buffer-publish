import { EditorState, ContentState } from '@bufferapp/draft-js';

import {
  validateDraft,
  validateVideoForInstagram,
} from '../../../lib/validation/ValidateDraft';
import ValidationSuccess from '../../../lib/validation/ValidationSuccess';
import ValidationFail from '../../../lib/validation/ValidationFail';

import { Services, AttachmentTypes } from '../../../AppConstants';
import Draft from '../../../entities/Draft';

describe('validateVideoForInstagram', () => {
  it('returns ValidationFail if video too big', () => {
    const instagramService = Services.get('instagram');

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize * 2, // Twice what's allowed
      },
      service: instagramService,
    };

    const maxFileSizeInMb = instagramService.videoMaxSize / 1024 / 1024;
    const expectedMessage = `Please try again with a smaller file. Videos need to be smaller than ${maxFileSizeInMb}MB`;
    expect(validateVideoForInstagram(draft.video)).toEqual(
      new ValidationFail(expectedMessage)
    );
  });

  it('returns ValidationFail if video is too short', () => {
    const instagramService = Services.get('instagram');

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize / 2,
        durationMs: instagramService.videoMinDurationMs - 1000,
      },
      service: instagramService,
    };

    const expectedMessage =
      'Please lengthen your video and try again. Videos need to be longer than 3 seconds';
    expect(validateVideoForInstagram(draft.video)).toEqual(
      new ValidationFail(expectedMessage)
    );
  });

  it('returns ValidationFail if video is too long', () => {
    const instagramService = Services.get('instagram');

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize / 2,
        durationMs: instagramService.videoMaxDurationMs * 2,
      },
      service: instagramService,
    };

    const expectedMessage =
      'Please shorten your video and try again. Videos need to be under 60 seconds long';
    expect(validateVideoForInstagram(draft.video)).toEqual(
      new ValidationFail(expectedMessage)
    );
  });

  it('returns ValidationSuccess if video is within limits', () => {
    const instagramService = Services.get('instagram');

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize / 2,
        durationMs: instagramService.videoMaxDurationMs / 2,
      },
      service: instagramService,
    };

    expect(validateVideoForInstagram(draft.video)).toEqual(
      new ValidationSuccess()
    );
  });
  // TODO: Add this back after we add all IG validation failures as reminders, not errors
  // it('returns ValidationSuccess if video meets the required aspect ratio', () => {
  //   const instagramService = Services.get('instagram');
  //
  //   const draft = {
  //     enabledAttachmentType: AttachmentTypes.MEDIA,
  //     video: {
  //       size: 1000,
  //       durationMs: 5000,
  //       width: 1920,
  //       height: 1080,
  //     },
  //     service: instagramService,
  //   };
  //
  //   expect(validateVideoForInstagram(draft.video)).toBeInstanceOf(ValidationSuccess);
  // });
  // it('returns ValidationFail if video is smaller than the req. aspect ratio', () => {
  //   const instagramService = Services.get('instagram');
  //
  //   const draft = {
  //     enabledAttachmentType: AttachmentTypes.MEDIA,
  //     video: {
  //       size: 1000,
  //       durationMs: 5000,
  //       width: 300,
  //       height: 1000,
  //     },
  //     service: instagramService,
  //   };
  //
  //   expect(validateVideoForInstagram(draft.video)).toBeInstanceOf(ValidationFail);
  // });
  //   it('returns ValidationFail if video is larger than the req. aspect ratio', () => {
  //     const instagramService = Services.get('instagram');
  //
  //     const draft = {
  //       enabledAttachmentType: AttachmentTypes.MEDIA,
  //       video: {
  //         size: 1000,
  //         durationMs: 5000,
  //         width: 1600,
  //         height: 440,
  //       },
  //       service: instagramService,
  //     };
  //
  //     expect(validateVideoForInstagram(draft.video)).toBeInstanceOf(ValidationFail);
  //   });
});

describe('validateDraft', () => {
  it('returns success if state is empty', () => {
    const draft = new Draft(
      Services.get('instagram'),
      EditorState.createEmpty()
    );
    const results = validateDraft(draft);
    expect(results.isValid()).toBeTruthy();
  });

  describe('shopgridLink', () => {
    it('return error for invalid url in shopgrid link', () => {
      const service = Services.get('instagram');

      const draft = new Draft(service, EditorState.createEmpty());

      draft.shopgridLink = 'blahblahblah';

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'The link URL format is invalid'
      );
    });

    it('return success for valid url in shopgrid link', () => {
      const service = Services.get('instagram');

      const draft = new Draft(service, EditorState.createEmpty());

      draft.shopgridLink = 'buffer.com';

      const results = validateDraft(draft);

      expect(results.isValid()).toBeTruthy();
    });

    it('return success for valid https url in shopgrid link', () => {
      const service = Services.get('instagram');

      const draft = new Draft(service, EditorState.createEmpty());

      draft.shopgridLink = 'https://buffer.com';

      const results = validateDraft(draft);

      expect(results.isValid()).toBeTruthy();
    });

    it('return success for empty string in shopgrid link', () => {
      const service = Services.get('instagram');

      const draft = new Draft(service, EditorState.createEmpty());

      draft.shopgridLink = 'https://buffer.com';

      const results = validateDraft(draft);

      expect(results.isValid()).toBeTruthy();
    });
  });

  describe('hashtags validation', () => {
    it('returns max hashtags error in text if they exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.maxHashtags = 4;

      const editorState = EditorState.createWithContent(
        ContentState.createFromText('#one #two #three #four #five')
      );

      const draft = new Draft(service, editorState);

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'At most 4 hashtags can be used for caption and comment'
      );
    });

    it('does not return max hashtags error in text if they do not exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.maxHashtags = 4;

      const editorState = EditorState.createWithContent(
        ContentState.createFromText('#one #two #three #four')
      );

      const draft = new Draft(service, editorState);
      const results = validateDraft(draft);
      expect(results.isValid()).toBeTruthy();
    });

    it('returns max hashtags error in comment if they exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.maxHashtags = 4;

      const draft = new Draft(service, EditorState.createEmpty());

      draft.commentText = '#one #two #three #four #five';

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'At most 4 hashtags can be used for caption and comment'
      );
    });

    it('does not return max hashtags error in comment if they do not exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.maxHashtags = 4;
      const draft = new Draft(service, EditorState.createEmpty());
      draft.commentText = '#one #two #three #four';

      const results = validateDraft(draft);

      expect(results.isValid()).toBeTruthy();
    });

    it('returns max hashtags error combined for comment and text if they exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.maxHashtags = 4;

      const editorState = EditorState.createWithContent(
        ContentState.createFromText('#one #two #three')
      );
      const draft = new Draft(service, editorState);
      draft.commentText = '#four #five';

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'At most 4 hashtags can be used for caption and comment'
      );
    });
  });

  describe('mentions validation', () => {
    it('returns max mentions error if they exceed the amount allowed in comment', () => {
      const service = Services.get('instagram');
      service.maxMentions = 4;

      const draft = new Draft(service, EditorState.createEmpty());

      draft.commentText = '@one @two @three @four @five';

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'At most 4 mentions can be used for caption and comment'
      );
    });

    it('returns max mentions error if they exceed the amount allowed in text', () => {
      const service = Services.get('instagram');
      service.maxMentions = 4;
      const editorState = EditorState.createWithContent(
        ContentState.createFromText('@one @two @three @four @five')
      );
      const draft = new Draft(service, editorState);

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'At most 4 mentions can be used for caption and comment'
      );
    });

    it('does not return max mentions error if they do not exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.maxMentions = 4;
      const draft = new Draft(service, EditorState.createEmpty());
      draft.commentText = '@one @two @three @four';

      const results = validateDraft(draft);

      expect(results.isValid()).toBeTruthy();
    });
  });

  describe('validateSourceUrlforPinterest', () => {
    it('returns ValidationFail if source url is an invalid link', () => {
      const service = Services.get('pinterest');

      const draft = new Draft(service, EditorState.createEmpty());

      draft.sourceLink = 'blabla';

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'Please include a valid destination link'
      );
    });

    it('returns ValidationFail if source url has link shortened', () => {
      const service = Services.get('pinterest');

      const draft = new Draft(service, EditorState.createEmpty());

      draft.sourceLink = { url: 'bit.ly/aa' };

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'Please include a destination link without link shortener'
      );
    });
  });

  describe('characters validation', () => {
    // draft.characterCommentCount is updated in the ComposerStore when the text changes
    // in updateDraftCommentCharacterCount but we can force the value
    // here to make sure the validation is ok.
    it('returns max characters error in comment if they exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.commentCharLimit = 10;
      const draft = new Draft(service, EditorState.createEmpty());
      draft.characterCommentCount = 11;

      const results = validateDraft(draft);

      expect(results.isInvalid()).toBeTruthy();
      expect(results.getErrorMessages()).toContain(
        'We can only fit 10 characters for comments'
      );
    });

    it('does not return max characters error in comment if they do not exceed the amount allowed', () => {
      const service = Services.get('instagram');
      service.commentCharLimit = 10;
      const draft = new Draft(service, EditorState.createEmpty());
      draft.characterCommentCount = 10;

      const results = validateDraft(draft);

      expect(results.isValid()).toBeTruthy();
    });
  });
});
