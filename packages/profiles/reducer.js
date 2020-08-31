import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('PROFILES', {
  FETCH_SINGLE_PROFILE: 0,
});

export default (state = [], action) => {
  switch (action.type) {
    case `singleProfile_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      let profiles = state;
      if (
        Array.isArray(profiles) &&
        profiles.some(p => p.id === action.result.id)
      ) {
        profiles = profiles.map(profile => {
          if (profile.id === action.result.id) {
            return action.result;
          }
          return profile;
        });
      } else {
        profiles = [...profiles, action.result];
      }
      return [...profiles];
    }
    default:
      return state;
  }
};

export const actions = {
  fetchSingleProfile: ({ profileId, message }) => ({
    type: actionTypes.FETCH_SINGLE_PROFILE,
    profileId,
    message,
  }),
};
