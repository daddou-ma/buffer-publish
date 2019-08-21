import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as profileSidebarActionTypes } from '@bufferapp/publish-profile-sidebar';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('STORIES', {
  SLOT_CLICKED: 0,
});

export const initialState = {
  byProfileId: {},
  environment: 'production',
};

export const profileInitialState = {
  loading: true,
  copySuccess: false,
  gridPosts: [],
  total: 0,
};

const getProfileId = (action) => {
  if (action.profileId) { return action.profileId; }
  if (action.args) { return action.args.profileId; }
  if (action.profile) { return action.profile.id; }
};


const profileReducer = (state = profileInitialState, action) => {
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
      return profileInitialState;
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  let profileId;
  switch (action.type) {
    case profileSidebarActionTypes.SELECT_PROFILE:
    case actionTypes.SLOT_CLICKED:
      profileId = getProfileId(action);
      if (profileId) {
        return {
          byProfileId: {
            ...state.byProfileId,
            [profileId]: profileReducer(state.byProfileId[profileId], action),
          },
        };
      }
      return state;
    default:
      return state;
  }
};

export const actions = {
  handleSlotClick: ({ profileId }) => ({
    type: actionTypes.SLOT_CLICKED,
    profileId,
  }),
};
