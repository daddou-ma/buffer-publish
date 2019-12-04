import clonedeep from 'lodash.clonedeep';
import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import debounce from 'lodash.debounce';
import getAspectRatio, {
  InstagramStoriesAspectRatios,
} from './utils/aspectRatioFinder';

export const actionTypes = keyWrapper('STORY_GROUP_COMPOSER', {
  SAVE_STORY_GROUP: 0,
  SAVE_STORY_NOTE: 0,
  UPDATE_STORY_GROUP: 0,
  SET_SCHEDULE_LOADING: 0,
  SET_SHOW_DATE_PICKER: 0,
  RESET_STORY_GROUP_STATE: 0,
  CREATE_NEW_STORY_CARD: 0,
  UPDATE_STORY_UPLOAD_PROGRESS: 0,
  UPDATE_STORY_PROGRESS: 0,
  UPDATE_STORY_VIDEO_PROCESSING_STARTED: 0,
  UPDATE_STORY_VIDEO_PROCESSING_COMPLETE: 0,
  UPDATE_STORY_UPLOAD_IMAGE_COMPLETED: 0,
  CARD_DROPPED: 0,
  DELETE_STORY: 0,
  OPEN_PREVIEW: 0,
  CLOSE_PREVIEW: 0,
  SET_STORY_GROUP: 0,
  SHOW_ERRORS: 0,
  HIDE_ERRORS: 0,
  TRACK_DRAG_AND_DROP_STORY: 0,
  TRACK_NOTE: 0,
  TRACK_NON_CONFORMING_IMAGE_UPLOADED_STORY: 0,
});

