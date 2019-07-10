import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue';

import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('PROFILE_SIDEBAR', {
  SELECT_PROFILE: 0,
  PROFILE_UNPAUSED: 0,
  PROFILE_PAUSED: 0,
  PUSHER_PROFILE_PAUSED_STATE: 0,
  CONNECT_SOCIAL_ACCOUNT: 0,
  MANAGE_SOCIAL_ACCOUNT: 0,
  PROFILE_DROPPED: 0,
  SINGLE_PROFILE: 0,
  HANDLE_SEARCH_PROFILE_CHANGE: 0,
});

export const initialState = {
  profiles: [],
  selectedProfileId: '',
  loading: false,
  selectedProfile: {},
  isLockedProfile: false,
  isBusinessAccount: false,
  hasInstagram: true,
  hasFacebook: true,
  hasTwitter: true,
  isSearchPopupVisible: false,
  searchText: null,
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
    case queueActionTypes.POST_COUNT_UPDATED:
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
  let isSearchPopupVisible = false;
  let searchText = null;
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
        hasInstagram: action.result.some(p => p.service === 'instagram'),
        hasFacebook: action.result.some(p => p.service === 'facebook'),
        hasTwitter: action.result.some(p => p.service === 'twitter'),
      };
    }
    case actionTypes.SELECT_PROFILE: {
      return {
        ...state,
        selectedProfileId: action.profileId,
        profiles: profilesReducer(state.profiles, action),
        selectedProfile: action.profile,
        isLockedProfile: action.profile ? action.profile.disabled : false,
        isSearchPopupVisible: false,
      };
    }
    case actionTypes.HANDLE_SEARCH_PROFILE_CHANGE:
      searchText = action.value;
      isSearchPopupVisible = searchText && searchText.length > 2;

      return {
        ...state,
        searchText,
        isSearchPopupVisible,
      };
    case `singleProfile_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      let {
        selectedProfile,
        profiles,
      } = state;

      if (selectedProfile.id === action.result.id) {
        selectedProfile = action.result;
      }

      if (profiles.some(p => p.id === action.result.id)) {
        profiles = profiles.map((profile) => {
          if (profile.id === action.result.id) {
            return action.result;
          }
          return profile;
        });
      } else {
        profiles = [...profiles, action.result];
      }

      return {
        ...state,
        profiles,
        selectedProfile,
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
    case queueActionTypes.POST_COUNT_UPDATED: {
      return {
        ...state,
        profiles: profilesReducer(state.profiles, action),
      };
    }
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      return {
        ...state,
        isOnBusinessTrial: action.result.isOnBusinessTrial,
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
  handleManageSocialAccountClick: () => ({
    type: actionTypes.MANAGE_SOCIAL_ACCOUNT,
  }),
  handleConnectSocialAccount: () => ({
    type: actionTypes.CONNECT_SOCIAL_ACCOUNT,
  }),
  onDropProfile: ({ commit, dragIndex, hoverIndex, profileLimit }) => ({
    type: actionTypes.PROFILE_DROPPED,
    commit,
    dragIndex,
    hoverIndex,
    profileLimit,
  }),
  handleSearchProfileChange: ({ value }) => ({
    type: actionTypes.HANDLE_SEARCH_PROFILE_CHANGE,
    value,
  }),
};
