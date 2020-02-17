import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('CAMPAIGNS', {
  CREATE_CAMPAIGN: 0,
  HANDLE_CAMPAIGN_ROUTED: 0,
});

export const initialState = {
  isSaving: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CAMPAIGN: {
      return {
        ...state,
        isSaving: true,
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
  handleCampaignRouteLoaded: ({ campaignId }) => ({
    type: actionTypes.HANDLE_CAMPAIGN_ROUTED,
    campaignId,
  }),
};
