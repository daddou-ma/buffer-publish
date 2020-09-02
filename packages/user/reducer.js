import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

module.exports = (state = {}, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return { ...action.result, loaded: true };
    default:
      return state;
  }
};
