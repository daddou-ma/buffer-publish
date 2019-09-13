import clonedeep from 'lodash.clonedeep';
import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  SAVE_STORY_NOTE: 0,
  UPDATE_STORY_GROUP: 0,
  SET_SCHEDULE_LOADING: 0,
  SET_SHOW_DATE_PICKER: 0,
  RESET_STORY_GROUP_STATE: 0,
  CREATE_NEW_STORY_CARD: 0,
  UPDATE_STORY_UPLOAD_PROGRESS: 0,
  UPDATE_STORY_VIDEO_PROCESSING_STARTED: 0,
  UPDATE_STORY_VIDEO_PROCESSING_COMPLETE: 0,
  UPDATE_STORY_UPLOAD_IMAGE_COMPLETED: 0,
  DELETE_STORY: 0,
  SET_STORY_GROUP: 0,
});

const newStory = () => clonedeep({
  note: null,
  order: 0,
  type: null,
  asset_url: null,
  thumbnail_url: null,
  upload_id: null,
  duration_ms: null,
  file_size: null,
  width: null,
  height: null,
  uploading: false,
  progress: null,
  uploadTrackingId: null,
  processing: null,
});

export const initialState = {
  // temporarily adding as dummy data until create is working
  storyGroup: {
    scheduledAt: null,
    stories: [],
  },
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

export default (state, action) => {
  if (!state) {
    state = clonedeep(initialState);
  }
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          scheduledAt: action.scheduledAt
        },
      };
    }
    case `createStoryGroup_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case actionTypes.RESET_STORY_GROUP_STATE: {
      return clonedeep(initialState);
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
          stories: action.stories,
          scheduledAt: action.scheduledAt,
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
    case actionTypes.UPDATE_STORY_UPLOAD_PROGRESS: {
      const {
        id,
        progress,
        complete,
      } = action.args;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: stories.map((story) => {
            if (story.uploadTrackingId === id) {
              return {
                ...story,
                progress,
              };
            }
            return story;
          }),
        },
      };
    }
    case actionTypes.UPDATE_STORY_UPLOAD_IMAGE_COMPLETED: {
      const {
        id,
        url,
        width,
        height,
        stillGifUrl,
        contentType,
      } = action.args;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: stories.map((story) => {
            if (story.uploadTrackingId === id) {
              return {
                ...story,
                asset_url: url,
                type: contentType,
                progress: 100,
                uploading: false,
                width,
                height,
                thumbnail_url: url,
              };
            }
            return story;
          }),
        },
      };
    }
    case actionTypes.UPDATE_STORY_VIDEO_PROCESSING_COMPLETE: {
      const {
        durationMs,
        size,
        width,
        height,
        url,
        thumbnail,
        uploadId,
      } = action.args;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: stories.map((story) => {
            if (story.upload_id === uploadId) {
              return {
                ...story,
                processing: false,
                progress: 100,
                uploading: false,
                duration_ms: durationMs,
                file_size: size,
                thumbnail_url: thumbnail,
                width,
                height,
                asset_url: url,
              };
            }
            return story;
          }),
        },
      };
    }
    case actionTypes.UPDATE_STORY_VIDEO_PROCESSING_STARTED: {
      const {
        id,
        uploadId,
        contentType,
      } = action.args;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: stories.map((story) => {
            if (story.uploadTrackingId === id) {
              return {
                ...story,
                processing: true,
                progress: 100,
                uploading: false,
                upload_id: uploadId,
                type: contentType,
              };
            }
            return story;
          }),
        },
      };
    }
    case actionTypes.CREATE_NEW_STORY_CARD: {
      const { stories } = state.storyGroup;
      const { id } = action.args;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: [...stories, {
            ...newStory(),
            uploadTrackingId: id,
            uploading: true,
            progress: 0,
            order: stories.length,
          }],
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
  updateStoryUploadProgress: ({
    id, uploaderInstance, progress, file, complete,
  }) => ({
    type: actionTypes.UPDATE_STORY_UPLOAD_PROGRESS,
    args: {
      id,
      uploaderInstance,
      progress,
      file,
      complete,
    },
  }),
  setScheduleLoading: isLoading => ({
    type: actionTypes.SET_SCHEDULE_LOADING,
    isLoading,
  }),
  resetStoryGroupState: () => ({
    type: actionTypes.RESET_STORY_GROUP_STATE,
  }),
  createNewStoryCard: ({ file, uploaderInstance, id }) => ({
    type: actionTypes.CREATE_NEW_STORY_CARD,
    args: {
      id,
      uploaderInstance,
      file,
    },
  }),
  uploadImageComplete: ({
    id,
    uploaderInstance,
    url,
    width,
    height,
    file,
    stillGifUrl = null,
    contentType,
  }) => ({
    type: actionTypes.UPDATE_STORY_UPLOAD_IMAGE_COMPLETED,
    args: {
      id,
      uploaderInstance,
      url,
      width,
      height,
      file,
      stillGifUrl,
      contentType,
    },
  }),
  videoUploadProcessingStarted: ({
    id, uploaderInstance, uploadId, fileExtension, file, progress, contentType,
  }) => ({
    type: actionTypes.UPDATE_STORY_VIDEO_PROCESSING_STARTED,
    args: {
      id,
      uploaderInstance,
      uploadId,
      fileExtension,
      file,
      progress,
      contentType,
    },
  }),
  videoUploadProcessingComplete: ({
    id,
    duration,
    durationMs,
    size,
    width,
    height,
    url,
    originalUrl,
    thumbnail,
    availableThumbnails,
    uploadId,
  }) => ({
    type: actionTypes.UPDATE_STORY_VIDEO_PROCESSING_COMPLETE,
    args: {
      id,
      duration,
      durationMs,
      size,
      width,
      height,
      url,
      originalUrl,
      thumbnail,
      availableThumbnails,
      uploadId,
    },
  }),
  deleteStory: story => ({
    type: actionTypes.DELETE_STORY,
    story,
  }),

};
