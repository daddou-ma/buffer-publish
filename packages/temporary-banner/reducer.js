import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

import keyWrapper from '@bufferapp/keywrapper';

export const initialState = {
  enabledApplicationModes: [],
  remindersStatusByProfile: [],
};

export const actionTypes = keyWrapper('TEMPORARY_BANNER', {});

export default (state = initialState, action) => {
  switch (action.type) {
    case `enabledApplicationModes_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        enabledApplicationModes: action.result.enabledApplicationModes,
      };
    case `checkRemindersStatus_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        remindersStatusByProfile: action.result && action.result.profiles,
      };

    default:
      return state;
  }
};

export const actions = {};
