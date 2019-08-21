import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = {};

const initialState = {
  loggedIn: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `login_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        loggedIn: true,
      };
    case `logout_${asyncDataFetchActionTypes.FETCH_START}`:
    case `login_${asyncDataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};

export const actions = {};
