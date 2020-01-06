import deepFreeze from 'deep-freeze';
import reducer, { actions, initialState, actionTypes } from './reducer';

const profileId = '123456';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = initialState;
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle draftPosts_FETCH_START action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          drafts: {},
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'draftPosts_FETCH_START',
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle draftPosts_FETCH_SUCCESS action type', () => {
    const draft = { draft: { id: 'foo', text: 'i love buffer' } };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          drafts: { draft },
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 2,
          total: 1,
        },
      },
    };
    const action = {
      profileId,
      type: 'draftPosts_FETCH_SUCCESS',
      result: {
        drafts: { draft },
        total: 1,
      },
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle draftPosts_FETCH_FAIL action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          drafts: {},
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'draftPosts_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  // DRAFT_CREATED
  it('should handle DRAFT_CREATED action type', () => {
    const draftCreated = { id: '12345', text: 'i love buffer so much' };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draftCreated },
          total: 0, // still 0 because counts are updated separately
        },
      },
    };
    const action = {
      type: actionTypes.DRAFT_CREATED,
      profileId,
      draft: draftCreated,
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  // DRAFT_UPDATED
  it('should handle DRAFT_UPDATED action type', () => {
    const draft = { id: '12345', text: 'i heart buffer' };
    const draftEdited = { id: '12345', text: 'twitter is fun' };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draft },
          total: 1,
        },
      },
      showComposer: false,
      environment: 'production',
      editMode: false,
      editingPostId: '',
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draftEdited },
          total: 1,
        },
      },
      showComposer: false,
      environment: 'production',
      editMode: false,
      editingPostId: '',
    };
    const action = {
      type: actionTypes.DRAFT_UPDATED,
      profile: {
        id: profileId,
      },
      draft: draftEdited,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // DRAFT_DELETED
  it('should handle DRAFT_DELETED action type', () => {
    const draft = {
      id: '12345',
      text: 'i heart buffer',
      isConfirmingDelete: true,
      isDeleting: true,
    };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draft },
          total: 1,
        },
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: {},
          total: 1, // still 1 because counts are updated separately
        },
      },
    };
    const action = {
      type: actionTypes.DRAFT_DELETED,
      profileId,
      draft,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // DRAFT_APPROVED.
  it('should handle DRAFT_APPROVED action type', () => {
    const draft = { id: '12345', text: 'i love buffer so much' };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: {}, // when approved it is removed from drafts to be added to the queue.
          total: 0,
        },
      },
    };
    const action = {
      type: actionTypes.DRAFT_APPROVED,
      profileId,
      draft,
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  // DRAFT_CONFIRMED_DELETE
  it('should handle DRAFT_CONFIRMED_DELETE action type', () => {
    const draft = {
      id: '12345',
      text: 'i heart buffer',
      isConfirmingDelete: true,
      isDeleting: false,
    };
    const draftAfter = {
      ...draft,
      isConfirmingDelete: false,
      isDeleting: true,
    };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draft },
          total: 1,
        },
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draftAfter },
          total: 1,
        },
      },
    };
    const action = {
      type: actionTypes.DRAFT_CONFIRMED_DELETE,
      profileId,
      draft: draftAfter,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // DRAFT_APPROVE
  it('should handle DRAFT_APPROVE action type', () => {
    const draft = {
      id: '12345',
      text: 'i heart buffer',
      isConfirmingDelete: false,
    };
    const draftAfter = { ...draft, isWorking: true };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draft },
          total: 1,
        },
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draftAfter },
          total: 1,
        },
      },
    };
    const action = {
      type: actionTypes.DRAFT_APPROVE,
      profileId,
      draft: draftAfter,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // DRAFT_NEEDS_APPROVAL
  it('should handle DRAFT_NEEDS_APPROVAL action type', () => {
    const draft = {
      id: '12345',
      text: 'i heart buffer',
      isConfirmingDelete: false,
    };
    const draftAfter = { ...draft, isMoving: true };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draft },
          total: 1,
        },
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: { 12345: draftAfter },
          total: 1,
        },
      },
    };
    const action = {
      type: actionTypes.DRAFT_NEEDS_APPROVAL,
      profileId,
      updateId: 12345,
      draft: draftAfter,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // OPEN_COMPOSER
  it('should handle OPEN_COMPOSER action type', () => {
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: {},
          total: 1,
        },
      },
      showComposer: false,
      editMode: false,
      editingPostId: '',
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: {},
          total: 1,
        },
      },
      showComposer: true,
      editMode: true,
      editingPostId: 'abc',
    };

    const action = {
      type: actionTypes.OPEN_COMPOSER,
      profileId,
      editMode: true,
      updateId: 'abc',
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // HIDE_COMPOSER
  it('should handle HIDE_COMPOSER action type', () => {
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: {},
          total: 1,
        },
      },
      showComposer: true,
      editMode: true,
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          drafts: {},
          total: 1,
        },
      },
      showComposer: false,
      editMode: false,
    };

    const action = {
      type: actionTypes.HIDE_COMPOSER,
      profileId,
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  describe('actions', () => {
    const draft = { id: '12345', text: 'i heart buffer' };

    it('handleApproveClick triggers a DRAFT_APPROVE action', () => {
      expect(actions.handleApproveClick({ draft })).toEqual({
        type: actionTypes.DRAFT_APPROVE,
        updateId: draft.id,
        draft,
      });
    });

    it('handleRequestApprovalClick triggers a DRAFT_NEEDS_APPROVAL action', () => {
      const needsApproval = true;
      expect(
        actions.handleRequestApprovalClick({ draft, needsApproval })
      ).toEqual({
        type: actionTypes.DRAFT_NEEDS_APPROVAL,
        updateId: draft.id,
        needsApproval,
        draft,
      });
    });

    it('handleRescheduleClick triggers a OPEN_COMPOSER action', () => {
      expect(actions.handleRescheduleClick({ draft, profileId })).toEqual({
        type: actionTypes.OPEN_COMPOSER,
        updateId: draft.id,
        editMode: true,
        draft,
        profileId,
      });
    });

    it('handleEditClick triggers a OPEN_COMPOSER action', () => {
      expect(actions.handleEditClick({ draft, profileId })).toEqual({
        type: actionTypes.OPEN_COMPOSER,
        updateId: draft.id,
        editMode: true,
        draft,
        profileId,
      });
    });

    it('handleDeleteConfirmClick triggers a DRAFT_CONFIRMED_DELETE action', () => {
      expect(actions.handleDeleteConfirmClick({ draft, profileId })).toEqual({
        type: actionTypes.DRAFT_CONFIRMED_DELETE,
        updateId: draft.id,
        draft,
        profileId,
      });
    });

    it('handleComposerPlaceholderClick triggers a OPEN_COMPOSER action', () => {
      expect(actions.handleComposerPlaceholderClick()).toEqual({
        type: actionTypes.OPEN_COMPOSER,
      });
    });

    it('handleComposerCreateSuccess triggers a HIDE_COMPOSER action', () => {
      expect(actions.handleComposerCreateSuccess()).toEqual({
        type: actionTypes.HIDE_COMPOSER,
      });
    });
  });
});
