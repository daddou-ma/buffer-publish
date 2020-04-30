import deepFreeze from 'deep-freeze';
import reducer, {
  actions,
  initialState,
  profileInitialState,
  actionTypes,
} from './reducer';
import { header, subHeader } from './components/PastRemindersPosts/postData';

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

  it('should handle pastRemindersPosts_FETCH_START action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          header,
          subHeader,
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
      type: 'pastRemindersPosts_FETCH_START',
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle pastRemindersPosts_FETCH_SUCCESS action type', () => {
    const post = { id: 'foo', text: 'i love buffer' };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          header,
          subHeader,
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
      type: 'pastRemindersPosts_FETCH_SUCCESS',
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

  it('should handle pastRemindersPosts_FETCH_FAIL action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          header,
          subHeader,
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
      type: 'pastRemindersPosts_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle getPastRemindersStories_FETCH_START action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          header,
          subHeader,
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
      type: 'getPastRemindersStories_FETCH_START',
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle getPastRemindersStories_FETCH_SUCCESS action type', () => {
    const post = { id: 'foo', text: 'i love buffer' };
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          header,
          subHeader,
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
      type: 'getPastRemindersStories_FETCH_SUCCESS',
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

  it('should handle getPastRemindersStories_FETCH_FAIL action type', () => {
    const stateAfter = {
      ...initialState,
      byProfileId: {
        [profileId]: {
          header,
          subHeader,
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
      type: 'getPastRemindersStories_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action)).toEqual(stateAfter);
  });

  it('should handle OPEN_COMPOSER action type', () => {
    const stateComposerHidden = Object.assign(initialState, {
      showComposer: false,
    });

    const action = {
      profileId,
      type: 'OPEN_COMPOSER',
    };

    expect(reducer(stateComposerHidden, action)).toEqual(
      Object.assign(initialState, { showComposer: true })
    );
  });

  it('should handle HIDE_COMPOSER action type', () => {
    const stateComposerVisible = Object.assign(initialState, {
      showComposer: true,
    });

    const action = {
      profileId,
      type: 'HIDE_COMPOSER',
    };

    expect(reducer(stateComposerVisible, action)).toEqual(
      Object.assign(initialState, { showComposer: false })
    );
  });

  it('should handle OPEN_STORIES_COMPOSER action type', () => {
    const stateBefore = {
      ...initialState,
      showStoriesComposer: false,
      editMode: false,
      emptySlotMode: false,
      emptySlotData: null,
      editingPostId: '',
      showStoryPreview: false,
    };
    const stateAfter = {
      ...initialState,
      showStoriesComposer: true,
      editMode: false,
      editingPostId: '123',
      emptySlotMode: false,
      emptySlotData: null,
    };

    const action = {
      profileId,
      type: actionTypes.OPEN_STORIES_COMPOSER,
      editMode: false,
      updateId: '123',
    };

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle HIDE_STORIES_COMPOSER action type', () => {
    const stateBefore = {
      ...initialState,
      showStoriesComposer: true,
      editMode: false,
      emptySlotMode: false,
      emptySlotData: null,
      editingPostId: '',
      showStoryPreview: false,
    };
    const stateAfter = {
      ...initialState,
      showStoriesComposer: false,
      editMode: false,
      emptySlotMode: false,
      emptySlotData: null,
    };
    const action = {
      type: actionTypes.HIDE_STORIES_COMPOSER,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle TOGGLE_VIEW_TYPE action type', () => {
    const stateBefore = {
      ...initialState,
      viewType: 'posts',
    };
    const stateAfter = {
      ...initialState,
      profileId: '123',
      viewType: 'stories',
    };
    const action = {
      type: actionTypes.TOGGLE_VIEW_TYPE,
      profileId: '123',
      viewType: 'stories',
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle OPEN_PREVIEW action type', () => {
    const stateBefore = {
      ...initialState,
      showStoryPreview: false,
    };
    const stateAfter = {
      ...initialState,
      showStoryPreview: true,
    };
    const action = {
      type: actionTypes.OPEN_PREVIEW,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  it('should handle CLOSE_PREVIEW action type', () => {
    const stateBefore = {
      ...initialState,
      showStoryPreview: true,
    };
    const stateAfter = {
      ...initialState,
      showStoryPreview: false,
    };
    const action = {
      type: actionTypes.CLOSE_PREVIEW,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action)).toEqual(stateAfter);
  });

  describe('actions', () => {
    it('handleMobileClick triggers a POST_MOBILE_REMINDER action', () => {
      const post = { id: 'id1' };
      expect(actions.handleMobileClick({ post })).toEqual({
        type: actionTypes.POST_MOBILE_REMINDER,
        updateId: post.id,
      });
    });

    it('handleStoryGroupMobileClick triggers a STORY_GROUP_MOBILE_REMINDER action', () => {
      const post = { id: 'id1' };
      expect(actions.handleStoryGroupMobileClick({ post, profileId })).toEqual({
        type: actionTypes.STORY_GROUP_MOBILE_REMINDER,
        updateId: post.id,
        storyGroup: post,
        profileId,
      });
    });

    it('handleToggleViewType triggers a TOGGLE_VIEW_TYPE action', () => {
      const viewType = 'stories';
      expect(actions.handleToggleViewType({ profileId, viewType })).toEqual({
        type: actionTypes.TOGGLE_VIEW_TYPE,
        profileId,
        viewType,
      });
    });

    it('handlePreviewClick triggers a OPEN_PREVIEW action', () => {
      expect(actions.handlePreviewClick()).toEqual({
        type: actionTypes.OPEN_PREVIEW,
      });
    });

    it('handleClosePreviewClick triggers a CLOSE_PREVIEW action', () => {
      expect(actions.handleClosePreviewClick()).toEqual({
        type: actionTypes.CLOSE_PREVIEW,
      });
    });
  });
});
