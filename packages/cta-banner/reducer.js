import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('CTA_BANNER', {
  MANAGE_BILLING: 0,
  ADD_BILLING: 0,
});

export const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  handleManageBillingClick: () => ({
    type: actionTypes.MANAGE_BILLING,
  }),
  handleAddBillingClick: () => ({
    type: actionTypes.ADD_BILLING,
  }),
};
