import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('PROFILES', {
  FETCH_SINGLE_PROFILE: 0,
});

export const actions = {
  fetchSingleProfile: ({ profileId, message }) => ({
    type: actionTypes.FETCH_SINGLE_PROFILE,
    profileId,
    message,
  }),
};
