import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('LOCKED_PROFILES', {
  UPGRADE: 0,
});

export const actions = {
  upgrade: plan => ({
    type: actionTypes.UPGRADE,
    plan,
  }),
};
