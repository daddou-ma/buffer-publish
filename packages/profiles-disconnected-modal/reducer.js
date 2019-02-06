import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('DISCONNECTED_PROFILES_MODAL', {
  RECONNECT_PROFILE: 0,
});

export const initialState = {
  disconnectedProfiles: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        disconnectedProfiles: action.result.filter(
          profile => profile.isDisconnected,
        ),
      };
    }
    case actionTypes.RECONNECT_PROFILE:
      return state; // TODO: mark as loading in the state, middleware does redirect
    default:
      return state;
  }
};

export const actions = {
  reconnectProfile: (id, service) => ({ type: actionTypes.RECONNECT_PROFILE, id, service }),
};

export default reducer;
