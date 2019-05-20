import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('thirdparty', {
  FULLSTORY: 0,
  APPCUES: 0,
  APPCUES_LOADED: 0,
  INTERCOM_LOADED: 0,
  HELPSCOUT_BEACON: 0,
  HELPSCOUT_BEACON_LOADED: 0,
});

const initialState = {
  appCues: { loaded: false },
  intercom: { loaded: false },
  helpScoutBeacon: { loaded: false },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APPCUES_LOADED:
      return {
        ...state,
        appCues: { loaded: action.loaded },
      };

    case actionTypes.HELPSCOUT_BEACON_LOADED:
      return {
        ...state,
        helpScoutBeacon: { loaded: action.loaded },
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
