import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

export default (state = {}, action) => {
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
