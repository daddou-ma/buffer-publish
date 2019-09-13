import clonedeep from 'lodash.clonedeep';
import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  SAVE_STORY_NOTE: 0,
  UPDATE_STORY_GROUP: 0,
  SET_SCHEDULE_LOADING: 0,
  SET_SHOW_DATE_PICKER: 0,
  RESET_DRAFT_STATE: 0,
  CREATE_NEW_STORY_CARD: 0,
  UPDATE_STORY_UPLOAD_PROGRESS: 0,
  UPDATE_STORY_VIDEO_PROCESSING_STARTED: 0,
  UPDATE_STORY_VIDEO_PROCESSING_COMPLETE: 0,
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

export default (state, action) => {
  if (!state) {
    state = clonedeep(initialState);
  }
  switch (action.type) {
    case actionTypes.SAVE_STORY_GROUP: {
      return {
        ...state,
        draft: { ...state.draft, scheduledAt: action.scheduledAt },
      };
    }
    case actionTypes.RESET_DRAFT_STATE: {
      return clonedeep(initialState);
    }
    case actionTypes.UPDATE_STORY_GROUP: {
      return {
        ...state,
        draft: {
          ...state.draft,
          scheduledAt: action.scheduledAt,
          stories: action.stories,
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
      const { stories } = state.draft;
      return {
        ...state,
        draft: {
          ...state.draft,
          stories: stories.map((story) => {
            if (story.uploadTrackingId === id) {
              return {
                ...story,
                progress,
                uploading: !complete,
              };
            }
            return story;
          }),
        },
      };
    }
    case actionTypes.UPDATE_STORY_VIDEO_PROCESSING_COMPLETE: {
      const {
        id,
        name,
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
      } = action.args;
      const { stories } = state.draft;
      return {
        ...state,
        draft: {
          ...state.draft,
          stories: stories.map((story) => {
            if (story.upload_id === uploadId) {
              return {
                ...story,
                processing: false,
                name,
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
        uploaderInstance,
        uploadId,
        fileExtension,
        file,
      } = action.args;
      const { stories } = state.draft;
      return {
        ...state,
        draft: {
          ...state.draft,
          stories: stories.map((story) => {
            if (story.uploadTrackingId === id) {
              return {
                ...story,
                processing: true,
                upload_id: uploadId,
              };
            }
            return story;
          }),
        },
      };
    }
    case actionTypes.CREATE_NEW_STORY_CARD: {
      const { stories } = state.draft;
      const { file, id } = action.args;
      return {
        ...state,
        draft: {
          ...state.draft,
          stories: [...stories, {
            ...newStory(),
            uploadTrackingId: id,
            uploading: true,
            progress: 0,
            thumbnail_url: file && file.preview,
            name: file.name,
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
  setShowDatePicker: showDatePicker => ({
    type: actionTypes.SET_SHOW_DATE_PICKER,
    showDatePicker,
  }),
  resetDraftState: () => ({
    type: actionTypes.RESET_DRAFT_STATE,
  }),
  createNewStoryCard: ({ file, uploaderInstance, id }) => ({
    type: actionTypes.CREATE_NEW_STORY_CARD,
    args: {
      id,
      uploaderInstance,
      file,
    },
  }),
  videoUploadProcessingStarted: ({
    id, uploaderInstance, uploadId, fileExtension, file, progress,
  }) => ({
    type: actionTypes.UPDATE_STORY_VIDEO_PROCESSING_STARTED,
    args: {
      id,
      uploaderInstance,
      uploadId,
      fileExtension,
      file,
      progress,
    },
  }),
  videoUploadProcessingComplete: ({
    id,
    name,
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
      name,
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

};
