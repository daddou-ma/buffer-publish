import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  SAVE_STORY_NOTE: 0,
  UPDATE_STORY_GROUP: 0,
  SET_SCHEDULE_LOADING: 0,
  SET_SHOW_DATE_PICKER: 0,
  FILE_UPLOAD_FINISHED: 0,
});

export const initialState = {
  draft: {
    scheduledAt: null,
    stories: [],
  },
  isScheduleLoading: false,
  showDatePicker: false,
};

const updateStoryNote = ({ stories = [], order, note }) => (
  stories.map(story => (story.order === order ? { ...story, note } : story))
);

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      return {
        ...state,
        draft: {
          ...state.draft,
          scheduledAt: action.scheduledAt,
        },
      };
    }
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return initialState;
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      return {
        ...state,
        draft: {
          ...state.draft,
          scheduledAt: action.scheduledAt,
          storyGroupId: action.storyGroupId,
        },
      };
    }
    case actionTypes.SAVE_STORY_NOTE: {
      const { order, note } = action;
      const { stories } = state.draft;
      return {
        ...state,
        draft: { ...state.draft, stories: updateStoryNote({ stories, order, note }) },
      };
    }
    case actionTypes.FILE_UPLOAD_FINISHED: {
      const { fileUploaded, editingStoryGroup } = action;
      const order = (state.draft.stories.length + 1).toString();

      // TODO: check this bit of code for other media types
      const story = {
        order,
        note: null,
        type: fileUploaded.type,
        asset_url: fileUploaded.url,
        thumbnail_url: fileUploaded.url,
        height: fileUploaded.height,
        width: fileUploaded.width,
        file_size: fileUploaded.file.size,
      };

      if (editingStoryGroup) {
        const { stories } = editingStoryGroup.storyDetails;
        story.order = (stories.length + 1).toString();

        return {
          ...state,
          draft: {
            ...editingStoryGroup,
            stories: [...stories, story],
          },
        };
      }

      return {
        ...state,
        draft: {
          ...state.draft,
          stories: [...state.draft.stories, story],
        },
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
  setScheduleLoading: isLoading => ({
    type: actionTypes.SET_SCHEDULE_LOADING,
    isLoading,
  }),
  setShowDatePicker: showDatePicker => ({
    type: actionTypes.SET_SHOW_DATE_PICKER,
    showDatePicker,
  }),
  handleFileUploadFinished: (fileUploaded, editingStoryGroup) => ({
    type: actionTypes.FILE_UPLOAD_FINISHED,
    fileUploaded,
    editingStoryGroup,
  }),
};
