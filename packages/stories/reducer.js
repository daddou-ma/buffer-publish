import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('STORIES', {
  OPEN_STORIES_COMPOSER: 0,
  HIDE_STORIES_COMPOSER: 0,
  DELETE_STORY_GROUP: 0,
  OPEN_PREVIEW: 0,
  CLOSE_PREVIEW: 0,
});

export const initialState = {
  byProfileId: {},
  environment: 'production',
  showStoriesComposer: false,
  editMode: false,
  emptySlotMode: false,
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

const getProfileId = (action) => {
  if (action.profileId) { return action.profileId; }
  if (action.args) { return action.args.profileId; }
  if (action.profile) { return action.profile.id; }
};

const determineIfMoreToLoad = (action, currentPosts) => {
  const currentPostCount = Object.keys(currentPosts).length;
  const resultUpdatesCount = Object.keys(action.result.updates).length;
  return (action.result.total > (currentPostCount + resultUpdatesCount));
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
    case `getStoryGroups_${dataFetchActionTypes.FETCH_START}`:
    case `getStoryGroups_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `getStoryGroups_${dataFetchActionTypes.FETCH_FAIL}`:
      profileId = getProfileId(action);
      if (profileId) {
        return {
          byProfileId: {
            ...state.byProfileId,
            [profileId]: profileReducer(state.byProfileId[profileId], action),
          },
        };
      }
      return state;
    case actionTypes.OPEN_STORIES_COMPOSER:
      return {
        ...state,
        showStoriesComposer: true,
        editMode: action.editMode,
        editingPostId: action.updateId,
        emptySlotMode: action.emptySlotMode,
        emptySlotData: action.emptySlotData,
      };
    case actionTypes.HIDE_STORIES_COMPOSER:
      return {
        ...state,
        showStoriesComposer: false,
        editMode: false,
        emptySlotMode: false,
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
    emptySlotData,
    profileId,
  }),
  handleEditStoryGroupClick: ({ draft, profileId }) => ({
    type: actionTypes.OPEN_STORIES_COMPOSER,
    updateId: draft.id,
    editMode: true,
    draft,
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
  handleDeleteStoryGroup: ({ storyGroup }) => ({
    type: actionTypes.DELETE_STORY_GROUP,
    storyGroup: storyGroup.post,
  }),
};
