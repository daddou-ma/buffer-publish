import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('STORIES', {
  OPEN_STORIES_COMPOSER: 0,
});

export const initialState = {
  byProfileId: {},
  environment: 'production',
  showStoriesComposer: false,
  editMode: false,
  emptySlotMode: false,
  editingPostId: '',
};

export const profileInitialState = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  posts: {},
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

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case `storiesPosts_${dataFetchActionTypes.FETCH_SUCCESS}`: {
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
    case `storiesPosts_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore && !action.args.hideLoading,
        loadingMore: action.args.isFetchingMore,
      };
    case `storiesPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        moreToLoad: determineIfMoreToLoad(action, state.posts),
        page: state.page + 1,
        posts: postsReducer(state.posts, action),
        total: action.result.total,
      };
    case `storiesPosts_${dataFetchActionTypes.FETCH_FAIL}`:
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
    case `storiesPosts_${dataFetchActionTypes.FETCH_START}`:
    case `storiesPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `storiesPosts_${dataFetchActionTypes.FETCH_FAIL}`:
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
  handleComposerPlaceholderClick: () => ({
    type: actionTypes.OPEN_STORIES_COMPOSER,
  }),
};
