import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('CAMPAIGN_VIEW', {
  FETCH_CAMPAIGN: 0,
  OPEN_COMPOSER: 0,
  CLOSE_COMPOSER: 0,
  GO_TO_ANALYZE_REPORT: 0,
  POST_IMAGE_CLICKED: 0,
  POST_IMAGE_CLICKED_NEXT: 0,
  POST_IMAGE_CLICKED_PREV: 0,
  POST_IMAGE_CLOSED: 0,
});

export const initialState = {
  campaign: {},
  campaignPosts: [],
  isLoading: false,
  campaignId: null,
  showComposer: false,
  editMode: false,
  editingPostId: '',
};

const postReducer = ({ campaignPosts, action, newState }) => {
  return campaignPosts.map(campaign => {
    if (campaign.id === action.updateId) {
      const { content, ...rest } = campaign;
      return {
        ...rest,
        content: {
          ...content,
          ...newState,
        },
      };
    }
    return campaign;
  });
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `getCampaign_${dataFetchActionTypes.FETCH_START}`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `getCampaign_${dataFetchActionTypes.FETCH_FAIL}`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case `getCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { items, ...campaign } = action.result;
      return {
        ...state,
        campaign,
        campaignId: campaign.id,
        campaignPosts: items,
        isLoading: false,
      };
    }
    case actionTypes.OPEN_COMPOSER: {
      return {
        ...state,
        showComposer: true,
        editMode: action.editMode,
        editingPostId: action.updateId,
      };
    }
    case actionTypes.CLOSE_COMPOSER: {
      return {
        ...state,
        showComposer: false,
      };
    }
    case actionTypes.POST_IMAGE_CLICKED:
    case actionTypes.POST_IMAGE_CLOSED:
    case actionTypes.POST_IMAGE_CLICKED_NEXT:
    case actionTypes.POST_IMAGE_CLICKED_PREV: {
      let newState = {};
      switch (action.type) {
        case actionTypes.POST_IMAGE_CLICKED:
          newState = {
            isLightboxOpen: true,
            currentImage: 0,
          };
          break;
        case actionTypes.POST_IMAGE_CLOSED:
          newState = {
            isLightboxOpen: false,
          };
          break;
        case actionTypes.POST_IMAGE_CLICKED_NEXT:
          newState = {
            currentImage: action.post.currentImage + 1,
          };
          break;
        case actionTypes.POST_IMAGE_CLICKED_PREV:
          newState = {
            currentImage: action.post.currentImage - 1,
          };
          break;
        default:
      }

      return {
        ...state,
        campaignPosts: postReducer({
          campaignPosts: state.campaignPosts,
          action,
          newState,
        }),
      };
    }
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
  handleOpenComposer: campaignId => ({
    type: actionTypes.OPEN_COMPOSER,
    campaignId,
  }),
  handleCloseComposer: () => ({
    type: actionTypes.CLOSE_COMPOSER,
  }),
  fetchCampaign: ({ campaignId, past, fullItems }) => ({
    type: actionTypes.FETCH_CAMPAIGN,
    campaignId,
    past,
    fullItems,
  }),
  goToAnalyzeReport: campaign => ({
    type: actionTypes.GO_TO_ANALYZE_REPORT,
    campaign,
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
};
