import deepFreeze from 'deep-freeze';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';
import reducer, { initialState, actionTypes } from './reducer';

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

  it('should handle queuedPosts_FETCH_START action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: {},
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'queuedPosts_FETCH_START',
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle queuedPosts_FETCH_SUCCESS action type', () => {
    const post = { post: { id: 'foo', text: 'i love buffer' } };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 2,
          posts: [post],
          total: 1,
        },
      },
    };
    const action = {
      profileId,
      type: 'queuedPosts_FETCH_SUCCESS',
      result: {
        updates: [post],
        total: 1,
      },
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle queuedPosts_FETCH_FAIL action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: {},
          total: 0,
        },
      },
    };
    const action = {
      profileId,
      type: 'queuedPosts_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle POST_CREATED action type', () => {
    const postCreated = { id: '12345', text: 'i love buffer so much' };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: postCreated },
          total: 0, // still 0 because counts are updated separately
        },
      },
    };
    const action = {
      type: actionTypes.POST_CREATED,
      profileId,
      post: postCreated,
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle POST_UPDATED action type', () => {
    const post = { id: '12345', text: 'i heart buffer' };
    const postEdited = { id: '12345', text: 'twitter is fun' };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: post },
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
          posts: { 12345: postEdited },
          total: 1,
        },
      },
      showComposer: false,
      environment: 'production',
      editMode: false,
      editingPostId: '',
    };
    const action = {
      type: actionTypes.POST_UPDATED,
      profileId,
      post: postEdited,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle POSTS_SWAPPED action type', () => {
    const postSource = {
      id: '12345',
      text: 'i heart buffer',
      postProps: {
        day: 'Tomorrow',
        due_at: 1552044000,
        scheduled_at: 1552044000,
        scheduledAt: 1552044000,
        postDetails: {
          isCustomScheduled: true,
          postAction:
            'This post is custom scheduled for March 8th at 11:20 AM (UTC).',
        },
      },
    };
    const postTarget = {
      id: '12346',
      text: 'testing things around',
      postProps: {
        day: 'Today',
        due_at: 1552003980,
        scheduled_at: 1552003980,
        scheduledAt: 1552003980,
        postDetails: {
          isCustomScheduled: false,
          postAction:
            'This post is custom scheduled for March 8th at 12:13 AM (UTC).',
        },
      },
    };

    const postSourceSwapped = {
      day: 'Today',
      due_at: 1552003980,
      id: '12345',
      postDetails: {
        isCustomScheduled: false,
        postAction:
          'This post is custom scheduled for March 8th at 12:13 AM (UTC).',
      },
      postProps: {
        day: 'Tomorrow',
        due_at: 1552044000,
        postDetails: {
          isCustomScheduled: true,
          postAction:
            'This post is custom scheduled for March 8th at 11:20 AM (UTC).',
        },
        scheduledAt: 1552044000,
        scheduled_at: 1552044000,
      },
      profile_timezone: undefined,
      scheduledAt: 1552003980,
      scheduled_at: 1552003980,
      text: 'i heart buffer',
    };

    const postTargetSwapped = {
      day: 'Tomorrow',
      due_at: 1552044000,
      id: '12346',
      postDetails: {
        isCustomScheduled: true,
        postAction:
          'This post is custom scheduled for March 8th at 11:20 AM (UTC).',
      },
      postProps: {
        day: 'Today',
        due_at: 1552003980,
        postDetails: {
          isCustomScheduled: false,
          postAction:
            'This post is custom scheduled for March 8th at 12:13 AM (UTC).',
        },
        scheduledAt: 1552003980,
        scheduled_at: 1552003980,
      },
      profile_timezone: undefined,
      scheduledAt: 1552044000,
      scheduled_at: 1552044000,
      text: 'testing things around',
    };

    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: postSource, 12346: postTarget },
          total: 2,
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
          posts: { 12345: postSourceSwapped, 12346: postTargetSwapped },
          total: 2,
        },
      },
      showComposer: false,
      environment: 'production',
      editMode: false,
      editingPostId: '',
    };
    const action = {
      type: actionTypes.POSTS_SWAPPED,
      profileId,
      postSource,
      postTarget,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // POST_CONFIRMED_DELETE
  it('should handle POST_CONFIRMED_DELETE action type', () => {
    const post = {
      id: '12345',
      text: 'i heart buffer',
      isConfirmingDelete: true,
      isDeleting: false,
    };
    const postAfter = { ...post, isConfirmingDelete: false, isDeleting: true };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: post },
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
          posts: { 12345: postAfter },
          total: 1,
        },
      },
    };
    const action = {
      type: actionTypes.POST_CONFIRMED_DELETE,
      profileId,
      post: postAfter,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  // POST_DELETED
  it('should handle POST_DELETED action type', () => {
    const post = {
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
          posts: { 12345: post },
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
          posts: {},
          total: 1, // still 1 because counts are updated separately
        },
      },
    };
    const action = {
      type: actionTypes.POST_DELETED,
      profileId,
      post,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('handles ORGANIZATION_SELECTED action type, sets preserveComposerStateOnClose to false to force the composer to refetch profiles on org switcher ', () => {
    const stateAfter = {
      ...initialState,
      preserveComposerStateOnClose: false,
    };

    const action = {
      type: orgActionTypes.ORGANIZATION_SELECTED,
      preserveComposerStateOnClose: false,
    };

    expect(reducer(initialState, action)).toEqual(stateAfter);
  });
});
