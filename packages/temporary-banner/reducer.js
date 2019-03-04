import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('TEMPORARY_BANNER', {
  OPEN_LINK: 0,
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
  handleLinkClick: () => ({
    type: actionTypes.OPEN_LINK,
  }),
};
