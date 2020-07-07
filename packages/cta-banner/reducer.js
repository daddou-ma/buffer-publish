import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('CTA_BANNER', {
  START_SUBSCRIPTION: 0,
});

export const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const actions = {
  handleStartSubscription: () => ({
    type: actionTypes.START_SUBSCRIPTION,
  }),
};
