import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DRAFTS', {
  DRAFT_CREATED: 0,
  DRAFT_UPDATED: 0,
  DRAFT_MOVED: 0,
  DRAFT_DELETED: 0,
  DRAFT_APPROVED: 0,
  DRAFT_APPROVE: 0,
  DRAFT_NEEDS_APPROVAL: 0,
  DRAFT_CONFIRMED_DELETE: 0,
  OPEN_COMPOSER: 0,
  HIDE_COMPOSER: 0,
  DRAFT_IMAGE_CLICKED: 0,
  DRAFT_IMAGE_CLOSED: 0,
  DRAFT_IMAGE_CLICKED_NEXT: 0,
  DRAFT_IMAGE_CLICKED_PREV: 0,
});

export const initialState = {
  byProfileId: {},
  showComposer: false,
  enabledApplicationModes: [],
  environment: 'production',
  editMode: false,
  editingPostId: '',
  draftMode: true,
  canStartBusinessTrial: true,
};

const profileInitialState = {
  loading: true,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  drafts: {},
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

const getDraftUpdateId = action => {
  if (action.updateId) {
    return action.updateId;
  }
  if (action.args) {
    return action.args.updateId;
  }
  if (action.draft) {
    return action.draft.id;
  }
};

const determineIfMoreToLoad = (action, currentPosts) => {
  const currentPostCount = Object.keys(currentPosts).length;
  const resultUpdatesCount = Object.keys(action.result.drafts).length;
  return action.result.total > currentPostCount + resultUpdatesCount;
};

const draftReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.DRAFT_CREATED:
      return action.draft;
    case actionTypes.DRAFT_CONFIRMED_DELETE:
      return {
        ...state,
        isConfirmingDelete: false,
        isDeleting: true,
      };
    case actionTypes.DRAFT_APPROVE:
      return {
        ...state,
        isWorking: true,
      };
    case actionTypes.DRAFT_NEEDS_APPROVAL:
      return {
        ...state,
        isMoving: true,
      };
    case actionTypes.DRAFT_IMAGE_CLICKED:
      return {
        ...state,
        isLightboxOpen: true,
        currentImage: 0,
      };
    case actionTypes.DRAFT_IMAGE_CLOSED:
      return {
        ...state,
        isLightboxOpen: false,
      };
    case actionTypes.DRAFT_IMAGE_CLICKED_NEXT:
      return {
        ...state,
        currentImage: state.currentImage + 1,
      };
    case actionTypes.DRAFT_IMAGE_CLICKED_PREV:
      return {
        ...state,
        currentImage: state.currentImage - 1,
      };
    default:
      return state;
  }
};

