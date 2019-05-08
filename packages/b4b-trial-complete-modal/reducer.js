import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('B4B_TRIAL_COMPLETE_MODAL', {
  CANCEL_TRIAL: 0,
});

export const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  cancelTrial: () => ({
    type: actionTypes.CANCEL_TRIAL,
  }),
};
