import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

const userData =
  typeof window !== 'undefined' &&
  typeof window.bufferData !== 'undefined' &&
  typeof window.bufferData.user !== 'undefined' &&
  window.bufferData.user;

module.exports = (state = userData || {}, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return action.result;
    default:
      return state;
  }
};
