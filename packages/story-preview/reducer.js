import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';

export const actionTypes = keyWrapper('STORY_PREVIEW', {
  OPEN_PREVIEW: 0,
  SAVE_NOTE: 0,
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
        user: { avatarUrl: action.profile.avatarUrl, handle: action.profile.username },
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
    default:
      return state;
  }
};

export const actions = {
  handlePreviewClick: (stories, profileId, id, scheduledAt) => ({
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
};
