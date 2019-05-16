import keyWrapper from '@bufferapp/keywrapper';

import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('CTA_BANNER', {
  MANAGE_BILLING: 0,
  ADD_BILLING: 0,
});

export const initialState = {
  profileCount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {...state, profileCount: action.result.profileCount};
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
