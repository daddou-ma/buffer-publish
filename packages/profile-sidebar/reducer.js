import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('PROFILE_SIDEBAR', {
  SELECT_PROFILE: 0,
  POST_COUNT_UPDATED: 0,
  PROFILE_UNPAUSED: 0,
  PROFILE_PAUSED: 0,
  PUSHER_PROFILE_PAUSED_STATE: 0,
  CONNECT_SOCIAL_ACCOUNT: 0,
  PROFILE_DROPPED: 0,
});

export const initialState = {
  profiles: [],
  selectedProfileId: '',
  loading: false,
  selectedProfile: {},
  isLockedProfile: false,
  isBusinessAccount: false,
};

const moveProfileInArray = (arr, from, to) => {
  const clone = [...arr];

  // Support passing `from` and `to` in non-sequential order (e.g., 4 and 1).
  const fromIndex = from < to ? from : to;
  const toIndex = to > from ? to : from;

  // Generate the new array
  Array.prototype.splice.call(clone, toIndex, 0,
    Array.prototype.splice.call(clone, fromIndex, 1)[0],
  );
  return clone;
};

const handleProfileDropped = (profiles, action) => {
  const { profileLimit, hoverIndex, dragIndex } = action;
  const reorderedProfiles = moveProfileInArray(profiles, dragIndex, hoverIndex);
  // add profiles after limit as disabled
  if (reorderedProfiles.length > profileLimit) {
    reorderedProfiles.map((profile, index) => {
      profile.disabled = index >= profileLimit;
      return profile;
    });
  }
  return reorderedProfiles;
};

const profilesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      return state
        .map(profile => ({
          ...profile,
          open: profile.id === action.profileId,
        }));
    case actionTypes.POST_COUNT_UPDATED:
      return state
        .map(profile => ({
          ...profile,
          pendingCount: profile.id === action.profileId
            ? action.counts.pending
            : profile.pendingCount,
          sentCount: profile.id === action.profileId
            ? action.counts.sent
            : profile.sentCount,
        }));
    case actionTypes.PROFILE_PAUSED:
    case actionTypes.PROFILE_UNPAUSED:
      return state
        .map(profile => ({
          ...profile,
          paused: profile.id === action.profileId
            ? action.type === actionTypes.PROFILE_PAUSED
            : profile.paused,
        }));
    case actionTypes.PUSHER_PROFILE_PAUSED_STATE:
      return state
        .map(profile => ({
          ...profile,
          paused: profile.id === action.profileId
            ? action.paused
            : profile.paused,
        }));
    default:
      return state;
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        loading: true,
      };
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        loading: false,
        profiles: action.result,
      };
    }
    case actionTypes.SELECT_PROFILE: {
      return {
        ...state,
        selectedProfileId: action.profileId,
        profiles: profilesReducer(state.profiles, action),
        selectedProfile: action.profile,
        isLockedProfile: action.profile ? action.profile.disabled : false,
      };
    }
    case actionTypes.PROFILE_DROPPED: {
      if (!action.commit) {
        return {
          ...state,
          profiles: handleProfileDropped(state.profiles, action),
        };
      }
      return state;
    }
    case actionTypes.PROFILE_PAUSED:
    case actionTypes.PROFILE_UNPAUSED:
    case actionTypes.PUSHER_PROFILE_PAUSED_STATE:
    case actionTypes.POST_COUNT_UPDATED: {
      return {
        ...state,
        profiles: profilesReducer(state.profiles, action),
      };
    }
    default:
      return state;
  }
};

export const actions = {
  selectProfile: ({ profile }) => ({
    type: actionTypes.SELECT_PROFILE,
    profileId: profile ? profile.id : null,
    profile,
  }),
  onUnpauseClick: ({ profileId }) => ({
    type: actionTypes.PROFILE_UNPAUSED,
    profileId,
  }),
  onPauseClick: ({ profileId }) => ({
    type: actionTypes.PROFILE_PAUSED,
    profileId,
  }),
  handleConnectSocialAccountClick: () => ({
    type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
  }),
  onDropProfile: ({ commit, dragIndex, hoverIndex, profileLimit }) => ({
    type: actionTypes.PROFILE_DROPPED,
    commit,
    dragIndex,
    hoverIndex,
    profileLimit,
  }),
};
