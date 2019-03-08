import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as draftActionTypes } from '@bufferapp/publish-drafts';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('QUEUE', {
  POST_CREATED: 0,
  POST_UPDATED: 0,
  POST_DELETED: 0,
  POST_SENT: 0,
  POST_CLICKED_DELETE: 0,
  POST_CONFIRMED_DELETE: 0,
  POST_CANCELED_DELETE: 0,
  POST_ERROR: 0,
  POST_SHARE_NOW: 0,
  POST_IMAGE_CLICKED: 0,
  POST_IMAGE_CLICKED_NEXT: 0,
  POST_IMAGE_CLICKED_PREV: 0,
  POST_IMAGE_CLOSED: 0,
  OPEN_COMPOSER: 0,
  HIDE_COMPOSER: 0,
  POST_COUNT_UPDATED: 0,
  POST_DROPPED: 0,
  REORDERED_UPDATES: 0,
  POST_REQUEUE: 0,
  OPEN_IG_MODAL: 0,
  HIDE_IG_MODAL: 0,
});

export const initialState = {
  byProfileId: {},
  showComposer: false,
  enabledApplicationModes: [],
  environment: 'production',
  editMode: false,
  editingPostId: '',
  showInstagramModal: false,
  isBusinessOnInstagram: null,
  isInstagramLoading: false,
};

const profileInitialState = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  posts: {},
  total: 0,
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
  if (action.draft) { return action.draft.id; }
};

/**
 * movePostInArray()
 *
 * Return a new array with the item at index `from` moved to index `to`.
 *
 * @param  {Array}  arr
 * @param  {Number} from
 * @param  {Number} to
 * @return {Array}
 */
const movePostInArray = (arr, from, to) => {
  const clone = [...arr];

  // Support passing `from` and `to` in non-sequential order (e.g., 4 and 1).
  const fromIndex = from < to ? from : to;
  const toIndex = to > from ? to : from;

  // Generate the new array
  Array.prototype.splice.call(clone, toIndex, 0,
    Array.prototype.splice.call(clone, fromIndex, 1)[0],
  );
  return clone;
};

/**
 * handlePostDropped()
 *
 * This function takes an object contaning posts keyed by ID and a `POST_DROPPED`
 * action and returns the re-ordered posts map object based on that action.
 * (This action is dispatched during a drag operation when a post hovers
 * over another post in the queue. See `PostDragLayer/index.jsx`)
 *
 * Since posts are stored in a `key: value` map we can't just reorder them like
 * an array. Instead we're just shuffling values around. This means that as you
 * drag a post it's `due_at` (and other related data in the object) is 'fixed'.
 * The result is that when we render posts ordered by their `due_at` time in the
 * queue the new order reflected.
 *
 * We also fix in place `pinned` and `scheduled_at` posts since they shouldn't
 * be able to move.
 *
 * Finally, it should be noted that this is an optimistic front-end update. The
 * actual changing of due_at times will happen on the back-end when a drop is
 * completed, at which point the below `handlePostsReordered()` method will be
 * triggered via Pusher on this and all other clients.
 *
 * @param  {Object} posts   key: value map of posts
 * @param  {Object} action  action dispatched from the drag operation
 * @return {Object}         new posts map
 */
