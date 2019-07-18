import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('HASHTAG_GROUP_MANAGER', {
  CANCEL_HASHTAG_GROUP: 0,
  SAVE_HASHTAG_GROUP: 0,
});

export const initialState = {
};

export const actions = {
  handleCancelHashtagGroupClick: () => ({
    type: actionTypes.CANCEL_HASHTAG_GROUP,
  }),
  handleSaveHashtagGroupClick: () => ({
    type: actionTypes.SAVE_HASHTAG_GROUP,
  }),
};
