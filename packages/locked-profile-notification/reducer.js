import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('LOCKED_PROFILES', {
  UPGRADE: 0,
});

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  upgrade: plan => ({
    type: actionTypes.UPGRADE,
    plan,
  }),
};
