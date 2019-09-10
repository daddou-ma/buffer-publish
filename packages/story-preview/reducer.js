import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

export const actionTypes = keyWrapper('STORY_PREVIEW', {
});

export const initialState = {
  user: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE: {
      return {
        ...state,
        user: { avatarUrl: action.profile.avatarUrl, handle: action.profile.username },
      };
    }
    default:
      return state;
  }
};

export const actions = {
};
