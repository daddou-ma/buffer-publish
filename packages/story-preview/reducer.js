import keyWrapper from '@bufferapp/keywrapper';

import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import updateStoryNote from './utils/updateStoryNote';

export const actionTypes = keyWrapper('STORY_PREVIEW', {
  OPEN_PREVIEW: 0,
  SAVE_NOTE: 0,
  SAVE_NOTE_COMPOSER: 0,
  TRACK_NOTE: 0,
});

export const initialState = {
  user: {},
  stories: [],
  profileId: null,
  storyGroupId: null,
  scheduledAt: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE: {
      return {
        ...state,
        user: {
          avatarUrl: action.profile.avatarUrl,
          handle: action.profile.username,
        },
      };
    }
    case actionTypes.OPEN_PREVIEW: {
      return {
        ...state,
        stories: action.stories,
        profileId: action.profileId,
        scheduledAt: action.scheduledAt,
        storyGroupId: action.id,
      };
    }
    case actionTypes.SAVE_NOTE_COMPOSER: {
      const { stories } = state;
      const { order, note } = action;
      return {
        ...state,
        stories: updateStoryNote({ stories, order, note }),
      };
    }
    default:
      return state;
  }
};

export const actions = {
  handlePreviewClick: ({ stories, profileId, id, scheduledAt }) => ({
    type: actionTypes.OPEN_PREVIEW,
    stories,
    profileId,
    id,
    scheduledAt,
  }),
  handleSaveNoteClick: ({ order, note }) => ({
    type: actionTypes.SAVE_NOTE,
    order,
    note,
  }),
  handleSaveNoteComposer: ({ order, note }) => ({
    type: actionTypes.SAVE_NOTE_COMPOSER,
    order,
    note,
  }),
  trackNote: ({ order, note }) => ({
    type: actionTypes.TRACK_NOTE,
    order,
    note,
  }),
};
