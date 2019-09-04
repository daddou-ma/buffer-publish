import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  UPDATE_STORY_GROUP: 0,
  DELETE_STORY_GROUP: 0,
});

export const initialState = {
  draft: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      return {
        ...state,
        draft: { ...state.draft, scheduledAt: action.scheduledAt },
      };
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      return {
        ...state,
        draft: {
          ...state.draft,
          scheduledAt: action.scheduledAt,
          stories: action.stories,
        },
      };
    }
    default:
      return state;
  }
};

export const actions = {
  handleSaveStoryGroup: scheduledAt => ({
    type: actionTypes.SAVE_STORY_GROUP,
    scheduledAt,
  }),
  handleUpdateStoryGroup: (storyGroupId, scheduledAt, stories) => ({
    type: actionTypes.UPDATE_STORY_GROUP,
    storyGroupId,
    scheduledAt,
    stories,
  }),
  handleDeleteStoryGroup: storyGroupId => ({
    type: actionTypes.DELETE_STORY_GROUP,
    storyGroupId,
  }),
};
