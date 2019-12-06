import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('STORIES', {
  OPEN_STORIES_COMPOSER: 0,
  HIDE_STORIES_COMPOSER: 0,
  DELETE_STORY_GROUP: 0,
  OPEN_PREVIEW: 0,
  STORY_GROUP_SHARE_NOW: 0,
  CLOSE_PREVIEW: 0,
  STORY_SENT: 0,
  STORY_CREATED: 0,
  STORY_DELETED: 0,
  STORY_UPDATED: 0,
});

export const initialState = {
  byProfileId: {},
  environment: 'production',
  showStoriesComposer: false,
  editMode: false,
  emptySlotMode: false,
  emptySlotData: null,
  editingPostId: '',
  showStoryPreview: false,
};

export const profileInitialState = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  storyPosts: {},
  total: 0,
};

const getProfileId = action => {
  if (action.profileId) {
    return action.profileId;
  }
  if (action.args) {
    return action.args.profileId;
  }
  if (action.profile) {
    return action.profile.id;
  }
};

const getStoryGroupId = action => {
  if (action.post) {
    return action.post.id;
  }
  if (action.storyGroupId) {
    return action.storyGroupId;
  }
  if (action.storyGroup) {
    return action.storyGroup.id;
  }
  if (action.args) {
    return action.args.updateId;
  }
};

const determineIfMoreToLoad = (action, currentPosts) => {
  const currentPostCount = Object.keys(currentPosts).length;
  const resultUpdatesCount = Object.keys(action.result.updates).length;
  return action.result.total > currentPostCount + resultUpdatesCount;
};

const storyPostReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.POST_CREATED:
      return action.storyGroup;
    case actionTypes.DELETE_STORY_GROUP:
      return {
        ...state,
        isDeleting: true,
      };
    case `deleteStoryGroup_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isDeleting: false,
      };
    case actionTypes.STORY_GROUP_SHARE_NOW:
      return {
        ...state,
        isWorking: true,
      };
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isWorking: false,
      };
    default:
      return state;
  }
};

const storyPostsReducer = (state = {}, action) => {
  switch (action.type) {
    case `getStoryGroups_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { updates } = action.result;
      if (action.args.isFetchingMore) {
        return { ...state, ...updates };
      }
      return updates;
    }
    case actionTypes.STORY_DELETED:
    case actionTypes.STORY_SENT:
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { [getStoryGroupId(action)]: deleted, ...currentState } = state;
      return currentState;
    }
    case actionTypes.STORY_GROUP_SHARE_NOW:
    case actionTypes.DELETE_STORY_GROUP:
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        [getStoryGroupId(action)]: storyPostReducer(
          state[getStoryGroupId(action)],
          action
        ),
      };
    case actionTypes.STORY_CREATED:
    case actionTypes.STORY_UPDATED: {
      const { storyGroup } = action;
      return { ...state, [storyGroup.id]: storyGroup };
    }
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { storyGroup } = action.result;
      return { ...state, [storyGroup.id]: storyGroup };
    }
    default:
      return state;
  }
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case `getStoryGroups_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore && !action.args.hideLoading,
        loadingMore: action.args.isFetchingMore,
      };
    case `getStoryGroups_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        moreToLoad: determineIfMoreToLoad(action, state.storyPosts),
        page: state.page + 1,
        storyPosts: storyPostsReducer(state.storyPosts, action),
        total: action.result.total,
      };
    case actionTypes.STORY_GROUP_SHARE_NOW:
    case actionTypes.DELETE_STORY_GROUP:
    case actionTypes.STORY_SENT:
    case actionTypes.STORY_CREATED:
    case actionTypes.STORY_DELETED:
    case actionTypes.STORY_UPDATED:
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_FAIL}`:
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        storyPosts: storyPostsReducer(state.storyPosts, action),
      };
    case `getStoryGroups_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case profileSidebarActionTypes.SELECT_PROFILE:
      return profileInitialState;
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
    case actionTypes.STORY_GROUP_SHARE_NOW:
    case actionTypes.DELETE_STORY_GROUP:
    case actionTypes.STORY_SENT:
    case actionTypes.STORY_CREATED:
    case actionTypes.STORY_DELETED:
    case actionTypes.STORY_UPDATED:
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `shareStoryGroupNow_${dataFetchActionTypes.FETCH_FAIL}`:
    case `getStoryGroups_${dataFetchActionTypes.FETCH_START}`:
    case `getStoryGroups_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `getStoryGroups_${dataFetchActionTypes.FETCH_FAIL}`:
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
      profileId = getProfileId(action);
      if (profileId) {
        return {
          byProfileId: {
            ...state.byProfileId,
            [profileId]: profileReducer(state.byProfileId[profileId], action),
          },
          showStoryPreview: state.showStoryPreview,
        };
      }
      return state;
    case actionTypes.OPEN_STORIES_COMPOSER:
      return {
        ...state,
        showStoriesComposer: true,
        editMode: action.editMode,
        editingPostId: action.updateId || '',
        emptySlotMode: action.emptySlotMode,
        emptySlotData: action.emptySlotData,
      };
    case actionTypes.HIDE_STORIES_COMPOSER:
      return {
        ...state,
        showStoriesComposer: false,
        editMode: false,
        emptySlotMode: false,
        emptySlotData: null,
      };
    case actionTypes.OPEN_PREVIEW:
      return {
        ...state,
        showStoryPreview: true,
      };
    case actionTypes.CLOSE_PREVIEW:
      return {
        ...state,
        showStoryPreview: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleEmptySlotClick: ({ profileId, emptySlotData }) => ({
    type: actionTypes.OPEN_STORIES_COMPOSER,
    emptySlotMode: true,
    editMode: false,
    emptySlotData,
    profileId,
  }),
  handleEditStoryGroupClick: ({ storyGroup, profileId }) => ({
    type: actionTypes.OPEN_STORIES_COMPOSER,
    updateId: storyGroup.id,
    editMode: true,
    storyGroup,
    profileId,
  }),
  handleComposerPlaceholderClick: () => ({
    type: actionTypes.OPEN_STORIES_COMPOSER,
    editMode: false,
  }),
  handleCloseStoriesComposer: () => ({
    type: actionTypes.HIDE_STORIES_COMPOSER,
  }),
  handlePreviewClick: () => ({
    type: actionTypes.OPEN_PREVIEW,
  }),
  handleClosePreviewClick: () => ({
    type: actionTypes.CLOSE_PREVIEW,
  }),
  handleDeleteStoryGroup: ({ storyGroup, profileId }) => ({
    type: actionTypes.DELETE_STORY_GROUP,
    storyGroup: storyGroup.post,
    profileId,
  }),
  handleShareNowClick: ({ storyGroup, profileId }) => ({
    type: actionTypes.STORY_GROUP_SHARE_NOW,
    storyGroupId: storyGroup.id,
    storyGroup,
    profileId,
  }),
};
