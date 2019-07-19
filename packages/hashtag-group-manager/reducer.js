import keyWrapper from '@bufferapp/keywrapper';
import {
  actionTypes as dataFetchActionTypes,
  actions as dataFetchActions,
} from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('HASHTAG_GROUP_MANAGER', {
  CANCEL_HASHTAG_GROUP: 0,
  SAVE_HASHTAG_GROUP: 0,
});

export const initialState = {
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `hashtagGroups_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        groups: action.result,
      }
    default:
      return state;
  }
};


export const actions = {
  handleCancelHashtagGroupClick: () => ({
    type: actionTypes.CANCEL_HASHTAG_GROUP,
  }),
  handleSaveHashtagGroupClick: () => ({
    type: actionTypes.SAVE_HASHTAG_GROUP,
  }),
};
