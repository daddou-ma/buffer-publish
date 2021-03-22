import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as queueActionTypes } from '@bufferapp/publish-queue/reducer';
import { actionTypes as orgActionTypes } from '@bufferapp/publish-data-organizations';

import keyWrapper from '@bufferapp/keywrapper';
import { filterProfilesByOrg } from './utils';

export const actionTypes = keyWrapper('PROFILE_SIDEBAR', {
  SELECT_PROFILE: 0,
  PROFILE_UNPAUSED: 0,
  PROFILE_PAUSED: 0,
  PUSHER_PROFILE_PAUSED_STATE: 0,
  CONNECT_SOCIAL_ACCOUNT: 0,
  PROFILE_DROPPED: 0,
  HANDLE_SEARCH_PROFILE_CHANGE: 0,
  PROFILE_ROUTE_LOADED: 0,
});

export const initialState = {
  profiles: [],
  profileList: [],
  profilesUnfiltered: [],
  selectedProfileId: '',
  organization: null,
  loading: false,
  loaded: false,
  isLoadingGlobalAccount: true,
  hasSharedChannelsFlip: false,
  selectedProfile: {},
  isLockedProfile: false,
  hasInstagram: true,
  hasFacebook: true,
  hasTwitter: true,
  isSearchPopupVisible: false,
  searchText: null,
  userId: null,
};

const moveProfileInArray = (arr, from, to) => {
  const clone = [...arr];

  // Support passing `from` and `to` in non-sequential order (e.g., 4 and 1).
  const fromIndex = from < to ? from : to;
  const toIndex = to > from ? to : from;

  // Generate the new array
  Array.prototype.splice.call(
    clone,
    toIndex,
    0,
    Array.prototype.splice.call(clone, fromIndex, 1)[0]
  );
  return clone;
};

const handleProfileDropped = (
  profiles,
  action,
  canReorderProfiles,
  hasPinterestFeature
) => {
  const { profileLimit, hoverIndex, dragIndex } = action;
  const reorderedProfiles = moveProfileInArray(profiles, dragIndex, hoverIndex);
  /* The reducer will return an object with 3 properties, each of them an array of profiles.
  For each profile reduced, we will need to spread the ACC object,
  changing only 1 property, i.e., adding the profile to only 1 array */
  const {
    enabledProfiles,
    lockedProfiles,
    blockedProfiles,
  } = reorderedProfiles.reduce(
    (acc, cur) => {
      /* If the user is not the owner it can't be unlocked,
      the same happens for pinterest accounts if the user is on a free plan:
      it goes to the blockedProfiles array. */
      if (
        !canReorderProfiles ||
        (cur.service === 'pinterest' && !hasPinterestFeature)
      ) {
        return { ...acc, blockedProfiles: [...acc.blockedProfiles, cur] };
      }

      /* If it's not a blocked profile, figure out if the enabledProfiles array
      in ACC is already full i.e. if the user has surpassed the profile limit.
      In that case, the profile must go into the lockedProfiles.
      If not, then the profile belongs in the enabledProfiles. */
      return acc.enabledProfiles.length >= profileLimit
        ? {
            ...acc,
            lockedProfiles: [...acc.lockedProfiles, { ...cur, disabled: true }],
          }
        : {
            ...acc,
            enabledProfiles: [
              ...acc.enabledProfiles,
              { ...cur, disabled: false },
            ],
          };
    },
    { enabledProfiles: [], lockedProfiles: [], blockedProfiles: [] }
  );

  // Final list of profiles
  const sortedProfiles = [
    ...enabledProfiles,
    ...lockedProfiles,
    ...blockedProfiles,
  ];

  return sortedProfiles;
};

