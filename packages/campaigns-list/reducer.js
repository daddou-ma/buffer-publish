import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as campaignActionTypes } from '@bufferapp/publish-campaign';
import { sortCampaignsByUpdatedAt } from '@bufferapp/publish-queue/reducer';
import { campaignParser } from '@bufferapp/publish-server/parsers/src';

export const actionTypes = keyWrapper('CAMPAIGNS_LIST', {
  FETCH_CAMPAIGNS: 0,
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
    case campaignActionTypes.CAMPAIGN_CREATED: {
      const parsedCampaign = campaignParser(action.campaign);
      const updatedCampaigns = [...state.campaigns, parsedCampaign];
      return {
        ...state,
        campaigns: sortCampaignsByUpdatedAt(updatedCampaigns),
      };
    }
    case campaignActionTypes.CAMPAIGN_UPDATED: {
      const parsedCampaign = campaignParser(action.campaign);
      const index = state.campaigns.findIndex(i => i.id === parsedCampaign.id);
      const updatedCampaigns = state.campaigns.map((item, index2) =>
        index2 === index ? parsedCampaign : item
      );
      return {
        ...state,
        campaigns: sortCampaignsByUpdatedAt(updatedCampaigns),
      };
    }
    case campaignActionTypes.CAMPAIGN_DELETED: {
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
