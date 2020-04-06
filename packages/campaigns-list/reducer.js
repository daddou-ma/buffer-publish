import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { sortCampaignsByUpdatedAt } from '@bufferapp/publish-queue/reducer';

export const actionTypes = keyWrapper('CAMPAIGNS_LIST', {
  FETCH_CAMPAIGNS: 0,
  CAMPAIGN_CREATED: 0,
  CAMPAIGN_UPDATED: 0,
  CAMPAIGN_DELETED: 0,
});

export const initialState = {
  campaigns: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `getCampaignsList_${dataFetchActionTypes.FETCH_START}`: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case `getCampaignsList_${dataFetchActionTypes.FETCH_FAIL}`: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case `getCampaignsList_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        campaigns: action.result,
        isLoading: false,
      };
    }
    case actionTypes.CAMPAIGN_CREATED: {
      const { campaign } = action;
      const updatedCampaigns = [...state.campaigns, campaign];
      return {
        ...state,
        campaigns: sortCampaignsByUpdatedAt(updatedCampaigns),
      };
    }
    case actionTypes.CAMPAIGN_UPDATED: {
      const { campaign } = action;
      const index = state.campaigns.findIndex(i => i.id === campaign.id);
      const updatedCampaigns = state.campaigns.map((item, index2) =>
        index2 === index ? campaign : item
      );
      return {
        ...state,
        campaigns: sortCampaignsByUpdatedAt(updatedCampaigns),
      };
    }
    case actionTypes.CAMPAIGN_DELETED: {
      const { campaignId } = action;
      const index = state.campaigns.findIndex(i => i.id === campaignId);
      const updatedCampaigns = state.campaigns.filter(
        (_item, index2) => index2 !== index
      );
      return {
        ...state,
        campaigns: updatedCampaigns,
      };
    }

    default:
      return state;
  }
};

export const actions = {
  fetchCampaigns: () => ({
    type: actionTypes.FETCH_CAMPAIGNS,
  }),
};
