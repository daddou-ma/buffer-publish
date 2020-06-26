import keyWrapper from '@bufferapp/keywrapper';

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
