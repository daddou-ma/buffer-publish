import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

const profilesData =
  typeof window !== 'undefined' &&
  typeof window.bufferData !== 'undefined' &&
  typeof window.bufferData.profiles !== 'undefined' &&
  window.bufferData.profiles;

export const actionTypes = keyWrapper('PROFILES', {
  FETCH_SINGLE_PROFILE: 0,
});

export default (state = profilesData || [], action) => {
  switch (action.type) {
    case `singleProfile_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      let profiles = state;
      if (profiles?.some(p => p.id === action.result.id)) {
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
