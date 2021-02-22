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
  let getDraftCharacterCount;

  beforeEach(() => {
    AppDispatcher = require('../dispatcher').default; //eslint-disable-line
    let ComposerStoreMod = require('../stores/ComposerStore'); //eslint-disable-line
    ComposerStore = ComposerStoreMod.default;
    getDraftCharacterCount = ComposerStoreMod.getDraftCharacterCount;
  });

  it('does not add instagramFeedback when profile with Video is selected', () => {
    AppDispatcher.dispatch(addUserData);
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddVideo);
    AppDispatcher.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.getDraft('instagram');
    expect(draft.instagramFeedback.length).toEqual(0);
  });

  it('adds instagramFeedback when profile without video is selected', () => {
    AppDispatcher.dispatch(addUserData);
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddVideo);
    AppDispatcher.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.getDraft('instagram');
    draft.video = null;
    expect(draft.instagramFeedback.length).toEqual(0);
  });

  it('adds instagramFeedback for galleries', () => {
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddImage);
    AppDispatcher.dispatch(actionAddImage);
    AppDispatcher.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.getDraft('instagram');
    expect(draft.instagramFeedback[0].message).toEqual(
      "Due to Instagram limitations, we can't post galleries on your behalf. You will receive a Reminder to post manually when the time comes!"
    );
  });

  it('sets draft postDirectToInstagram to false when video is added', () => {
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddVideo);
    AppDispatcher.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.getDraft('instagram');
    expect(draft.postDirectToInstagram).toBeFalsy();
  });

  it('returns total amount of characters for caption', () => {
    const id = 'instagram';
    const text = 'Hello';
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddVideo);
    AppDispatcher.dispatch(actionUpdateInstaState);
    const characterCount = getDraftCharacterCount(id, text);
    expect(characterCount).toEqual(5);
  });

  it('returns total amount of characters for caption when no text', () => {
    const id = 'instagram';
    const text = null;
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddVideo);
    AppDispatcher.dispatch(actionUpdateInstaState);
    const characterCount = getDraftCharacterCount(id, text);
    expect(characterCount).toEqual(0);
  });

  it('returns total amount of characters for caption with newlines', () => {
    const id = 'instagram';
    const text = 'Hello\n';
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddVideo);
    AppDispatcher.dispatch(actionUpdateInstaState);
    const characterCount = getDraftCharacterCount(id, text);
    expect(characterCount).toEqual(7);
  });

  it('sets the comment text in the draft', () => {
    const id = 'instagram';
    const commentText = 'Comment';
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddImage);
    AppDispatcher.dispatch(actionUpdateDraftComment(id, commentText));
    AppDispatcher.dispatch(actionUpdateInstaState);
    const draft = ComposerStore.getDraft('instagram');
    expect(draft.commentText).toEqual(commentText);
  });

  it('returns total amount of characters for comment', () => {
    const id = 'instagram';
    const commentText = 'Comment';
    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfile);
    AppDispatcher.dispatch(actionEnableInstagramDraft);
    AppDispatcher.dispatch(actionAddImage);
    AppDispatcher.dispatch(actionUpdateDraftComment(id, commentText));
    AppDispatcher.dispatch(actionUpdateInstaState);
    const characterCommentCount = getDraftCharacterCount(id, commentText);
    expect(characterCommentCount).toEqual(7);
  });

  it('returns total amount of characters for facebook draft', () => {
    const id = 'facebook';

    AppDispatcher.dispatch(actionAddProfiles);
    AppDispatcher.dispatch(actionSelectProfileFacebook);
    AppDispatcher.dispatch(actionEnableFacebookDraft);
    AppDispatcher.dispatch(actionAddImageFacebook);

    expect(getDraftCharacterCount(id, 'Text with 23 characters')).toEqual(23);
    expect(getDraftCharacterCount(id, '')).toEqual(0);
    expect(getDraftCharacterCount(id, null)).toEqual(0);
  });

  describe('soft reset state', () => {
    it('returns the drafts objects', () => {
      AppDispatcher.dispatch(actionAddProfiles);
      AppDispatcher.dispatch(actionSelectProfile);
      AppDispatcher.dispatch(actionEnableInstagramDraft);
      AppDispatcher.dispatch(actionAddImage);
      AppDispatcher.dispatch(actionSoftReset);
      const draftsAfterReset = ComposerStore.getDrafts();

      expect(draftsAfterReset.length).toBeGreaterThan(0);
      expect(draftsAfterReset[0].constructor.name).toEqual('Draft');
    });
  });
});
