import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
});

export const initialState = {
  draft: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      return {
        ...state,
        draft: { ...state.draft, timestamp: action.timestamp },
      };
    }
    default:
      return state;
  }
};

export const actions = {
  handleSaveStoryGroup: timestamp => ({
    type: actionTypes.SAVE_STORY_GROUP,
    timestamp,
  }),
};
