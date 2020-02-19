import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue/reducer';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('CAMPAIGNS', {
  CREATE_CAMPAIGN: 0,
  DELETE_CAMPAIGN: 0,
  EDIT_CAMPAIGN: 0,
  HANDLE_CAMPAIGN_ROUTED: 0,
});

export const initialState = {
  isSaving: false,
  mainOrganization: {},
  campaignId: null,
  campaignPage: 'campaigns',
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
      const { campaignId, campaignPage = 'campaigns' } = action;
      return {
        ...state,
        campaignId,
        campaignPage,
      };
    }
    case `createCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        isSaving: false,
      };
    case `createCampaign_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isSaving: false,
      };
    case `getMainOrganization_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { mainOrganization = {}, isOrgAdmin } = action.result || {};

      return {
        ...state,
        mainOrganization,
      };
    }
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
  handleEditCampaignClick: campaignId => ({
    type: actionTypes.EDIT_CAMPAIGN,
    campaignId,
  }),
  handleCampaignRouteLoaded: ({ campaignId, campaignPage }) => ({
    type: actionTypes.HANDLE_CAMPAIGN_ROUTED,
    campaignId,
    campaignPage,
  }),
};
