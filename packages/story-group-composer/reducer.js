import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  SAVE_STORY_NOTE: 0,
});

export const initialState = {
  draft: {},
};

const updateStoryNote = ({ stories = [], storyId, note }) => (
  stories.map(story => (story.id === storyId ? { ...story, note } : story))
);

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      return {
        ...state,
        draft: { ...state.draft, timestamp: action.timestamp },
      };
    }
    case actionTypes.SAVE_STORY_NOTE: {
      const { storyId, note } = action;
      const { stories } = state.draft;
      return {
        ...state,
        draft: { ...state.draft, stories: updateStoryNote({ stories, storyId, note }) },
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
  handleSaveStoryNote: ({ storyId, note }) => ({
    type: actionTypes.SAVE_STORY_NOTE,
    storyId,
    note,
  }),
};
