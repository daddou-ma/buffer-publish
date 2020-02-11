import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('CAMPAIGNS', {
  CREATE_CAMPAIGN: 0,
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
};
