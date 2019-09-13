import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  SAVE_STORY_NOTE: 0,
  UPDATE_STORY_GROUP: 0,
  SET_SCHEDULE_LOADING: 0,
  SET_SHOW_DATE_PICKER: 0,
  DELETE_STORY: 0,
  SET_STORY_GROUP: 0,
});

export const initialState = {
  storyGroup: { stories: [] },
  isScheduleLoading: false,
  showDatePicker: false,
};

const updateStoryNote = ({ stories = [], order, note }) => (
  stories.map(story => (story.order === order ? { ...story, note } : story))
);

const deleteStory = ({ stories, story }) => (
  stories.filter(item => item.order !== story.order)
);

const reorderStories = stories => (
  stories.forEach((item, index) => { item.order = index + 1; })
);

const updateStories = ({ stories, story }) => {
  const newStories = deleteStory({ stories, story });
  const reorder = reorderStories(newStories);
  console.log('reorder', reorder);
  return []; //reorderStories(newStories);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      return {
        ...state,
        storyGroup: { ...state.storyGroup, scheduledAt: action.scheduledAt },
      };
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          scheduledAt: action.scheduledAt,
          stories: action.stories,
          storyGroupId: action.storyGroupId,
        },
      };
    }
    case actionTypes.SET_STORY_GROUP: {
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          scheduledAt: action.scheduledAt,
          stories: action.stories,
          storyGroupId: action.storyGroupId,
        },
      };
    }
    case actionTypes.SAVE_STORY_NOTE: {
      const { order, note } = action;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: { ...state.storyGroup, stories: updateStoryNote({ stories, order, note }) },
      };
    }
    case actionTypes.DELETE_STORY: {
      const { story } = action;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: { ...state.storyGroup, stories: deleteStory({ stories, story }) },
      };
    }
    case actionTypes.SET_SCHEDULE_LOADING: {
      return {
        ...state,
        isScheduleLoading: action.isLoading,
      };
    }
    case actionTypes.SET_SHOW_DATE_PICKER: {
      return {
        ...state,
        showDatePicker: action.showDatePicker,
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
  handleUpdateStoryGroup: ({ scheduledAt, stories, storyGroupId }) => ({
    type: actionTypes.UPDATE_STORY_GROUP,
    scheduledAt,
    stories,
    storyGroupId,
  }),
  handleSaveStoryNote: ({ order, note }) => ({
    type: actionTypes.SAVE_STORY_NOTE,
    order,
    note,
  }),
  setStoryGroup: ({ scheduledAt, stories, storyGroupId }) => ({
    type: actionTypes.SET_STORY_GROUP,
    scheduledAt,
    stories,
    storyGroupId,
  }),
  setScheduleLoading: isLoading => ({
    type: actionTypes.SET_SCHEDULE_LOADING,
    isLoading,
  }),
  setShowDatePicker: showDatePicker => ({
    type: actionTypes.SET_SHOW_DATE_PICKER,
    showDatePicker,
  }),
  deleteStory: story => ({
    type: actionTypes.DELETE_STORY,
    story,
  }),
};
