import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('IG_DIRECT_POSTING_MODAL', {
  SET_DIRECT_POSTING: 0,
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  handleSetUpDirectPostingClick: action => ({
    type: actionTypes.SET_DIRECT_POSTING,
    profileId: action.profileId,
  }),
};
