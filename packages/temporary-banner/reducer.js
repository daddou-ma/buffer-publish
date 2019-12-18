import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const initialState = {
  enabledApplicationModes: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `enabledApplicationModes_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        enabledApplicationModes: action.result.enabledApplicationModes,
      };
    default:
      return state;
  }
};
