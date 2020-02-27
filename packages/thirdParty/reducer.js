import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('thirdparty', {
  FULLSTORY: 0,
  APPCUES: 0,
  APPCUES_LOADED: 0,
  APPCUES_STARTED: 0,
  APPCUES_FINISHED: 0,
  INTERCOM_LOADED: 0,
  ITERATE: 0,
});

const initialState = {
  appCues: { loaded: false, inProgress: false },
  intercom: { loaded: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPCUES_LOADED:
      return {
        ...state,
        appCues: { loaded: action.loaded, finished: false },
      };

    case actionTypes.APPCUES_STARTED:
      return {
        ...state,
        appCues: {
          ...state.appCues,
          inProgress: true,
        },
      };

    case actionTypes.APPCUES_FINISHED:
      return {
        ...state,
        appCues: {
          ...state.appCues,
          inProgress: false,
        },
      };

    case `intercom_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        intercom: {
          ...state.intercom,
          ...action.result,
        },
      };
    case actionTypes.INTERCOM_LOADED:
      return {
        ...state,
        intercom: {
          ...state.intercom,
          loaded: action.loaded,
        },
      };
    default:
      return state;
  }
};

export const actions = {};
