import validateDraft from '../../../lib/validation/ValidateDraft';
import ValidationSuccess from '../../../lib/validation/ValidationSuccess';
import ValidationFail from '../../../lib/validation/ValidationFail';

import { Services, AttachmentTypes } from '../../../AppConstants';

function getInstagramService() {
  return Services.find((service) => service.name === 'instagram');
}

describe('When validateDraft is called with draft with video', () => {
  it('returns ValidationFail if video too big', () => {
    const instagramService = getInstagramService();

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize * 2, // Twice what's allowed
      },
      service: instagramService,
    };

    const maxFileSizeInMb = instagramService.videoMaxSize / 1024 / 1024;
    const expectedMessage = `Please try again with a smaller file. Videos need to be smaller than ${maxFileSizeInMb}MB`;
    expect(validateDraft(draft)).toEqual(new ValidationFail(expectedMessage));
  });

  it('returns ValidationFail if video is too short', () => {
    const instagramService = getInstagramService();

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize / 2,
        durationMs: instagramService.videoMinDurationMs - 1000,
      },
      service: instagramService,
    };

    const expectedMessage = 'Please lengthen your video and try again. Videos need to be longer than 3 seconds';
    expect(validateDraft(draft)).toEqual(new ValidationFail(expectedMessage));
  });

  it('returns ValidationFail if video is too long', () => {
    const instagramService = getInstagramService();

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize / 2,
        durationMs: instagramService.videoMaxDurationMs * 2,
      },
      service: instagramService,
    };

    const expectedMessage = 'Please shorten your video and try again. Videos need to be under 60 seconds long';
    expect(validateDraft(draft)).toEqual(new ValidationFail(expectedMessage));
  });

  it('returns ValidationSuccess if video is within limits', () => {
    const instagramService = getInstagramService();

    const draft = {
      enabledAttachmentType: AttachmentTypes.MEDIA,
      video: {
        size: instagramService.videoMaxSize / 2,
        durationMs: instagramService.videoMaxDurationMs / 2,
      },
      service: instagramService,
    };

    expect(validateDraft(draft)).toEqual(new ValidationSuccess());
  });
  // TODO: Add this back after we add all IG validation failures as reminders, not errors
  // it('returns ValidationSuccess if video meets the required aspect ratio', () => {
  //   const instagramService = getInstagramService();
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
  //   expect(validateDraft(draft)).toBeInstanceOf(ValidationSuccess);
  // });
  // it('returns ValidationFail if video is smaller than the req. aspect ratio', () => {
  //   const instagramService = getInstagramService();
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
  //   expect(validateDraft(draft)).toBeInstanceOf(ValidationFail);
  // });
//   it('returns ValidationFail if video is larger than the req. aspect ratio', () => {
//     const instagramService = getInstagramService();
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
//     expect(validateDraft(draft)).toBeInstanceOf(ValidationFail);
//   });
});

describe('When validateDraft is called with draft without video', () => {
  it('returns ValidationSuccess', () => {
    const draft = {
      video: null,
    };

    expect(validateDraft(draft)).toEqual(new ValidationSuccess());
  });
});
