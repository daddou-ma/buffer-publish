import { ActionTypes } from '../AppConstants';
import {
  fakeImageData,
  fakeUserData,
  fakeVideoData,
  rawProfilesData,
} from './stubData';

jest.dontMock('../stores/ComposerStore');

describe('ComposerStore', () => {
  const addUserData = {
    action: {
      actionType: ActionTypes.APP_RECEIVE_USER_DATA,
      userData: fakeUserData,
    },
  };

  const actionAddImage = {
    action: {
      actionType: ActionTypes.COMPOSER_ADD_DRAFT_IMAGE,
      id: 'instagram',
      image: fakeImageData,
    },
  };

  const actionAddImageFacebook = {
    action: {
      actionType: ActionTypes.COMPOSER_ADD_DRAFT_IMAGE,
      id: 'facebook',
      image: fakeImageData,
    },
  };

  const actionAddVideo = {
    action: {
      actionType: ActionTypes.COMPOSER_ADD_DRAFT_VIDEO,
      id: 'instagram',
      video: fakeVideoData,
    },
  };

  const actionUpdateInstaState = {
    action: {
      actionType: ActionTypes.COMPOSER_UPDATE_INSTAGRAM_STATE,
    },
  };

  const actionEnableInstagramDraft = {
    action: {
      actionType: ActionTypes.COMPOSER_ENABLE,
      id: 'instagram',
    },
  };

  const actionEnableFacebookDraft = {
    action: {
      actionType: ActionTypes.COMPOSER_ENABLE,
      id: 'facebook',
    },
  };

  const actionAddProfiles = {
    action: {
      actionType: ActionTypes.COMPOSER_CREATE_PROFILES,
      profilesData: rawProfilesData,
    },
  };

  const actionSoftReset = {
    action: {
      actionType: ActionTypes.APP_SOFT_RESET,
    },
  };

  const actionSelectProfile = {
    action: {
      actionType: ActionTypes.COMPOSER_SELECT_PROFILE,
      id: '5a81d9ae63fbc389007b23c6',
    },
  };

  const actionSelectProfileFacebook = {
    action: {
      actionType: ActionTypes.COMPOSER_SELECT_PROFILE,
      id: '59cd5270b7ca102c117a12b1',
    },
  };

  const actionUpdateDraftShopgridLink = (id, shopgridLink) => ({
    action: {
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_SHOPGRID_LINK,
      id,
      shopgridLink,
    },
  });

  const actionUpdateDraftComment = (id, commentText) => ({
    action: {
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_COMMENT,
      id,
      commentText,
    },
  });

  let AppDispatcher;
  let ComposerStore;

  beforeEach(() => {
    // need to recreate the dispatcher & store here each time
    AppDispatcher = require('../dispatcher'); //eslint-disable-line
    ComposerStore = require('../stores/ComposerStore'); //eslint-disable-line
  });

  it('does not add instagramFeedback when profile with Video is selected', () => {
    AppDispatcher.default.dispatch(addUserData);
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddVideo);
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.default.getDraft('instagram');
    expect(draft.instagramFeedback.length).toEqual(0);
  });

  it('adds instagramFeedback when profile without video is selected', () => {
    AppDispatcher.default.dispatch(addUserData);
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddVideo);
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.default.getDraft('instagram');
    draft.video = null;
    expect(draft.instagramFeedback.length).toEqual(0);
  });

  it('adds instagramFeedback for galleries', () => {
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddImage);
    AppDispatcher.default.dispatch(actionAddImage);
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.default.getDraft('instagram');
    expect(draft.instagramFeedback[0].message).toEqual(
      "Due to Instagram limitations, we can't post galleries on your behalf. You will receive a Reminder to post manually when the time comes!"
    );
  });

  it('sets draft postDirectToInstagram to false when video is added', () => {
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddVideo);
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.default.getDraft('instagram');
    expect(draft.postDirectToInstagram).toBeFalsy();
  });

  it('returns total amount of characters for caption', () => {
    const id = 'instagram';
    const text = 'Hello';
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddVideo);
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const characterCount = ComposerStore.getDraftCharacterCount(id, text);
    expect(characterCount).toEqual(5);
  });

  it('returns total amount of characters for caption when no text', () => {
    const id = 'instagram';
    const text = null;
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddVideo);
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const characterCount = ComposerStore.getDraftCharacterCount(id, text);
    expect(characterCount).toEqual(0);
  });

  it('returns total amount of characters for caption with newlines', () => {
    const id = 'instagram';
    const text = 'Hello\n';
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddVideo);
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const characterCount = ComposerStore.getDraftCharacterCount(id, text);
    expect(characterCount).toEqual(7);
  });

  it('sets the comment text in the draft', () => {
    const id = 'instagram';
    const commentText = 'Comment';
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddImage);
    AppDispatcher.default.dispatch(actionUpdateDraftComment(id, commentText));
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.default.getDraft('instagram');
    expect(draft.commentText).toEqual(commentText);
  });

  it('returns total amount of characters for comment', () => {
    const id = 'instagram';
    const commentText = 'Comment';
    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfile);
    AppDispatcher.default.dispatch(actionEnableInstagramDraft);
    AppDispatcher.default.dispatch(actionAddImage);
    AppDispatcher.default.dispatch(actionUpdateDraftComment(id, commentText));
    AppDispatcher.default.dispatch(actionUpdateInstaState);
    const characterCommentCount = ComposerStore.getDraftCharacterCount(
      id,
      commentText
    );
    expect(characterCommentCount).toEqual(7);
  });

  it('returns total amount of characters for facebook draft', () => {
    const id = 'facebook';

    AppDispatcher.default.dispatch(actionAddProfiles);
    AppDispatcher.default.dispatch(actionSelectProfileFacebook);
    AppDispatcher.default.dispatch(actionEnableFacebookDraft);
    AppDispatcher.default.dispatch(actionAddImageFacebook);

    expect(
      ComposerStore.getDraftCharacterCount(id, 'Text with 23 characters')
    ).toEqual(23);
    expect(ComposerStore.getDraftCharacterCount(id, '')).toEqual(0);
    expect(ComposerStore.getDraftCharacterCount(id, null)).toEqual(0);
  });

  describe('soft reset state', () => {
    it('returns the drafts objects', () => {
      AppDispatcher.default.dispatch(actionAddProfiles);
      AppDispatcher.default.dispatch(actionSelectProfile);
      AppDispatcher.default.dispatch(actionEnableInstagramDraft);
      AppDispatcher.default.dispatch(actionAddImage);
      AppDispatcher.default.dispatch(actionSoftReset);
      const draftsAfterReset = ComposerStore.default.getDrafts();

      expect(draftsAfterReset.length).toBeGreaterThan(0);
      expect(draftsAfterReset[0].constructor.name).toEqual('Draft');
    });
  });
});