const draftsReducer = (state = {}, action) => {
  switch (action.type) {
    case `draftPosts_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { drafts } = action.result;
      if (
        action.args.isFetchingMore ||
        Object.keys(state).length > Object.keys(drafts).length
      ) {
        return { ...state, ...drafts };
      }
      return drafts;
    }
    case actionTypes.DRAFT_DELETED: {
      const { [getDraftUpdateId(action)]: deleted, ...currentState } = state;
      return currentState;
    }
    case actionTypes.DRAFT_APPROVED: {
      const { [getDraftUpdateId(action)]: approved, ...newState } = state;
      return newState;
    }
    case actionTypes.DRAFT_UPDATED:
    case actionTypes.DRAFT_MOVED:
    case actionTypes.DRAFT_CREATED: {
      return { ...state, [getDraftUpdateId(action)]: action.draft };
    }
    case actionTypes.DRAFT_IMAGE_CLICKED:
    case actionTypes.DRAFT_IMAGE_CLOSED:
    case actionTypes.DRAFT_IMAGE_CLICKED_NEXT:
    case actionTypes.DRAFT_IMAGE_CLICKED_PREV:
    case actionTypes.DRAFT_CONFIRMED_DELETE:
    case actionTypes.DRAFT_APPROVE:
    case actionTypes.DRAFT_NEEDS_APPROVAL:
      return {
        ...state,
        [getDraftUpdateId(action)]: draftReducer(
          state[getDraftUpdateId(action)],
          action
        ),
      };
    default:
      return state;
  }
};

const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case `draftPosts_${dataFetchActionTypes.FETCH_START}`:
      if (action.args.clear) {
        return {
          loading: !action.args.isFetchingMore,
          loadingMore: action.args.isFetchingMore,
          moreToLoad: false,
          page: 1,
          drafts: {},
          total: 0,
        };
      }
      return {
        ...state,
        loading: !action.args.isFetchingMore,
        loadingMore: action.args.isFetchingMore,
      };
    case `draftPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        loadingMore: false,
        moreToLoad: determineIfMoreToLoad(action, state.drafts),
        page: state.page + 1,
        drafts: draftsReducer(state.drafts, action),
        total: action.result.total,
      };
    case `draftPosts_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.DRAFT_IMAGE_CLICKED:
    case actionTypes.DRAFT_IMAGE_CLOSED:
    case actionTypes.DRAFT_IMAGE_CLICKED_NEXT:
    case actionTypes.DRAFT_IMAGE_CLICKED_PREV:
    case actionTypes.DRAFT_CREATED:
    case actionTypes.DRAFT_UPDATED:
    case actionTypes.DRAFT_MOVED:
    case actionTypes.DRAFT_DELETED:
    case actionTypes.DRAFT_APPROVED:
    case actionTypes.DRAFT_CONFIRMED_DELETE:
    case actionTypes.DRAFT_APPROVE:
    case actionTypes.DRAFT_NEEDS_APPROVAL:
      return {
        ...state,
        drafts: draftsReducer(state.drafts, action),
      };
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        canStartBusinessTrial: action.result.canStartBusinessTrial,
      };
    }
    case actionTypes.DRAFT_IMAGE_CLICKED:
    case actionTypes.DRAFT_IMAGE_CLOSED:
    case actionTypes.DRAFT_IMAGE_CLICKED_NEXT:
    case actionTypes.DRAFT_IMAGE_CLICKED_PREV:
    case profileSidebarActionTypes.SELECT_PROFILE:
    case `draftPosts_${dataFetchActionTypes.FETCH_START}`:
    case `draftPosts_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `draftPosts_${dataFetchActionTypes.FETCH_FAIL}`:
    case actionTypes.DRAFT_CREATED:
    case actionTypes.DRAFT_UPDATED:
    case actionTypes.DRAFT_MOVED:
    case actionTypes.DRAFT_DELETED:
    case actionTypes.DRAFT_APPROVED:
    case actionTypes.DRAFT_CONFIRMED_DELETE:
    case actionTypes.DRAFT_APPROVE:
    case actionTypes.DRAFT_NEEDS_APPROVAL:
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
    default:
      return state;
  }
};

export const actions = {
  handleApproveClick: ({ draft }) => ({
    type: actionTypes.DRAFT_APPROVE,
    updateId: draft.id,
    draft,
  }),
  handleRequestApprovalClick: ({ draft, needsApproval }) => ({
    type: actionTypes.DRAFT_NEEDS_APPROVAL,
    updateId: draft.id,
    needsApproval,
    draft,
  }),
  // In the future open a datepicker instead of the composer.
  handleRescheduleClick: ({ draft, profileId }) => ({
    type: actionTypes.OPEN_COMPOSER,
    updateId: draft.id,
    editMode: true,
    draft,
    profileId,
  }),
  handleEditClick: ({ draft, profileId }) => ({
    type: actionTypes.OPEN_COMPOSER,
    updateId: draft.id,
    editMode: true,
    draft,
    profileId,
  }),
  handleDeleteConfirmClick: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_CONFIRMED_DELETE,
    updateId: draft.id,
    draft,
    profileId,
  }),
  handleComposerPlaceholderClick: () => ({
    type: actionTypes.OPEN_COMPOSER,
  }),
  // TODO: rename to more representative name
  handleComposerCreateSuccess: () => ({
    type: actionTypes.HIDE_COMPOSER,
  }),
  handleImageClick: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_IMAGE_CLICKED,
    updateId: draft.id,
    draft,
    profileId,
  }),
  handleImageClose: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_IMAGE_CLOSED,
    updateId: draft.id,
    draft,
    profileId,
  }),
  handleImageClickNext: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_IMAGE_CLICKED_NEXT,
    updateId: draft.id,
    draft,
    profileId,
  }),
  handleImageClickPrev: ({ draft, profileId }) => ({
    type: actionTypes.DRAFT_IMAGE_CLICKED_PREV,
    updateId: draft.id,
    draft,
    profileId,
  }),
};
