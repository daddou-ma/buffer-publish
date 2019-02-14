import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue';

import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('PROFILE_SIDEBAR', {
  SELECT_PROFILE: 0,
  PROFILE_UNPAUSED: 0,
  PROFILE_PAUSED: 0,
  PUSHER_PROFILE_PAUSED_STATE: 0,
  CONNECT_SOCIAL_ACCOUNT: 0,
});

const initialState = {
  profiles: [],
  lockedProfiles: [],
  selectedProfileId: '',
  loading: false,
  selectedProfile: {},
  isLockedProfile: false,
  isBusinessAccount: false,
  hasInstagram: true,
  hasFacebook: true,
  hasTwitter: true,
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
        profiles: action.result
          .filter(profile => !profile.disabled),
        lockedProfiles: action.result
          .filter(profile => profile.disabled),
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
        lockedProfiles: profilesReducer(state.lockedProfiles, action),
        selectedProfile: action.profile,
        isLockedProfile: action.profile ? action.profile.disabled : false,
      };
    }
    case actionTypes.PROFILE_PAUSED:
    case actionTypes.PROFILE_UNPAUSED:
    case actionTypes.PUSHER_PROFILE_PAUSED_STATE:
    case queueActionTypes.POST_COUNT_UPDATED: {
      return {
        ...state,
        profiles: profilesReducer(state.profiles, action),
        lockedProfiles: profilesReducer(state.lockedProfiles, action),
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
};
