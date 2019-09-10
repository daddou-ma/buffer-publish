import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_PREVIEW', {
});

export const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        user: { avatarUrl: action.avatarUrl, handle: action.handle },
      };
    }
    default:
      return state;
  }
};

export const actions = {
};