const profilesReducer = (state = [], action) => {
  switch (action.type) {
    case actionTypes.SELECT_PROFILE:
      return state.map(profile => ({
        ...profile,
        open: profile.id === action.profileId,
      }));
    case queueActionTypes.POST_COUNT_UPDATED:
      return state.map(profile => ({
        ...profile,
        pendingCount:
          profile.id === action.profileId
            ? action.counts.pending
            : profile.pendingCount,
        sentCount:
          profile.id === action.profileId
            ? action.counts.sent
            : profile.sentCount,
      }));
    case actionTypes.PROFILE_PAUSED:
    case actionTypes.PROFILE_UNPAUSED:
      return state.map(profile => ({
        ...profile,
        paused:
          profile.id === action.profileId
            ? action.type === actionTypes.PROFILE_PAUSED
            : profile.paused,
      }));
    case actionTypes.PUSHER_PROFILE_PAUSED_STATE:
      return state.map(profile => ({
        ...profile,
        paused:
          profile.id === action.profileId ? action.paused : profile.paused,
      }));
    default:
      return state;
  }
};

export const getEnabledProfiles = profiles =>
  profiles.filter(profile => !profile.disabled);

export default (state = initialState, action) => {
  let isSearchPopupVisible = false;
  let searchText = null;
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_START}`:
      // Ignore analyze specific actions so as not to flash loading state
      if (action.args && action.args.forAnalyze) {
        return state;
      }
      return {
        ...state,
        loading: true,
      };

    // TODO: remove this after full rollout of shared channels
    case `globalAccount_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        isLoadingGlobalAccount: true,
      };

    // TODO: remove this after full rollout of shared channels
    case `globalAccount_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const featureFlips = action.result.featureFlips || [];
      const hasSharedChannelsFlip = featureFlips.includes('sharedChannels');
      const { profilesUnfiltered } = state;
      const profileList = hasSharedChannelsFlip
        ? getEnabledProfiles(profilesUnfiltered)
        : profilesUnfiltered;

      return {
        ...state,
        isLoadingGlobalAccount: false,
        hasSharedChannelsFlip,
        profileList,
        profiles: filterProfilesByOrg(profileList, state.organization),
      };
    }

    // TODO: remove this after full rollout of shared channels
    case `globalAccount_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        isLoadingGlobalAccount: false,
      };

    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      // TODO: remove the feature flip check after full rollout of shared channels
      const { hasSharedChannelsFlip, isLoadingGlobalAccount } = state;
      const shouldFilter = hasSharedChannelsFlip || isLoadingGlobalAccount;
      const profiles = action.result;
      const profileList = shouldFilter
        ? getEnabledProfiles(profiles)
        : profiles;

      return {
        ...state,
        loading: false,
        loaded: true,
        profileList,
        profilesUnfiltered: filterProfilesByOrg(profiles, state.organization),
        profiles: filterProfilesByOrg(profileList, state.organization),
        hasInstagram: profileList.some(p => p.service === 'instagram'),
        hasFacebook: profileList.some(p => p.service === 'facebook'),
        hasTwitter: profileList.some(p => p.service === 'twitter'),
      };
    }
    case orgActionTypes.ORGANIZATION_SELECTED: {
      const selectedOrganization = action.selected;
      let { profiles } = state;

      if (profiles) {
        const { profileList } = state;
        profiles = filterProfilesByOrg(profileList, selectedOrganization);
      }

      return {
        ...state,
        organization: selectedOrganization,
        canReorderProfiles: selectedOrganization.canReorderProfiles,
        hasPinterestFeature: selectedOrganization.hasPinterestFeature,
        profiles,
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
      let { selectedProfile, profiles } = state;
      const { organization } = state;
      const isInCurrentOrganization =
        organization.id === action.result.organizationId;

      if (selectedProfile.id === action.result.id) {
        selectedProfile = action.result;
      }

      if (profiles.some(p => p.id === action.result.id)) {
        profiles = profiles.map(profile => {
          if (profile.id === action.result.id) {
            return action.result;
          }
          return profile;
        });
      } else if (isInCurrentOrganization) {
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
          profiles: handleProfileDropped(
            state.profiles,
            action,
            state.canReorderProfiles,
            state.hasPinterestFeature
          ),
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
        userId: action.result.id,
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
  handleProfileRouteLoaded: ({ selectedProfile, tabId }) => ({
    type: actionTypes.PROFILE_ROUTE_LOADED,
    selectedProfile,
    tabId,
  }),
};