const handlePostDropped = (posts, action) => {
  const orderedPosts = Object.values(posts).sort((a, b) => a.due_at - b.due_at);

  // For keyboard moves we should skip fixed posts manually
  const { keyboardDirection, dragIndex } = action;
  let { hoverIndex } = action;

  if (keyboardDirection) {
    let moveToPost = orderedPosts[hoverIndex];

    while (moveToPost && moveToPost.isFixed) {
      if (keyboardDirection === 'down') {
        hoverIndex += 1;
      }
      if (keyboardDirection === 'up') {
        hoverIndex -= 1;
      }
      moveToPost = orderedPosts[hoverIndex];
    }
    // If we get to the end and can't find a slot
    // then just stay where we are
    if (!moveToPost) {
      hoverIndex = dragIndex;
    }
  }

  // Save values that should be fixed
  const fixedValues = orderedPosts.map(p => ({
    due_at: p.due_at,
    postAction: p.postDetails.postAction,
    day: p.day,
  }));

  // Store the original indexes of fixed posts (pinned, scheduled, error'd, etc.)
  const fixedPosts = orderedPosts.reduce((acc, post, idx) => {
    if (post.isFixed) {
      acc.set(post.id, { originalIndex: idx });
    }
    return acc;
  }, new Map());

  // Move the post that is being dragged
  const afterMovePosts = movePostInArray(
    orderedPosts,
    dragIndex,
    hoverIndex,
  );

  // Put the pinned/scheduled posts back where they should be
  const moveFixedPosts = afterMovePosts.reduce((acc, post, index) => {
    const fixedPost = fixedPosts.get(post.id);
    if (fixedPost && index !== fixedPost.originalIndex) {
      return movePostInArray(acc, index, fixedPost.originalIndex);
    }
    return acc;
  }, afterMovePosts);

  // Finally, apply the fixed values we saved
  const finalPosts = moveFixedPosts.map((p, idx) => {
    p.day = fixedValues[idx].day;
    p.postDetails.postAction = fixedValues[idx].postAction;
    p.due_at = fixedValues[idx].due_at;
    return p;
  });

  // Return a new post map
  const newPostsMap = finalPosts.reduce((map, post) => { map[post.id] = post; return map; }, {});

  return newPostsMap;
};
const handleInstagramLoading = (action) => {
  if (action.args.recheck && action.result.is_business) {
    return true;
  }
  return false;
};

/**
 * handlePostsReordered()
 *
 * This method is similar to the above, but instead of responding live to drag/hover events
 * it is responsible for handling the Pusher event we dispatch when a drop operation completes.
 * This allows us to keep other clients up-to-date with drag and drop changes.
 *
 * The Pusher event originates from buffer-web and contains an array `order` with the new order
 * of posts (their IDs).
 *
 * @param  {Object} posts         Current post map
 * @param  {Array}  action.order  The new order of posts (IDs)
 * @return {Object}               New post map
 */
const handlePostsReordered = (posts, { order: newOrder }) => {
  const orderedPosts = Object.values(posts).sort((a, b) => a.due_at - b.due_at);

  // Save values that should be fixed
  const fixedValues = orderedPosts.map(p => ({
    due_at: p.due_at,
    postAction: p.postDetails.postAction,
    day: p.day,
  }));

  // Move the posts into their correct positions
  const reorderedPosts = newOrder.map(postId => posts[postId]);

  // Finally, apply the fixed values we saved
  const finalPosts = reorderedPosts.map((p, idx) => {
    p.day = fixedValues[idx].day;
    p.postDetails.postAction = fixedValues[idx].postAction;
    p.due_at = fixedValues[idx].due_at;
    return p;
  });

  // Return a new post map
  const newPostsMap = finalPosts.reduce((map, post) => {
    map[post.id] = post; return map;
  }, {});

  return newPostsMap;
};

/**
 * Reducers
 */

