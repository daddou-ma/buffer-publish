import deepFreeze from 'deep-freeze';
import reducer, { initialState, profileInitialState, actionTypes } from './reducer';

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

  it('should handle getStoryGroups_FETCH_START action type', () => {
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: true,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          storyPosts: {},
          total: 0,
        },
      },
      showStoryPreview: false,
    };
    const action = {
      profileId,
      type: 'getStoryGroups_FETCH_START',
      args: {
        isFetchingMore: false,
      },
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle getStoryGroups_FETCH_SUCCESS action type', () => {
    const storyPost = { storyPost: { id: 'foo', text: 'i love buffer' } };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 2,
          storyPosts: [storyPost],
          total: 1,
        },
      },
      showStoryPreview: false,
    };
    const action = {
      profileId,
      type: 'getStoryGroups_FETCH_SUCCESS',
      result: {
        updates: [storyPost],
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

  it('should handle getStoryGroups_FETCH_FAIL action type', () => {
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          loading: false,
          loadingMore: false,
          moreToLoad: false,
          page: 1,
          storyPosts: {},
          total: 0,
        },
      },
      showStoryPreview: false,
    };
    const action = {
      profileId,
      type: 'getStoryGroups_FETCH_FAIL',
    };
    deepFreeze(action);
    expect(reducer(undefined, action))
      .toEqual(stateAfter);
  });

  it('should handle DELETE_STORY_GROUP action type', () => {
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          storyPosts: {
            '1sg': { _id: '1sg', stories: [] },
            '2sg': { _id: '2sg', stories: [] },
          },
        },
      },
      showStoryPreview: false,
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          storyPosts: {
            '1sg': { _id: '1sg', stories: [] },
          },
        },
      },
      showStoryPreview: false,
    };

    const action = {
      type: actionTypes.DELETE_STORY_GROUP,
      storyGroup: {
        id: '2sg',
      },
      profileId,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });

  it('should handle STORY_GROUP_SHARE_NOW action type', () => {
    const stateBefore = {
      byProfileId: {
        [profileId]: {
          storyPosts: {
            '1sg': { _id: '1sg', stories: [] },
          },
        },
      },
      showStoryPreview: false,
    };
    const stateAfter = {
      byProfileId: {
        [profileId]: {
          storyPosts: {
            '1sg': { _id: '1sg', isWorking: true, stories: [] },
          },
        },
      },
      showStoryPreview: false,
    };

    const action = {
      type: actionTypes.STORY_GROUP_SHARE_NOW,
      storyGroupId: '1sg',
      storyGroup: {
        id: '1sg',
      },
      profileId,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
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
      editingPostId: '',
      emptySlotMode: false,
      emptySlotData: null,
    };
    const action = {
      type: actionTypes.OPEN_STORIES_COMPOSER,
      emptySlotMode: false,
      editMode: false,
      emptySlotData: null,
      profileId,
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
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

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
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

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
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

    expect(reducer(stateBefore, action))
      .toEqual(stateAfter);
  });
});
