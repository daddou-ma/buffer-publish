import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue/reducer';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { campaignPages } from '@bufferapp/publish-routes';

export const actionTypes = keyWrapper('CAMPAIGNS', {
  CREATE_CAMPAIGN: 0,
  DELETE_CAMPAIGN: 0,
  EDIT_CAMPAIGN: 0,
  HANDLE_CAMPAIGN_ROUTED: 0,
  FETCH_CAMPAIGN: 0,
});

export const initialState = {
  campaigns: [],
  currentCampaign: {},
  isSaving: false,
  campaignId: null,
  selectedPage: 'campaigns',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CAMPAIGN: {
      return {
        ...state,
        isSaving: true,
      };
    }
    case actionTypes.HANDLE_CAMPAIGN_ROUTED: {
      const {
        campaignId,
        selectedPage = campaignPages.VIEW_ALL_CAMPAIGNS,
      } = action;
      return {
        ...state,
        campaignId,
        selectedPage,
      };
    }
    case `createCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `getCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { campaigns } = state;

      const newCampaigns = campaigns.some(
        campaign => campaign.id === action.result.id
      )
        ? campaigns.map(campaign => {
            if (campaign.id === action.result.id) {
              return action.result;
            }
            return campaign;
          })
        : [...campaigns, action.result];

      return {
        ...state,
        campaigns: newCampaigns,
        currentCampaign: action.result,
        campaignId: action.result.id,
        isSaving: false,
      };
    }

    case `createCampaign_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isSaving: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleCreateCampaignClick: ({ name, color }) => ({
    type: actionTypes.CREATE_CAMPAIGN,
    name,
    color,
  }),
  handleOpenComposer: campaignId => ({
    type: queueActionTypes.OPEN_COMPOSER,
    campaignId,
  }),
  handleDeleteCampaignClick: campaignId => ({
    type: actionTypes.DELETE_CAMPAIGN,
    campaignId,
  }),
  handleEditCampaignClick: ({
    id,
    name,
    color,
    previousName,
    previousColor,
    orgId,
  }) => ({
    type: actionTypes.EDIT_CAMPAIGN,
    id,
    name,
    color,
    previousName,
    previousColor,
    orgId,
  }),
  handleCampaignRouteLoaded: ({ campaignId, selectedPage }) => ({
    type: actionTypes.HANDLE_CAMPAIGN_ROUTED,
    campaignId,
    selectedPage,
  }),
  fetchCampaign: campaignId => ({
    type: actionTypes.FETCH_CAMPAIGN,
    campaignId,
  }),
};