const postReducer = (state, action) => {
  switch (action.type) {
    case draftActionTypes.DRAFT_APPROVED:
      return action.draft;
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
      return action.post;
    case actionTypes.POST_ERROR:
      return state;
    case actionTypes.POST_CLICKED_DELETE:
      return { ...state, isConfirmingDelete: true };
    case actionTypes.POST_CONFIRMED_DELETE:
      return {
        ...state,
        isConfirmingDelete: false,
        isDeleting: true,
      };
    case actionTypes.POST_SHARE_NOW:
      return {
        ...state,
        isWorking: true,
      };
    case actionTypes.POST_CANCELED_DELETE:
      return {
        ...state,
        isConfirmingDelete: false,
      };
    case actionTypes.POST_IMAGE_CLICKED:
      return {
        ...state,
        isLightboxOpen: true,
        currentImage: 0,
      };
    case actionTypes.POST_IMAGE_CLOSED:
      return {
        ...state,
        isLightboxOpen: false,
      };
    case actionTypes.POST_IMAGE_CLICKED_NEXT:
      return {
        ...state,
        currentImage: state.currentImage + 1,
      };
    case actionTypes.POST_IMAGE_CLICKED_PREV:
      return {
        ...state,
        currentImage: state.currentImage - 1,
      };
    case `sharePostNow_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isWorking: false,
      };
    default:
      return state;
  }
};

const postsReducer = (state = {}, action) => {
  switch (action.type) {
    case `queuedPosts_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { updates } = action.result;
      if (action.args.isFetchingMore) {
        return { ...state, ...updates };
      }
      return updates;
    }
    case actionTypes.POST_DELETED:
    case actionTypes.POST_SENT: {
      const { [getPostUpdateId(action)]: deleted, ...currentState } = state;
      return currentState;
    }
    case draftActionTypes.DRAFT_APPROVED:
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
    case actionTypes.POST_CLICKED_DELETE:
    case actionTypes.POST_CONFIRMED_DELETE:
    case actionTypes.POST_CANCELED_DELETE:
    case actionTypes.POST_SHARE_NOW:
    case actionTypes.POST_IMAGE_CLICKED:
    case actionTypes.POST_IMAGE_CLOSED:
    case actionTypes.POST_IMAGE_CLICKED_NEXT:
    case actionTypes.POST_IMAGE_CLICKED_PREV:
    case actionTypes.POST_ERROR:
    case `sharePostNow_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        [getPostUpdateId(action)]: postReducer(state[getPostUpdateId(action)], action),
      };
    default:
      return state;
  }
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case `queuedPosts_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: !action.args.isFetchingMore && !action.args.isReordering,
        loadingMore: action.args.isFetchingMore,
      };
    case `queuedPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        moreToLoad: determineIfMoreToLoad(action, state.posts),
        page: state.page + 1,
        posts: postsReducer(state.posts, action),
        total: action.result.total,
      };
    case `queuedPosts_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.POST_COUNT_UPDATED:
      return {
        ...state,
        total: action.counts.pending,
      };
    case actionTypes.REORDERED_UPDATES: {
      return {
        ...state,
        posts: handlePostsReordered(state.posts, action),
      };
    }
    case actionTypes.POST_DROPPED: {
      // We don't handle the final step of saving to the DB
      // (that's done in the middleware when the drop completes)
      // we just move the posts in the front-end while the user
      // drags and hovers.
      if (!action.commit) {
        return {
          ...state,
          posts: handlePostDropped(state.posts, action),
        };
      }
      return state;
    }
    case `sharePostNow_${dataFetchActionTypes.FETCH_FAIL}`:
    case actionTypes.POST_ERROR:
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
    case actionTypes.POST_CLICKED_DELETE:
    case actionTypes.POST_CONFIRMED_DELETE:
    case actionTypes.POST_DELETED:
    case actionTypes.POST_CANCELED_DELETE:
    case actionTypes.POST_IMAGE_CLICKED:
    case actionTypes.POST_IMAGE_CLOSED:
    case actionTypes.POST_IMAGE_CLICKED_NEXT:
    case actionTypes.POST_IMAGE_CLICKED_PREV:
    case actionTypes.POST_SHARE_NOW:
    case actionTypes.POST_SENT:
    case draftActionTypes.DRAFT_APPROVED:
      return {
        ...state,
        posts: postsReducer(state.posts, action),
      };
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case actionTypes.REORDERED_UPDATES:
    case actionTypes.POST_DROPPED:
    case `sharePostNow_${dataFetchActionTypes.FETCH_FAIL}`:
    case profileSidebarActionTypes.SELECT_PROFILE:
    case `queuedPosts_${dataFetchActionTypes.FETCH_START}`:
    case `queuedPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `queuedPosts_${dataFetchActionTypes.FETCH_FAIL}`:
    case actionTypes.POST_CREATED:
    case actionTypes.POST_UPDATED:
    case actionTypes.POST_CLICKED_DELETE:
    case actionTypes.POST_CONFIRMED_DELETE:
    case actionTypes.POST_DELETED:
    case actionTypes.POST_CANCELED_DELETE:
    case actionTypes.POST_ERROR:
    case actionTypes.POST_IMAGE_CLICKED:
    case actionTypes.POST_IMAGE_CLOSED:
    case actionTypes.POST_IMAGE_CLICKED_NEXT:
    case actionTypes.POST_IMAGE_CLICKED_PREV:
    case actionTypes.POST_SHARE_NOW:
    case actionTypes.POST_SENT:
    case actionTypes.POST_COUNT_UPDATED:
    case draftActionTypes.DRAFT_APPROVED: {
      profileId = getProfileId(action);
      if (profileId) {
        return {
          ...state,
          byProfileId: {
            ...state.byProfileId,
            [profileId]: profileReducer(state.byProfileId[profileId], action),
          },
        };
      }
      return state;
    }
    case `enabledApplicationModes_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        enabledApplicationModes: action.result.enabledApplicationModes,
      };
    case `checkInstagramBusiness_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        isInstagramLoading: true,
      };
    case `checkInstagramBusiness_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        isBusinessOnInstagram: action.result.is_business,
        isInstagramLoading: handleInstagramLoading(action),
      };
    case `checkInstagramBusiness_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isBusinessOnInstagram: false,
        isInstagramLoading: false,
      };

    case actionTypes.OPEN_COMPOSER:
      return {
        ...state,
        showComposer: true,
        editMode: action.editMode,
        editingPostId: action.updateId,
      };
    case actionTypes.HIDE_COMPOSER:
      return {
        ...state,
        showComposer: false,
        editMode: false,
      };
    case actionTypes.OPEN_IG_MODAL:
      return {
        ...state,
        showInstagramModal: true,
      };
    case actionTypes.HIDE_IG_MODAL:
      return {
        ...state,
        showInstagramModal: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleEditClick: ({ post, profileId }) => ({
    type: actionTypes.OPEN_COMPOSER,
    updateId: post.id,
    editMode: true,
    post,
    profileId,
  }),
  handleDeleteClick: ({ post, profileId }) => ({
    type: actionTypes.POST_CLICKED_DELETE,
    updateId: post.id,
    post,
    profileId,
  }),
  handleDeleteConfirmClick: ({ post, profileId }) => ({
    type: actionTypes.POST_CONFIRMED_DELETE,
    updateId: post.id,
    post,
    profileId,
  }),
  handleCancelConfirmClick: ({ post, profileId }) => ({
    type: actionTypes.POST_CANCELED_DELETE,
    updateId: post.id,
    post,
    profileId,
  }),
  handleShareNowClick: ({ post, profileId }) => ({
    type: actionTypes.POST_SHARE_NOW,
    updateId: post.id,
    post,
    profileId,
  }),
  handleImageClick: ({ post, profileId }) => ({
    type: actionTypes.POST_IMAGE_CLICKED,
    updateId: post.id,
    post,
    profileId,
  }),
  handleImageClickNext: ({ post, profileId }) => ({
    type: actionTypes.POST_IMAGE_CLICKED_NEXT,
    updateId: post.id,
    post,
    profileId,
  }),
  handleImageClickPrev: ({ post, profileId }) => ({
    type: actionTypes.POST_IMAGE_CLICKED_PREV,
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
  handleRequeue: ({ post, profileId }) => ({
    type: actionTypes.POST_REQUEUE,
    updateId: post.id,
    post,
    profileId,
  }),
  handleComposerPlaceholderClick: () => ({
    type: actionTypes.OPEN_COMPOSER,
  }),
  // TODO: rename to more representative name
  handleComposerCreateSuccess: () => ({
    type: actionTypes.HIDE_COMPOSER,
  }),
  postCountUpdated: (profileId, counts) => ({
    type: actionTypes.POST_COUNT_UPDATED,
    profileId,
    counts,
  }),
  onDropPost: ({ dragIndex, hoverIndex, commit, keyboardDirection, profileId }) => ({
    type: actionTypes.POST_DROPPED,
    dragIndex,
    hoverIndex,
    commit,
    keyboardDirection,
    profileId,
  }),
  handleOpenInstagramModal: ({ profileId }) => ({
    type: actionTypes.OPEN_IG_MODAL,
    profileId,
  }),
  handleHideInstagramModal: () => ({
    type: actionTypes.HIDE_IG_MODAL,
  }),
};
