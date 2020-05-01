import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

const orgData =
  typeof window !== 'undefined' &&
  typeof window.bufferData !== 'undefined' &&
  typeof window.bufferData.organizations !== 'undefined' &&
  window.bufferData.organizations;

module.exports = (state = orgData || {}, action) => {
  switch (action.type) {
    case `organizations_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return [...action.result];
    default:
      return state;
  }
};