const newStory = () =>
  clonedeep({
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
  storyGroup: {
    scheduledAt: null,
    stories: [],
  },
  inProgress: [],
  isScheduleLoading: false,
  showStoryPreview: false,
  errors: [],
  maxStories: 10,
};

const updateStoryNote = ({ stories = [], order, note }) =>
  stories.map(story => (story.order === order ? { ...story, note } : story));

const reorderStories = (stories, sourceOrder, targetOrder) => {
  const draggedCard = stories.find(item => item.order === sourceOrder);
  const remainingCards = stories.filter(item => item.order !== sourceOrder);

  if (sourceOrder < targetOrder) {
    remainingCards.forEach(story => {
      if (story.order > sourceOrder && story.order <= targetOrder) {
        story.order -= 1;
      }
    });
  }
  if (sourceOrder > targetOrder) {
    remainingCards.forEach(story => {
      if (story.order < sourceOrder && story.order >= targetOrder) {
        story.order += 1;
      }
    });
  }
  draggedCard.order = targetOrder;

  const result = [...remainingCards, draggedCard];

  return result;
};

const deleteStory = ({ stories, story }) => {
  const result = stories.filter(item => item.order !== story.order);

  return result.map(item => {
    // If card is on the right of the deleted card,
    // change order one space to the left
    if (item.order > story.order) {
      item.order -= 1;
    }
    return item;
  });
};

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
          shareNow: action.shareNow,
          scheduledAt: action.scheduledAt,
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
          isPastDue: action.isPastDue,
        },
      };
    }
    case actionTypes.SAVE_STORY_NOTE: {
      const { order, note } = action;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: updateStoryNote({ stories, order, note }),
        },
      };
    }
    case actionTypes.DELETE_STORY: {
      const { story } = action;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: deleteStory({ stories, story }),
        },
      };
    }
    case actionTypes.SET_SCHEDULE_LOADING: {
      return {
        ...state,
        isScheduleLoading: action.isLoading,
      };
    }
    case actionTypes.UPDATE_STORY_PROGRESS: {
      const { inProgress } = state;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: clonedeep(stories).map(story => {
            inProgress
              .filter(
                currentStory => story.uploadTrackingId === currentStory.id
              )
              .forEach(({ progress }) => {
                if (progress > story.progress) {
                  story.progress = progress;
                }
              });
            return story;
          }),
        },
        progress: [],
      };
    }
    case actionTypes.UPDATE_STORY_UPLOAD_PROGRESS: {
      const { id, progress } = action.args;
      return {
        ...state,
        inProgress: [
          ...state.inProgress,
          {
            id,
            progress,
          },
        ],
      };
    }
    case actionTypes.UPDATE_STORY_UPLOAD_IMAGE_COMPLETED: {
      const { id, url, width, height, contentType } = action.args;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: stories.map(story => {
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
          stories: stories.map(story => {
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
      const { id, uploadId, contentType } = action.args;
      const { stories } = state.storyGroup;
      return {
        ...state,
        storyGroup: {
          ...state.storyGroup,
          stories: stories.map(story => {
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
          stories: [
            ...stories,
            {
              ...newStory(),
              uploadTrackingId: id,
              uploading: true,
              progress: 0,
              order: stories.length + 1,
            },
          ],
        },
      };
    }
    case actionTypes.CARD_DROPPED: {
      const { card: sourceCard } = action.cardSource;
      const { card: targetCard } = action.cardTarget;

      if (sourceCard.order !== targetCard.order) {
        return {
          ...state,
          storyGroup: {
            ...state.storyGroup,
            stories: reorderStories(
              state.storyGroup.stories,
              sourceCard.order,
              targetCard.order
            ),
          },
        };
      }
      return state;
    }
    case actionTypes.OPEN_PREVIEW:
      return {
        ...state,
        showStoryPreview: true,
      };
    case actionTypes.CLOSE_PREVIEW:
      return {
        ...state,
        showStoryPreview: false,
      };
    case actionTypes.HIDE_ERRORS:
      return {
        ...state,
        errors: [],
        processedErrors: [],
      };
    case actionTypes.SHOW_ERRORS:
      if (
        action.uploadId !== null &&
        state.processedErrors &&
        state.processedErrors.includes(action.uploadId)
      ) {
        return state;
      }
      return {
        ...state,
        errors: [...state.errors, action.message].filter(
          (value, index, self) => self.indexOf(value) === index
        ),
        processedErrors: [...state.processedErrors, action.uploadId],
      };
    default:
      return state;
  }
};

export const actions = {
  handleSaveStoryGroup: (scheduledAt, shareNow) => ({
    type: actionTypes.SAVE_STORY_GROUP,
    scheduledAt,
    shareNow,
  }),
  handleUpdateStoryGroup: ({
    scheduledAt,
    stories,
    storyGroupId,
    shareNow,
  }) => ({
    type: actionTypes.UPDATE_STORY_GROUP,
    scheduledAt,
    stories,
    storyGroupId,
    shareNow,
  }),
  handleSaveStoryNote: ({ order, note }) => ({
    type: actionTypes.SAVE_STORY_NOTE,
    order,
    note,
  }),
  handlePreviewClick: () => ({
    type: actionTypes.OPEN_PREVIEW,
  }),
  handleClosePreviewClick: () => ({
    type: actionTypes.CLOSE_PREVIEW,
  }),
  setStoryGroup: ({ scheduledAt, stories, storyGroupId, isPastDue }) => ({
    type: actionTypes.SET_STORY_GROUP,
    scheduledAt,
    stories,
    storyGroupId,
    isPastDue,
  }),
  updateStoryPogress: debounce(
    dispatch =>
      dispatch({
        type: actionTypes.UPDATE_STORY_PROGRESS,
      }),
    270,
    { leading: false, trailing: true }
  ),
  updateStoryUploadProgress: ({
    id,
    uploaderInstance,
    progress,
    file,
    complete,
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
    id,
    uploaderInstance,
    uploadId,
    fileExtension,
    file,
    progress,
    contentType,
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
  onDropCard: (cardSource, cardTarget) => ({
    type: actionTypes.CARD_DROPPED,
    cardSource,
    cardTarget,
  }),
  deleteStory: story => ({
    type: actionTypes.DELETE_STORY,
    story,
  }),
  showError: ({ message, uploadId = null }) => ({
    type: actionTypes.SHOW_ERRORS,
    message,
    uploadId,
  }),
  hideError: () => ({
    type: actionTypes.HIDE_ERRORS,
  }),
  trackDroppedCard: cardSource => ({
    type: actionTypes.TRACK_DRAG_AND_DROP_STORY,
    isDragging: cardSource.isDragging,
  }),
  trackNote: ({ cta, note, order }) => ({
    type: actionTypes.TRACK_NOTE,
    cta,
    note,
    order,
  }),
  trackAspectRatio: ({ cta, width, height, id }) => ({
    type: actionTypes.TRACK_NON_CONFORMING_IMAGE_UPLOADED_STORY,
    args: {
      width,
      height,
      cta,
      id,
    },
  }),
};
