import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  SAVE_STORY_NOTE: 0,
  UPDATE_STORY_GROUP: 0,
  FILE_UPLOAD_FINISHED: 0,
});

export const initialState = {
  draft: {
    stories: [],
    scheduledAt: null,
  },
  isScheduleLoading: false,
};

const updateStoryNote = ({ stories = [], storyId, note }) => (
  stories.map(story => (story.id === storyId ? { ...story, note } : story))
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
          stories: action.stories,
        },
      };
    }
    case actionTypes.SAVE_STORY_NOTE: {
      const { storyId, note } = action;
      const { stories } = state.draft;
      return {
        ...state,
        draft: {
          ...state.draft,
          stories: updateStoryNote({ stories, storyId, note }),
        },
      };
    }
    case actionTypes.FILE_UPLOAD_FINISHED: {
      const { fileUploaded } = action;
      const order = state.draft.stories.length + 1;
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

      return {
        ...state,
        draft: {
          ...state.draft,
          stories: [...state.draft.stories, story],
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
  handleSaveStoryNote: ({ storyId, note }) => ({
    type: actionTypes.SAVE_STORY_NOTE,
    storyId,
    note,
  }),
  handleFileUploadFinished: fileUploaded => ({
    type: actionTypes.FILE_UPLOAD_FINISHED,
    fileUploaded,
  }),
};
