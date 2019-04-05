import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = {};

const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `clientAccess_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        ...action.result,
      };
    default:
      return state;
  }
};

export const actions = {};
