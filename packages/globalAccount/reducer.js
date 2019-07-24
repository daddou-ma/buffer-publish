import { actionTypes as asyncDataFetchActionTypes } from '@bufferapp/async-data-fetch';

export default (state = {}, action) => {
  switch (action.type) {
    case `globalAccount_${asyncDataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...action.result,
      };
    default:
      return state;
  }
};
