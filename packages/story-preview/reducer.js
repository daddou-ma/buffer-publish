import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_PREVIEW', {
  OPEN_PREVIEW: 0,
});

export const initialState = {
  user: {},
  stories: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE: {
      return {
        ...state,
        user: { avatarUrl: action.profile.avatarUrl, handle: action.profile.username },
      };
    }
    case `updateStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case actionTypes.OPEN_PREVIEW: {
      return {
        ...state,
        stories: action.stories,
      };
    }
    default:
      return state;
  }
};

export const actions = {
  handlePreviewClick: stories => ({
    type: actionTypes.OPEN_PREVIEW,
    stories,
  }),
};
