import { EditorState, ContentState } from '@bufferapp/draft-js';

import Draft from '../../entities/Draft';

import { AttachmentTypes, Services } from '../../AppConstants';

describe('constructor', () => {
  const editorState = EditorState.createEmpty();

  it('creates a new object with right attributes by default', () => {
    const instagramService = Services.get('instagram');
    const draft = new Draft(instagramService, editorState);

    expect(draft.id).toBe(instagramService.name);
    expect(draft.service).toBe(instagramService);
    expect(draft.editorState).toEqual(editorState);
    expect(draft.urls).toEqual([]);
    expect(draft.unshortenedUrls).toEqual([]);
    expect(draft.link).toBeNull();
    expect(draft.tempImage).toBeNull();
    expect(draft.images).toEqual([]);
    expect(draft.availableImages).toEqual([]);
    expect(draft.video).toBeNull();
    expect(draft.attachedMediaEditingPayload).toBeNull();
    expect(draft.gif).toBeNull();
    expect(draft.retweet).toBeNull();
    expect(draft.isEnabled).toBeFalsy();
    expect(draft.filesUploadProgress).toEqual(new Map());
    expect(draft.sourceLink).toBeNull();
    expect(draft.isSaved).toBeFalsy();
    expect(draft.hasSavingError).toBeFalsy();
    expect(draft.shortLinkLongLinkMap).toEqual(new Map());
    expect(draft.scheduledAt).toBeNull();
    expect(draft.isPinnedToSlot).toBeNull();
    expect(draft.instagramFeedback).toEqual([]);
    expect(draft.locationId).toBeNull();
    expect(draft.locationName).toBeNull();
  });

  it('sets characterCount to 0 if there is a character limit in the service', () => {
    const exampleService = Services.get('instagram');
    exampleService.charLimit = 123;
    const draftWithMedia = new Draft(exampleService, editorState);
    expect(draftWithMedia.characterCount).toBe(0);
  });

  it('sets characterCount to null if there is not a character limit in the service', () => {
    const exampleService = Services.get('instagram');
    exampleService.charLimit = null;
    const draftWithMedia = new Draft(exampleService, editorState);
    expect(draftWithMedia.characterCount).toBeNull();
  });

  it('sets characterCommentCount to 0 if there is a comment character limit in the service', () => {
    const exampleService = Services.get('instagram');
    exampleService.commentCharLimit = 123;
    const draftWithMedia = new Draft(exampleService, editorState);
    expect(draftWithMedia.characterCommentCount).toBe(0);
  });

  it('sets characterCommentCount to null if there is not a comment character limit in the service', () => {
    const exampleService = Services.get('instagram');
    exampleService.commentCharLimit = null;
    const draftWithMedia = new Draft(exampleService, editorState);
    expect(draftWithMedia.characterCommentCount).toBeNull();
  });


  it('sets enabledAttachmentType to MEDIA when service can have it but cannot have link', () => {
    const exampleService = Services.get('instagram');
    exampleService.unavailableAttachmentTypes = [AttachmentTypes.LINK];
    const draftWithMedia = new Draft(exampleService, editorState);
    expect(draftWithMedia.enabledAttachmentType).toBe(AttachmentTypes.MEDIA);
  });

  it('sets enabledAttachmentType to null when service cannot have MEDIA as attachment', () => {
    const exampleService = Services.get('instagram');
    exampleService.unavailableAttachmentTypes = [AttachmentTypes.MEDIA];
    const draftWithMedia = new Draft(exampleService, editorState);
    expect(draftWithMedia.enabledAttachmentType).toBeNull();
  });

  it('sets enabledAttachmentType to null when service can have LINK as attachment', () => {
    const exampleService = Services.get('instagram');
    exampleService.unavailableAttachmentTypes = [
      AttachmentTypes.MEDIA,
      AttachmentTypes.RETWEET,
    ];
    const draftWithMedia = new Draft(exampleService, editorState);
    expect(draftWithMedia.enabledAttachmentType).toBeNull();
  });
});


describe('isEmpty', () => {
  it('is false if plain text is present', () => {
    const editorState = EditorState.createWithContent(ContentState.createFromText('Text'));
    const exampleService = Services.get('instagram');
    const draft = new Draft(exampleService, editorState);
    expect(draft.isEmpty()).toBeFalsy();
  });

  it('is false if can have media attached and images are present', () => {
    const editorState = EditorState.createEmpty();
    const exampleService = Services.get('twitter');
    exampleService.unavailableAttachmentTypes = [AttachmentTypes.LINK];
    const draft = new Draft(exampleService, editorState);

    draft.images = ['1', '2'];

    expect(draft.isEmpty()).toBeFalsy();
  });

  it('is false if can have media attached and video is present', () => {
    const editorState = EditorState.createEmpty();
    const exampleService = Services.get('twitter');
    exampleService.unavailableAttachmentTypes = [AttachmentTypes.LINK];
    const draft = new Draft(exampleService, editorState);

    draft.video = 'https://example.com/video';

    expect(draft.isEmpty()).toBeFalsy();
  });

  it('is false if can have media attached and gif is present', () => {
    const editorState = EditorState.createEmpty();
    const exampleService = Services.get('twitter');
    exampleService.unavailableAttachmentTypes = [AttachmentTypes.LINK];
    const draft = new Draft(exampleService, editorState);

    draft.gif = 'https://example.com/gif';

    expect(draft.isEmpty()).toBeFalsy();
  });

  it('is false if sourceLink is present', () => {
    const editorState = EditorState.createEmpty();
    const exampleService = Services.get('twitter');
    exampleService.unavailableAttachmentTypes = [AttachmentTypes.MEDIA];
    const draft = new Draft(exampleService, editorState);

    draft.sourceLink = 'https://example.com';

    expect(draft.isEmpty()).toBeFalsy();
  });

  it('is true if all conditions are met', () => {
    const editorState = EditorState.createEmpty();
    const exampleService = Services.get('twitter');
    exampleService.unavailableAttachmentTypes = [AttachmentTypes.LINK];
    const draft = new Draft(exampleService, editorState);
    expect(draft.isEmpty()).toBeTruthy();
  });
});
