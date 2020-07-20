import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = {};

const initialState = {
  loading: true,
  planName: 'free',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loading: false,
        planName: action.result.planBase,
        isFreeUser: action.result.isFreeUser,
        isProUser: action.result.isProUser,
        isBusinessUser: action.result.isBusinessUser,
      };
    default:
      return state;
  }
};

export const actions = {};
