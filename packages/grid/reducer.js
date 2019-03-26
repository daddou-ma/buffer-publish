import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue';
import keyWrapper from '@bufferapp/keywrapper';
import {
  header,
} from './components/GridPosts/postData';

export const actionTypes = keyWrapper('GRID', {
  POST_IMAGE_CLICKED: 0,
  POST_IMAGE_CLOSED: 0,
});

export const initialState = {
  byProfileId: {},
  environment: 'production',
};

export const profileInitialState = {
  header,
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  servicePosts: [],
  pendingPosts: [],
  mergedPosts: [],
  total: 0,
};

const handlePosts = (action, currentPosts) => {
  let servicePosts = action.result.updates;
  if (action.args.isFetchingMore) {
    servicePosts = { ...currentPosts, ...servicePosts };
  }
  return servicePosts;
};

const mergePosts = (pendingPosts, servicePosts) => {
  return { ...servicePosts, ...pendingPosts };
};

const increasePageCount = (page) => {
  page += 1;
  return page;
};

const determineIfMoreToLoad = (action, currentPosts) => {
  const currentPostCount = Object.keys(currentPosts).length;
  const resultUpdatesCount = Object.keys(action.result.updates).length;
  return (action.result.total > (currentPostCount + resultUpdatesCount));
};

const getProfileId = (action) => {
  if (action.profileId) { return action.profileId; }
  if (action.args) { return action.args.profileId; }
  if (action.profile) { return action.profile.id; }
};

const getPostUpdateId = (action) => {
  if (action.updateId) { return action.updateId; }
  if (action.args) { return action.args.updateId; }
  if (action.post) { return action.post.id; }
};

const postReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.POST_IMAGE_CLICKED:
      return {
        ...state,
        isLightboxOpen: true,
      };
    case actionTypes.POST_IMAGE_CLOSED:
      return {
        ...state,
        isLightboxOpen: false,
      };
    default:
      return state;
  }
};

const postsReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.POST_IMAGE_CLICKED:
    case actionTypes.POST_IMAGE_CLOSED: {
      return {
        ...state,
        [getPostUpdateId(action)]: postReducer(state[getPostUpdateId(action)], action),
      };
    }
    default:
      return state;
  }
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
      return profileInitialState;
    case `pendingPosts_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore,
        loadingMore: action.args.isFetchingMore,
      };
    case `pendingPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      const pendingPosts = handlePosts(action, state.pendingPosts);
      const mergedPosts = mergePosts(pendingPosts, state.servicePosts);
      return {
        ...state,
        loading: false,
        loadingMore: false,
        pendingPosts,
        mergedPosts,
        // total: mergedPosts.length,
        // moreToLoad: determineIfMoreToLoad(action, state.servicePosts),
        // page: increasePageCount(state.page),
      };
    case `pendingPosts_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case `servicePosts_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore,
        loadingMore: action.args.isFetchingMore,
      };
    case `servicePosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        servicePosts: handlePosts(action, state.servicePosts),
      };
    case `servicePosts_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case queueActionTypes.POST_COUNT_UPDATED:
      return {
        ...state,
        total: action.counts.sent,
      };
    case actionTypes.POST_IMAGE_CLICKED:
    case actionTypes.POST_IMAGE_CLOSED:
      return {
        ...state,
        mergedPosts: postsReducer(state.mergedPosts, action),
      };
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
    case `pendingPosts_${dataFetchActionTypes.FETCH_START}`:
    case `pendingPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `pendingPosts_${dataFetchActionTypes.FETCH_FAIL}`:
    case `servicePosts_${dataFetchActionTypes.FETCH_START}`:
    case `servicePosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `servicePosts_${dataFetchActionTypes.FETCH_FAIL}`:
    case queueActionTypes.POST_COUNT_UPDATED:
    case actionTypes.POST_IMAGE_CLICKED:
    case actionTypes.POST_IMAGE_CLOSED:
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
    default:
      return state;
  }
};

export const actions = {
  handleImageClick: ({ post, profileId }) => ({
    type: actionTypes.POST_IMAGE_CLICKED,
    updateId: post.id,
    post,
    profileId,
  }),
  handleImageClose: ({ post, profileId }) => ({
    type: actionTypes.POST_IMAGE_CLOSED,
    updateId: post.id,
    post,
    profileId,
  }),
  handleChangePostUrl: ({ post, profileId }) => ({
    type: actionTypes.POST_IMAGE_CLOSED,
    updateId: post.id,
    post,
    profileId,
  }),
};
