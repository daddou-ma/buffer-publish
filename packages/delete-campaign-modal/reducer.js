import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as modalActionTypes } from '@bufferapp/publish-modals';

export const actionTypes = keyWrapper('DELETE_CAMPAIGN_MODAL', {
  DELETE_CAMPAIGN: 0,
});

export const initialState = {
  loading: false,
  campaign: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `deleteCampaign_${dataFetchActionTypes.FETCH_FAIL}`:
    case `deleteCampaign_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
      };
    case `deleteCampaign_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case modalActionTypes.SHOW_DELETE_CAMPAIGN_MODAL:
      return {
        ...state,
        campaign: action.campaign,
      };
    default:
      return state;
  }
};

export const actions = {
  deleteCampaign: () => ({
    type: actionTypes.DELETE_CAMPAIGN,
  }),
};
