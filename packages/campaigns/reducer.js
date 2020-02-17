import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue/reducer';

export const actionTypes = keyWrapper('CAMPAIGNS', {
  CREATE_CAMPAIGN: 0,
  DELETE_CAMPAIGN: 0,
  EDIT_CAMPAIGN: 0,
  HANDLE_CAMPAIGN_ROUTED: 0,
});

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
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
  handleCampaignRouteLoaded: ({ campaignId }) => ({
    type: actionTypes.HANDLE_CAMPAIGN_ROUTED,
    campaignId,
  }),
};
