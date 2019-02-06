import deepFreeze from 'deep-freeze';
import reducer, { initialState, actionTypes } from './reducer';

const profileId = '123456';

describe('reducer', () => {
  it('should initialize default state', () => {
    const stateAfter = initialState;
    const action = {
      type: 'INIT',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
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
          showCalendar: false,
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
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
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
          showCalendar: false,
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
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
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
          showCalendar: false,
        },
      },
    };
    const action = {
      profileId,
      type: 'queuedPosts_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
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
          showCalendar: false,
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
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
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
          showCalendar: false,
        },
      },
      enabledApplicationModes: [],
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
          showCalendar: false,
          posts: { 12345: postEdited },
          total: 1,
        },
      },
      enabledApplicationModes: [],
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
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  // POST_CLICKED_DELETE
  it('should handle POST_CLICKED_DELETE action type', () => {
    const post = { id: '12345', text: 'i heart buffer', isConfirmingDelete: false };
    const postAfter = { ...post, isConfirmingDelete: true };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: post },
          total: 1,
          showCalendar: false,
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
          showCalendar: false,
        },
      },
    };
    const action = {
      type: actionTypes.POST_CLICKED_DELETE,
      profileId,
      post: postAfter,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  // POST_CONFIRMED_DELETE
  it('should handle POST_CONFIRMED_DELETE action type', () => {
    const post = { id: '12345', text: 'i heart buffer', isConfirmingDelete: true, isDeleting: false };
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
          showCalendar: false,
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
          showCalendar: false,
        },
      },
    };
    const action = {
      type: actionTypes.POST_CONFIRMED_DELETE,
      profileId,
      post: postAfter,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  // POST_DELETED
  it('should handle POST_DELETED action type', () => {
    const post = { id: '12345', text: 'i heart buffer', isConfirmingDelete: true, isDeleting: true };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: post },
          total: 1,
          showCalendar: false,
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
          posts: { },
          total: 1, // still 1 because counts are updated separately
          showCalendar: false,
        },
      },
    };
    const action = {
      type: actionTypes.POST_DELETED,
      profileId,
      post,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  // POST_CANCELED_DELETE
  it('should handle POST_CANCELED_DELETE action type', () => {
    const post = { id: '12345', text: 'i heart buffer', isConfirmingDelete: true, isDeleting: false };
    const postAfter = { ...post, isConfirmingDelete: false, isDeleting: false };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: post },
          total: 1,
          showCalendar: false,
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
          showCalendar: false,
        },
      },
    };
    const action = {
      type: actionTypes.POST_CANCELED_DELETE,
      profileId,
      post: postAfter,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  // TOGGLE_CALENDAR
  it('should handle TOGGLE_CALENDAR action type', () => {
    const post = { id: '12345', text: 'i heart buffer', isConfirmingDelete: false, isDeleting: false };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: post },
          total: 1,
          showCalendar: false,
        },
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          numberOfPostsByDate: null,
          page: 1,
          posts: { 12345: post },
          total: 1,
          showCalendar: true,
        },
      },
    };
    const action = {
      type: actionTypes.TOGGLE_CALENDAR,
      profileId,
      post,
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  // GET_NUMBER_POSTS
  it('should handle getNumberOfPosts_FETCH_SUCCESS action type', () => {
    const post = { id: '12345', text: 'i heart buffer' };
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          posts: { 12345: post },
          total: 1,
          showCalendar: false,
        },
      },
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          numberOfPostsByDate: { 'Tue Oct 02 2018': 1 },
          page: 1,
          posts: { 12345: post },
          total: 1,
          showCalendar: false,
        },
      },
    };

    const action = {
      profileId,
      type: 'getNumberOfPosts_FETCH_SUCCESS',
      result: {
        numberOfPostsByDate: { 'Tue Oct 02 2018': 1 },
      },
    };
    deepFreeze(action);
    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
