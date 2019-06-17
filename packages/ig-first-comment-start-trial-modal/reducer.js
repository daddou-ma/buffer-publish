import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('IG_FIRST_COMMENT_START_PRO_TRIAL_MODAL', {
  START_PRO_TRIAL: 0,
});

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  handleStartProTrialClick: () => ({
    type: actionTypes.START_PRO_TRIAL,
  }),
};
