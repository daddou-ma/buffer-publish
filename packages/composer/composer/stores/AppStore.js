import { EventEmitter } from 'events';
import partition from 'lodash.partition';
import debounce from 'lodash.debounce';
import escapeRegExp from 'lodash.escaperegexp';
import moment from 'moment-timezone';
import { AppEnvironments } from '@bufferapp/publish-constants';
import AppDispatcher from '../dispatcher';
import {
  ActionTypes,
  AsyncOperationStates,
  Services,
  QueueingTypes,
  NotificationScopes,
} from '../AppConstants';
import ComposerStore from './ComposerStore';
import ComposerActionCreators from '../action-creators/ComposerActionCreators';
import AppActionCreators from '../action-creators/AppActionCreators';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';

const CHANGE_EVENT = 'change';

const getInitialState = () => ({
  profiles: [], // Data structure in getNewProfile()

  // Describe the application state
  appState: {
    isLoaded: false,
    expandedComposerId: null,
    expandedProfileSubprofileDropdownId: null,
    isDraftsSavePending: false,
    draftSaveQueueingType: null,
    isThumbnailLoading: false,
    isSavingPossible: false,
    whatPreventsSaving: [], // Data structure in getNewPreventsSavingObj()
    composersWhichHaveBeenCollapsed: new Set(),
    composersHaveBeenExpanded: false,
    twitterAutocompleBootstrapData: null, // Data struct in getNewTwitterAutocompleteBootstrapData()

    // Ids of profiles whose subprofile dropdowns we want to auto-expand
    profileSubprofileDropdownsIdsToExpand: [],
    // true if enabled, false if enabled then disabled thru "customize" button, null if unused
    isOmniboxEnabled: null,
    // Profile ids that were already saved from drafts that failed saving to all profiles
    partiallySavedDraftsProfilesIds: new Map(), // draft id <=> [savedProfileIds]
    domainsOwnedByFacebookPages: new Map(), // url <=> (profile id <=> isOwned)

    // Only show this notif once per session if soft-closed
    wasTwitterMaxOneProfileSelectedNotifClosedOnce: false,
    composerSidebarVisible: false,
  },

  userData: {}, // Data structure in getNewUserData()
  metaData: {},
  options: {},
  csrfToken: null,
  imageDimensionsKey: null,
});

let state = getInitialState();

// Register with Redux DevTools (uncomment to enable)
// registerStore('app', state);

/**
 * Reset the composer's contents, not metadata, so that it remains fully
 * usable but offers a clean slate to compose a new update.
 */
const softResetState = () => {
  // Data to preserve
  const {
    profiles,
    appState: {
      isLoaded,
      expandedComposerId,
      twitterAutocompleBootstrapData,
      domainsOwnedByFacebookPages,
      isOmniboxEnabled,
    },
    userData,
    metaData,
    options,
    csrfToken,
    imageDimensionsKey,
  } = state;

  const newState = getInitialState();
  const reEnableOmnibox = isOmniboxEnabled !== null;

  state = {
    ...newState,
    profiles,
    appState: {
      ...newState.appState,
      isLoaded,
      expandedComposerId,
      twitterAutocompleBootstrapData,
      domainsOwnedByFacebookPages,
      isOmniboxEnabled: reEnableOmnibox || newState.appState.isOmniboxEnabled,
    },
    userData,
    metaData,
    options,
    csrfToken,
    imageDimensionsKey,
  };
};

const getNewProfile = data => ({
  id: data.id,
  service: {
    name: data.serviceName,
    username: data.serviceUsername,
    formattedUsername: data.serviceFormattedUsername,
  },
  images: {
    avatar: data.imagesAvatar,
  },
  timezone: data.timezone,
  shouldBeAutoSelected: data.shouldBeAutoSelected,
  shouldShowGridPreview: data.shouldShowGridPreview,
  isSelected: false,
  isDisabled: data.isDisabled,
  disabledMessage: data.disabledMessage,
  subprofiles: data.subprofiles, // Data structure in getNewSubprofile()
  selectedSubprofileId: null,
  serviceType: data.serviceType,
  serviceId: data.serviceId,
  isBusinessProfile: data.isBusinessProfile,
  isContributor: data.isContributor,
  isManager: data.isManager,
  subprofilesOrignatedFromAPI: null,
  instagramDirectEnabled:
    data.instagramDirectEnabled && data.serviceName === 'instagram',
  canPostComment: data.canPostComment,
  hasPushNotifications: data.hasPushNotifications,
  profileHasPostingSchedule: data.profileHasPostingSchedule,
  // Profile-specific app state
  appState: {
    isSubprofileCreationPending: false,
  },
});

const getNewProfileGroup = ({ id, name, profileIds }) => ({
  id,
  name,
  profileIds,
});

const getNewUserData = data => ({
  id: data.id,
  s3UploadSignature: data.s3UploadSignature,
  uses24hTime: data.uses24hTime,
  profileGroups: data.profileGroups.map(getNewProfileGroup),
  isFreeUser: data.isFreeUser,
  isBusinessUser: data.isBusinessUser,
  weekStartsMonday: data.weekStartsMonday,
  shouldAlwaysSkipEmptyTextAlert: data.shouldAlwaysSkipEmptyTextAlert,
  profilesSchedulesSlots: data.profilesSchedulesSlots,
  onNewPublish: data.onNewPublish,
  hasSimplifiedFreePlanUX: data.hasSimplifiedFreePlanUX,
  hasIGDirectFlip: data.hasIGDirectFlip,
  hasIGLocationTaggingFeature: data.hasIGLocationTaggingFeature,
  hasIGDirectVideoFlip: data.hasIGDirectVideoFlip,
  canStartProTrial: data.canStartProTrial,
  hasRemindersFlip: data.hasRemindersFlip,
  isOnProTrial: data.isOnProTrial,
  hasShopgridFlip: data.hasShopgridFlip,
  hasAccessToUserTag: data.hasAccessToUserTag,
});

const getNewSubprofile = ({ avatar, id, name, isShared }) => ({
  avatar,
  id,
  name,
  isShared,
});

const getNewPreventsSavingObj = ({
  message,
  composerId = null,
  code = undefined,
}) => ({ message, composerId, code });

const getNewTwitterAutocompleteBootstrapData = ({ friends, profilesIds }) => ({
  friends,
  profilesIds,
});

const AppStore = Object.assign({}, EventEmitter.prototype, {
  emitChange: () => AppStore.emit(CHANGE_EVENT),
  addChangeListener: callback => AppStore.on(CHANGE_EVENT, callback),
  removeChangeListener: callback =>
    AppStore.removeListener(CHANGE_EVENT, callback),

  isExtension: () =>
    state.metaData.appEnvironment !== AppEnvironments.WEB_DASHBOARD,
  getAppState: () => state.appState,
  getUserData: () => state.userData,
  getMetaData: () => state.metaData,
  getOptions: () => state.options,
  getCsrfToken: () => state.csrfToken,
  getImageDimensionsKey: () => state.imageDimensionsKey,

  // Get all profiles if no param passed, or profiles matching a passed array of ids
  getProfiles: (ids = null) => {
    let profiles;

    if (ids === null) {
      profiles = state.profiles;
    } else {
      profiles = state.profiles
        .filter(profile => ids.includes(profile.id))
        .sort((profileA, profileB) =>
          ids.indexOf(profileA.id) < ids.indexOf(profileB.id) ? -1 : 1
        );
    }

    return profiles;
  },

  getProfileIds: () => AppStore.getProfiles().map(profile => profile.id),

  getProfilesForService: serviceName =>
    AppStore.getProfiles().filter(
      profile => profile.service.name === serviceName
    ),

  getSelectedProfiles: () =>
    state.profiles.filter(profile => profile.isSelected),

  hasProfilesSelected: () => state.profiles.some(profile => profile.isSelected),

  hasFBDraftWithNoText: () => {
    const emptyFacebookDrafts = ComposerStore.getEnabledDrafts().filter(
      draft =>
        draft.id === 'facebook' &&
        draft.editorState.getCurrentContent().getPlainText().length < 1
    );
    return emptyFacebookDrafts.length > 0;
  },

  getSelectedProfilesForService: serviceName =>
    AppStore.getSelectedProfiles().filter(
      profile => profile.service.name === serviceName
    ),

  getProfile: id => state.profiles.find(profile => profile.id === id),

  getProfileGroup: id =>
    state.userData.profileGroups.find(group => group.id === id),

  getServicesWithSelectedProfiles: () => {
    const selectedProfilesServicesNames = AppStore.getSelectedProfiles().map(
      profile => profile.service.name
    );

    const dedupedServicesNames = [...new Set(selectedProfilesServicesNames)];
    const selectedServices = dedupedServicesNames.map(serviceName =>
      Services.get(serviceName)
    );

    return selectedServices;
  },

  isTwitterAutocompleBootstrapDataLoaded: () =>
    state.appState.twitterAutocompleBootstrapData !== null,

  getMatchingTwitterAutocompleteBootstrapData: search => {
    const regExpCompatSearch = escapeRegExp(search);
    const searchRegex = new RegExp(regExpCompatSearch, 'i');

    return state.appState.twitterAutocompleBootstrapData.friends.filter(
      user =>
        user.screenName.startsWith(search) || searchRegex.test(user.fullName)
    );
  },

  getTwitterAutocompleteBootstrapDataProfilesIds: () =>
    state.appState.twitterAutocompleBootstrapData !== null
      ? state.appState.twitterAutocompleBootstrapData.profilesIds
      : [],

  /**
   * Returns:
   * - false if slot picking isn't available
   * - undefined if slots data for that day isn't available (yet)
   * - an array of slots for that day (empty if no slots)
   */
  getAvailableSchedulesSlotsForDay: timestamp => {
    const selectedProfiles = AppStore.getSelectedProfiles();
    const isSlotPickingAvailable = selectedProfiles.length === 1;
    if (!isSlotPickingAvailable) return false;

    const { id: profileId } = selectedProfiles[0];
    // eslint-disable-next-line no-use-before-define
    const localDateMoment = getProfileLocalTimeMoment(profileId, timestamp);

    // eslint-disable-next-line no-use-before-define
    return getProfileSlotsForDay(profileId, localDateMoment);
  },
});

// Checks whether a profile already exists, to prevent duplication
const isProfileUnique = profileData =>
  state.profiles.every(profile => profile.id !== profileData.id);

const createProfiles = profilesData => {
  profilesData.forEach(profileData => {
    if (isProfileUnique(profileData))
      state.profiles.push(getNewProfile(profileData));
  });
};

const createProfileGroup = groupData =>
  state.userData.profileGroups.push(getNewProfileGroup(groupData));

const updateProfileGroup = ({ id, name, profileIds }) => {
  const groupToUpdate = state.userData.profileGroups.find(
    group => group.id === id
  );

  Object.assign(groupToUpdate, {
    name,
    profileIds,
  });
};

const deleteProfileGroup = ({ id }) => {
  const index = state.userData.profileGroups.findIndex(
    group => group.id === id
  );
  state.userData.profileGroups.splice(index, 1);
};

const setDraftsSavingState = (
  savingState,
  queueingType = QueueingTypes.QUEUE
) => {
  switch (savingState) {
    case AsyncOperationStates.PENDING:
      state.appState.isDraftsSavePending = true;
      state.appState.draftSaveQueueingType = queueingType;
      break;

    case AsyncOperationStates.DONE:
      state.appState.isDraftsSavePending = false;
      break;

    default:
      break;
  }
};

// Auto-expand composer when only 1 profile is selected
const maybeAutoExpandComposer = () => {
  const activeServices = AppStore.getServicesWithSelectedProfiles();
  const hasOneActiveService = activeServices.length === 1;
  if (!hasOneActiveService || state.appState.isOmniboxEnabled) return;

  const activeService = activeServices[0];
  const composerId = activeService.name;
  ComposerActionCreators.expand(composerId);
};

// Make sure we always have fresh autocomplete bootstrap data for Twitter
const refreshTwitterAutocompleteBootstrapData = debounce(() => {
  if (!state.metaData.shouldUseNewTwitterAutocomplete) return;

  const selectedProfiles = AppStore.getSelectedProfilesForService('twitter');
  const firstTwo = selectedProfiles.slice(0, 2);
  if (firstTwo.length === 0) return;

  const firstTwoIds = firstTwo.map(profile => profile.id);
  const currentBootstrapDataProfilesIds = AppStore.getTwitterAutocompleteBootstrapDataProfilesIds();

  const shouldRefreshBootstrapData =
    currentBootstrapDataProfilesIds.length > firstTwoIds.length ||
    firstTwoIds.some(id => !currentBootstrapDataProfilesIds.includes(id));

  if (shouldRefreshBootstrapData) {
    AppActionCreators.refreshTwitterAutocompleteBootstrapData(firstTwoIds);
  }
}, 1000);

const refreshFacebookDomainOwnershipData = () => {
  if (!state.appState.isLoaded) return;

  // Don't check more than 5 pages to save on Facebook API request quota
  const maxPagesToCheckCount = 5;

  if (!ComposerStore.isDraftEnabled('facebook')) return;
  if (!ComposerStore.doesDraftHaveLinkAttachmentEnabled('facebook')) return;

  const selectedFacebookProfiles = AppStore.getSelectedProfilesForService(
    'facebook'
  );
  const selectedFacebookPages = selectedFacebookProfiles.filter(
    profile => profile.serviceType === 'page'
  );
  if (selectedFacebookPages.length > maxPagesToCheckCount) return;

  const selectedPages = selectedFacebookPages.slice(0, maxPagesToCheckCount);
  if (selectedPages.length === 0) return;

  const linkUrl = ComposerStore.getDraftLinkUrl('facebook');

  const domainOwnershipPerProfile =
    state.appState.domainsOwnedByFacebookPages.get(linkUrl) || new Map();

  const pendingRequestsCountForDomain = Array.from(
    domainOwnershipPerProfile.values()
  ).filter(isOwner => isOwner === null).length;
  if (pendingRequestsCountForDomain >= maxPagesToCheckCount) return;

  const selectedProfilesToQueryFacebookForOwnership = selectedPages.filter(
    ({ id }) => domainOwnershipPerProfile.get(id) === undefined
  );

  selectedProfilesToQueryFacebookForOwnership.forEach(({ id }) => {
    // eslint-disable-next-line no-use-before-define
    updateFacebookDomainOwnershipForPage(id, linkUrl, null);

    AppActionCreators.getFacebookDomainOwnershipForProfile(id, linkUrl);
  });
};

/**
 * Select profiles in place of user, by either opening dropdown for subprofile-enabled
 * networks, or actually selecting the profile straight away for other networks.
 */
const selectProfilesOnBehalfOfUser = (
  ids,
  markAppAsLoadedWhenDone = false,
  originatedFromGroupSelection = false
) => {
  const profilesToSelect = AppStore.getProfiles(ids);

  const [profilesWithSubprofiles, profilesWithoutSubprofiles] = partition(
    profilesToSelect,
    profile => profile.subprofiles.length > 0
  );

  const hasProfilesWithoutSubprofiles = profilesWithoutSubprofiles.length > 0;
  const hasProfilesWithSubprofiles = profilesWithSubprofiles.length > 0;

  if (hasProfilesWithoutSubprofiles) {
    const profilesIdsWithoutSubprofiles = profilesWithoutSubprofiles.map(
      profile => profile.id
    );
    AppActionCreators.selectProfiles(
      profilesIdsWithoutSubprofiles,
      markAppAsLoadedWhenDone,
      originatedFromGroupSelection
    );
  } else if (markAppAsLoadedWhenDone) {
    AppActionCreators.markAppAsLoaded();
  }

  if (hasProfilesWithSubprofiles) {
    const profilesIdsWithSubprofiles = profilesWithSubprofiles.map(
      profile => profile.id
    );
    AppActionCreators.queueProfileSubprofilesDropdownsIdsToExpand(
      profilesIdsWithSubprofiles
    );
  }
};

const selectProfile = (
  id,
  markAppAsLoadedWhenDone = false,
  originatedFromGroupSelection = false
) => {
  const profile = AppStore.getProfile(id);

  if (!profile) return;

  if (profile && profile.isSelected) {
    if (markAppAsLoadedWhenDone) AppActionCreators.markAppAsLoaded();
    return;
  }
  if (profile.isDisabled) return;

  const { enableTwitterChanges } = AppStore.getMetaData();

  // Select profile
  profile.isSelected = true;

  // Enable composer if the selected profile is the first selected for that service
  const serviceName = profile.service.name;
  const selectedProfilesForService = AppStore.getSelectedProfilesForService(
    serviceName
  );

  if (selectedProfilesForService.length === 1) {
    const composerId = serviceName;
    ComposerActionCreators.enable(composerId, markAppAsLoadedWhenDone);
    ComposerActionCreators.parseDraftTextLinks(composerId);
  } else if (markAppAsLoadedWhenDone) {
    AppActionCreators.markAppAsLoaded();
  }

  // Unselect previously selected profile if we're dealing with Twitter
  if (enableTwitterChanges) {
    if (serviceName === 'twitter' && selectedProfilesForService.length === 2) {
      const previousProfile = selectedProfilesForService.find(p => p.id !== id);
      previousProfile.isSelected = false;

      // Show max once per session
      if (!state.appState.wasTwitterMaxOneProfileSelectedNotifClosedOnce) {
        const notifScope = NotificationScopes.TWITTER_MAX_ONE_PROFILE_SELECTED;
        const notifMessage = originatedFromGroupSelection
          ? `Due to <a href="https://faq.buffer.com/article/937-publish-composer-one-twitter-account" target="_blank">recent changes with Twitter</a>, you're only able to post to one Twitter profile at a time. <b>So we've only selected ${profile.service.formattedUsername} Twitter profile from your group. <a href="/app/edit_groups" target="_blank">Click here to edit your group.</a></b>`
          : `Due to recent changes with Twitter, you're only able to post to one Twitter profile at a time, so <b>you are only posting to ${profile.service.formattedUsername}</b>. <a href="https://faq.buffer.com/article/937-publish-composer-one-twitter-account" target="_blank">Learn more about the changes</a>.`;

        NotificationActionCreators.removeAllNotificationsByScope(notifScope);
        NotificationActionCreators.queueInfo({
          scope: notifScope,
          message: notifMessage,
          onlyCloseOnce: true,
          showSoftAndHardCloseOptions: true,
        });
      }
    }
  }

  if (serviceName === 'twitter') refreshTwitterAutocompleteBootstrapData();
  if (serviceName === 'facebook') refreshFacebookDomainOwnershipData();
  if (serviceName === 'instagram')
    ComposerActionCreators.updateInstagramState();
};

const unselectProfile = id => {
  const profile = AppStore.getProfile(id);
  if (!profile.isSelected) return;

  const { enableTwitterChanges } = AppStore.getMetaData();

  // Unselect profile
  profile.isSelected = false;

  // Unselect subprofile if any (profiles can be unselected via unselectSubprofile() or directly)
  profile.selectedSubprofileId = null;

  // Disable composer if the unselected profile was the last selected for that service
  const serviceName = profile.service.name;
  const selectedProfilesCountForService = AppStore.getSelectedProfilesForService(
    serviceName
  ).length;

  if (selectedProfilesCountForService === 0) {
    const composerId = serviceName;
    ComposerActionCreators.disable(composerId);

    if (enableTwitterChanges) {
      if (serviceName === 'twitter') {
        const notifScope = NotificationScopes.TWITTER_MAX_ONE_PROFILE_SELECTED;
        NotificationActionCreators.removeAllNotificationsByScope(notifScope);
      }
    }
  }

  maybeAutoExpandComposer();

  if (serviceName === 'twitter') refreshTwitterAutocompleteBootstrapData();
  if (serviceName === 'facebook') refreshFacebookDomainOwnershipData();
  if (serviceName === 'instagram')
    ComposerActionCreators.updateInstagramState();
};

const selectSubprofile = (profileId, subprofileId) => {
  const profile = AppStore.getProfile(profileId);
  profile.selectedSubprofileId = subprofileId;

  AppActionCreators.selectProfile(profile.id);
};

const selectSubprofiles = (idsMap, markAppAsLoadedWhenDone = false) => {
  const profileIds = [];

  idsMap.forEach((subprofileId, profileId) => {
    const profile = AppStore.getProfile(profileId);
    profile.selectedSubprofileId = subprofileId;

    profileIds.push(profileId);
  });

  AppActionCreators.selectProfiles(profileIds, markAppAsLoadedWhenDone);
};

const unselectSubprofile = profileId => {
  const profile = AppStore.getProfile(profileId);
  profile.selectedSubprofileId = null;

  AppActionCreators.unselectProfile(profile.id);
};

// List of conditions to pass in order to be able to save the updates
// For perf reasons all the checks aren't run all the time, we try to fail as early
// as possible, though in some sitations it's useful to have multiple checks run
// to provide more complete feedback.
const checkIfSavingPossible = () => {
  // At least one profile should be selected
  if (!AppStore.hasProfilesSelected()) {
    return {
      isSavingPossible: false,
      whatPreventsSaving: [
        {
          message: 'At least one profile should be selected',
        },
      ],
    };
  }

  // Updates shouldn't be in the process of being saved
  if (state.appState.isDraftsSavePending) {
    return {
      isSavingPossible: false,
    };
  }
  // Updates shouldn't be saved while Instagram thumbnail is uploading
  if (state.appState.isThumbnailLoading) {
    return {
      isSavingPossible: false,
      whatPreventsSaving: [
        {
          message: 'Waiting for thumbnail to save..',
        },
      ],
    };
  }

  // Updates shouldn't have been saved already
  if (ComposerStore.areAllDraftsSaved()) {
    return {
      isSavingPossible: false,
      whatPreventsSaving: [
        {
          message: 'No more updates to be saved',
        },
      ],
    };
  }

  // Enabled drafts shouldn't be empty
  const invalidEnabledDraftsInfo = ComposerStore.getInvalidEnabledDraftsFeedback();
  const hasInvalidEnabledDrafts = invalidEnabledDraftsInfo.length > 0;

  // Enabled drafts shouldn't be above the optional character limit
  const enabledDrafts = ComposerStore.getEnabledDrafts();
  const enabledDraftsAboveCharLimit = enabledDrafts.filter(
    draft => draft.characterCount > draft.service.charLimit
  );
  const hasEnabledDraftsAboveCharLimit = enabledDraftsAboveCharLimit.length > 0;

  if (hasInvalidEnabledDrafts || hasEnabledDraftsAboveCharLimit) {
    return {
      isSavingPossible: false,
      whatPreventsSaving: Array.prototype.concat.call(
        enabledDraftsAboveCharLimit.map(draft => ({
          message: `We can only fit ${draft.service.charLimit} characters in this post`,
          composerId: draft.id,
          code: 1,
        })),
        ...invalidEnabledDraftsInfo.map(({ draft, messages }) =>
          messages.map(message => ({
            message,
            composerId: draft.id,
          }))
        )
      ),
    };
  }

  // Enabled drafts, if scheduled, should be scheduled for a time in the future
  const isSentPost = ComposerStore.isSentPost();
  const scheduledAt = isSentPost ? null : ComposerStore.getScheduledAt();
  const currentTimestampSeconds = Math.floor(Date.now() / 1000);
  if (scheduledAt !== null && scheduledAt <= currentTimestampSeconds) {
    return {
      isSavingPossible: false,
      whatPreventsSaving: [
        {
          message: 'The scheduled time seems to be in the past',
        },
      ],
    };
  }

  return { isSavingPossible: true };
};

const updateIsSavingPossible = () => {
  const { isSavingPossible, whatPreventsSaving = [] } = checkIfSavingPossible();

  state.appState.isSavingPossible = isSavingPossible;
  state.appState.whatPreventsSaving = whatPreventsSaving.map(what =>
    getNewPreventsSavingObj(what)
  );
};

const getExpandedComposerId = () => state.appState.expandedComposerId;

const setExpandedComposerId = id => {
  if (id !== null && typeof id !== 'undefined') {
    if (ComposerStore.isDraftLocked(id)) return;
  }
  state.appState.expandedComposerId = id;
};

const setComposersHaveBeenExpanded = () =>
  (state.appState.composersHaveBeenExpanded = true);

const expandProfileSubprofileDropdown = id => {
  state.appState.expandedProfileSubprofileDropdownId = id;

  const idIndex = state.appState.profileSubprofileDropdownsIdsToExpand.indexOf(
    id
  );
  const wasDropdownWaitingForExpansion = idIndex !== -1;

  if (wasDropdownWaitingForExpansion) {
    state.appState.profileSubprofileDropdownsIdsToExpand.splice(idIndex, 1);
  }
};

const setThumbnailLoading = isLoading => {
  state.appState.isThumbnailLoading = isLoading;
};

const collapseProfileSubprofileDropdown = id => {
  const isDropdownCurrentlyExpanded =
    state.appState.expandedProfileSubprofileDropdownId === id;
  if (!isDropdownCurrentlyExpanded) return;

  const dropdownIdsToExpand =
    state.appState.profileSubprofileDropdownsIdsToExpand;
  const shouldExpandOtherDropdowns = dropdownIdsToExpand.length > 0;

  if (shouldExpandOtherDropdowns) {
    const nextDropdownId = dropdownIdsToExpand[0];
    expandProfileSubprofileDropdown(nextDropdownId);
  } else {
    state.appState.expandedProfileSubprofileDropdownId = null;
  }
};

const queueProfileSubprofilesDropdownsIdsToExpand = ids => {
  const unselectedProfileIds = ids.filter(id => {
    const profile = AppStore.getProfile(id);
    return !profile.isSelected && !profile.isDisabled;
  });
  if (unselectedProfileIds.length === 0) return;

  state.appState.profileSubprofileDropdownsIdsToExpand.push(
    ...unselectedProfileIds
  );

  // Automatically expand first queued profile's subprofiles dropdown
  const firstUnselectedProfileId = unselectedProfileIds[0];
  expandProfileSubprofileDropdown(firstUnselectedProfileId);
};

const emptyProfileSubprofilesDropdownsIdsToExpand = () => {
  state.appState.profileSubprofileDropdownsIdsToExpand = [];
};

const setUserData = userData => (state.userData = getNewUserData(userData));
const setImageDimensionsKey = key => (state.imageDimensionsKey = key);
const setMetaData = metaData => (state.metaData = metaData);
const setOptions = options => (state.options = options);
const setCsrfToken = csrfToken => (state.csrfToken = csrfToken);

const setTwitterAutocompleteBootstrapData = (friends, profilesIds) => {
  state.appState.twitterAutocompleBootstrapData = getNewTwitterAutocompleteBootstrapData(
    { friends, profilesIds }
  );
};

const createNewSubprofile = (profileId, id, avatar, name, isShared) => {
  const profile = AppStore.getProfile(profileId);
  profile.subprofilesOrignatedFromAPI = false;
  const subprofile = getNewSubprofile({ avatar, id, name, isShared });
  profile.subprofiles.push(subprofile);
};

const refreshSubprofileData = (subprofiles, profileId) => {
  const profile = AppStore.getProfile(profileId);
  if (profile.subprofiles.length < subprofiles.length) {
    profile.subprofilesOrignatedFromAPI = true;
  }
  profile.subprofiles = subprofiles.map(subprofile =>
    getNewSubprofile(subprofile)
  );
};

const setProfileSubprofileCreationState = (profileId, creationState) => {
  const profile = AppStore.getProfile(profileId);

  switch (creationState) {
    case AsyncOperationStates.PENDING:
      profile.appState.isSubprofileCreationPending = true;
      break;

    case AsyncOperationStates.DONE:
      profile.appState.isSubprofileCreationPending = false;
      break;

    default:
      break;
  }
};

const selectGroupProfiles = id => {
  const { profileIds: profilesIdsToSelect } = AppStore.getProfileGroup(id);
  // TODO: refactor the call below to an object wiht optional props rather than mult. params
  AppActionCreators.selectProfilesOnBehalfOfUser(
    profilesIdsToSelect,
    undefined,
    true
  );
};

const unselectGroupProfiles = (id, selectedProfileGroupsIds) => {
  const group = AppStore.getProfileGroup(id);
  // Remove the unselected group's id from the list of selected groups' ids
  const unselectedGroupIndex = selectedProfileGroupsIds.indexOf(id);
  selectedProfileGroupsIds.splice(unselectedGroupIndex, 1);

  // Get all the profile ids from unique groups
  const selectedProfileIdsFromUniqueGroups = selectedProfileGroupsIds.reduce(
    (reducedUniqueGroupsProfileIds, selectedGroupId) => {
      const selectedGroup = AppStore.getProfileGroup(selectedGroupId);
      reducedUniqueGroupsProfileIds =
        selectedGroup.profileIds.length === group.profileIds.length &&
        selectedGroup.profileIds.every(item => group.profileIds.includes(item))
          ? reducedUniqueGroupsProfileIds
          : reducedUniqueGroupsProfileIds.concat(selectedGroup.profileIds);
      return reducedUniqueGroupsProfileIds;
    },
    []
  );

  // Unselect this group's profiles that aren't selected as part of another group,
  const profilesIdsToUnselect = group.profileIds.reduce(
    (reducedProfilesIdsToUnselect, profileIdToUnselect) =>
      selectedProfileIdsFromUniqueGroups.includes(profileIdToUnselect)
        ? reducedProfilesIdsToUnselect
        : reducedProfilesIdsToUnselect.concat(profileIdToUnselect),
    []
  );
  AppActionCreators.unselectProfiles(profilesIdsToUnselect);
};

const toggleAllProfiles = () => {
  const profiles = AppStore.getProfiles();

  const [selectedProfiles, unselectedProfiles] = partition(
    profiles,
    profile => profile.isSelected
  );

  const hasSelectedProfiles = selectedProfiles.length > 0;

  if (hasSelectedProfiles) {
    const selectedProfilesIds = selectedProfiles.map(profile => profile.id);
    AppActionCreators.unselectProfiles(selectedProfilesIds);
    AppActionCreators.emptyProfileSubprofilesDropdownsIdsToExpand();
  } else {
    // Preserve last active composer's contents, if it's not empty, by making its profiles
    // the first profiles to be selected (and thus its composer the first to be enabled)
    const { lastInteractedWithComposerId } = ComposerStore.getMeta();
    const unselectedProfilesIds = unselectedProfiles
      .sort(profile =>
        profile.service.name === lastInteractedWithComposerId ? -1 : 1
      )
      .map(profile => profile.id);
    AppActionCreators.selectProfilesOnBehalfOfUser(unselectedProfilesIds);
  }
};

const markPreviouslyExpandedComposerAsCollapsed = () => {
  const expandedComposerId = state.appState.expandedComposerId;
  const wasOneComposerPreviouslyExpanded = expandedComposerId !== null;

  if (wasOneComposerPreviouslyExpanded && !state.appState.isOmniboxEnabled) {
    state.appState.composersWhichHaveBeenCollapsed.add(expandedComposerId);
  }
};

const collapseComposer = () => {
  if (AppStore.getServicesWithSelectedProfiles().length === 1) return;

  markPreviouslyExpandedComposerAsCollapsed();
  setExpandedComposerId(null);
};

const markAppAsLoaded = () => {
  state.appState.isLoaded = true;

  // Run this on load, then profile selection / link attachment change events take over
  refreshFacebookDomainOwnershipData();
};

const markAppAsNotLoaded = () => {
  state.appState.isLoaded = false;
};

// There's a CORS error when trying to reset the s3UploadSignature. Leaving signature
// as is until refresh
const resetUserData = userData => {
  Object.keys(userData).forEach(key => {
    if (key !== 's3UploadSignature' || key !== 's3_upload_signature') {
      state.userData[key] = userData[key];
    }
  });
};

const updateOmniboxState = isEnabled => {
  state.appState.isOmniboxEnabled = isEnabled;
};

const updatePartiallySavedDraftsProfilesIds = partiallySavedDrafts => {
  const { partiallySavedDraftsProfilesIds } = state.appState;

  // Merge each draft's previous profiles ids with new ones
  partiallySavedDrafts.forEach(({ draftId, profilesIds }) => {
    partiallySavedDraftsProfilesIds.set(draftId, [
      ...(partiallySavedDraftsProfilesIds.get(draftId) || []),
      ...profilesIds,
    ]);
  });
};

const getProfileLocalTimeMoment = (profileId, timestamp) => {
  const profile = AppStore.getProfile(profileId);

  let localMoment = moment.unix(timestamp);
  if (profile.timezone) localMoment = localMoment.tz(profile.timezone);

  return localMoment;
};

const getProfileSlotsForDay = (profileId, localDateMoment) => {
  const { userData } = state;

  if (!userData.profilesSchedulesSlots) return undefined;

  const profilesSchedulesSlots = userData.profilesSchedulesSlots[profileId];
  const dateString = localDateMoment.format('YYYY-MM-DD');

  return profilesSchedulesSlots[dateString];
};

/**
 * The initial data that bookmarklet.php boostraps the app with only has slot
 * data available for a limited number of days. Whenever we might need more
 * slot data (scheduledAt or profile changed), make sure we have it!
 */
const ensureProfileSchedulesSlotsDataIsAvailableForDate = (
  timestamp = null
) => {
  const selectedProfiles = AppStore.getSelectedProfiles();
  let isSlotPickingAvailable = selectedProfiles.length === 1;
  if (!isSlotPickingAvailable) return;

  if (timestamp === null) {
    timestamp = ComposerStore.getScheduledAt();
    isSlotPickingAvailable = timestamp !== null;

    if (!isSlotPickingAvailable) return;
  }

  const { id: profileId } = selectedProfiles[0];
  const localDateMoment = getProfileLocalTimeMoment(profileId, timestamp);

  const firstDayOfMonthMoment = localDateMoment.clone().startOf('month');
  const lastDayOfMonthMoment = localDateMoment.clone().endOf('month');
  const profileSlotsForFirstDayOfMonth = getProfileSlotsForDay(
    profileId,
    firstDayOfMonthMoment
  );
  const profileSlotsForLastDayOfMonth = getProfileSlotsForDay(
    profileId,
    lastDayOfMonthMoment
  );

  const isSlotDataForMonthMissing =
    typeof profileSlotsForFirstDayOfMonth === 'undefined' ||
    typeof profileSlotsForLastDayOfMonth === 'undefined';

  // Fetch more data from API if we're missing data for this month
  if (isSlotDataForMonthMissing) {
    AppActionCreators.getProfileSlotDataForMonth(profileId, localDateMoment);
  }
};

const updateProfileSchedulesSlots = (id, slots = {}) => {
  const { profilesSchedulesSlots } = state.userData;
  if (profilesSchedulesSlots) {
    if (!profilesSchedulesSlots.hasOwnProperty(id))
      profilesSchedulesSlots[id] = {};
    const profileSchedulesSlots = profilesSchedulesSlots[id];

    const addDaySlotsToProfileSchedulesSlots = dayString => {
      profileSchedulesSlots[dayString] = slots[dayString];
    };

    Object.keys(slots).forEach(addDaySlotsToProfileSchedulesSlots);
  }
};

const updateFacebookDomainOwnershipForPage = (id, url, isOwner) => {
  let domainData = state.appState.domainsOwnedByFacebookPages.get(url);

  if (domainData === undefined) {
    domainData = new Map();
    state.appState.domainsOwnedByFacebookPages.set(url, domainData);
  }

  domainData.set(id, isOwner);
};

const resetProfilesData = profilesData => {
  AppActionCreators.updateOmniboxState(null);
  AppActionCreators.unselectProfiles(
    AppStore.getSelectedProfiles().map(({ id }) => id)
  );
  const profilesToSelect = profilesData.filter(
    profile => profile.shouldBeAutoSelected
  );
  state.appState.composersWhichHaveBeenCollapsed = new Set();

  if (profilesToSelect) {
    AppActionCreators.selectProfilesOnBehalfOfUser(
      profilesToSelect.map(profile => profile.id),
      true
    );
  }
};

const onDispatchedPayload = payload => {
  const action = payload.action;
  let isPayloadInteresting = true;

  switch (action.actionType) {
    case ActionTypes.COMPOSER_CREATE_PROFILES:
      createProfiles(action.profilesData);
      break;

    case ActionTypes.COMPOSER_SAVE_DRAFTS:
      setDraftsSavingState(
        AsyncOperationStates.PENDING,
        action.data.queueingType
      );
      break;

    case ActionTypes.APP_SELECT_SUBPROFILE:
      selectSubprofile(action.profileId, action.subprofileId);
      collapseProfileSubprofileDropdown(action.profileId);
      break;

    case ActionTypes.APP_SELECT_SUBPROFILES:
      selectSubprofiles(action.idsMap, action.markAppAsLoadedWhenDone);
      action.idsMap.forEach((subprofileId, profileId) => {
        collapseProfileSubprofileDropdown(profileId);
      });
      break;

    case ActionTypes.APP_UNSELECT_SUBPROFILE:
      unselectSubprofile(action.profileId, action.subprofileId);
      collapseProfileSubprofileDropdown(action.profileId);
      break;

    case ActionTypes.APP_UPDATE_OMNIBOX_STATE:
      updateOmniboxState(action.isEnabled);
      break;

    case ActionTypes.APP_UPDATE_PARTIALLY_SAVED_DRAFTS_PROFILES_IDS:
      updatePartiallySavedDraftsProfilesIds(action.partiallySavedDrafts);
      break;

    case ActionTypes.COMPOSER_RECEIVE_SAVED_DRAFTS:
      setDraftsSavingState(AsyncOperationStates.DONE);
      break;

    case ActionTypes.COMPOSER_SELECT_PROFILES_ON_BEHALF_OF_USER:
      selectProfilesOnBehalfOfUser(
        action.ids,
        action.markAppAsLoadedWhenDone,
        action.originatedFromGroupSelection
      );
      break;

    case ActionTypes.COMPOSER_SELECT_PROFILE:
      selectProfile(action.id);
      maybeAutoExpandComposer();
      ensureProfileSchedulesSlotsDataIsAvailableForDate();
      break;

    case ActionTypes.COMPOSER_SELECT_PROFILES:
      action.ids.forEach((id, i) => {
        const markAppAsLoadedWhenDone =
          action.markAppAsLoadedWhenDone && i === 0;
        selectProfile(
          id,
          markAppAsLoadedWhenDone,
          action.originatedFromGroupSelection
        );
      });
      maybeAutoExpandComposer();
      ensureProfileSchedulesSlotsDataIsAvailableForDate();
      break;

    case ActionTypes.COMPOSER_UNSELECT_PROFILE:
      unselectProfile(action.id);
      ensureProfileSchedulesSlotsDataIsAvailableForDate();
      break;

    case ActionTypes.COMPOSER_UNSELECT_PROFILES:
      action.ids.forEach(unselectProfile);
      ensureProfileSchedulesSlotsDataIsAvailableForDate();
      break;

    case ActionTypes.COMPOSER_QUEUE_PROFILES_SUBPROFILES_DROPDOWNS_TO_EXPAND:
      queueProfileSubprofilesDropdownsIdsToExpand(action.ids);
      break;

    case ActionTypes.COMPOSER_EMPTY_PROFILES_SUBPROFILES_DROPDOWNS_TO_EXPAND:
      emptyProfileSubprofilesDropdownsIdsToExpand();
      break;

    case ActionTypes.COMPOSER_EXPAND:
      markPreviouslyExpandedComposerAsCollapsed();
      setExpandedComposerId(action.id);
      setComposersHaveBeenExpanded();
      break;

    // We consider a composer's contents saved when it's collapsed
    case ActionTypes.COMPOSER_COLLAPSE:
      collapseComposer();
      break;

    // Ensure a disabled composer doesn't remain expanded
    case ActionTypes.COMPOSER_DISABLE:
      if (getExpandedComposerId() === action.id) setExpandedComposerId(null);
      break;

    case ActionTypes.APP_RECEIVE_USER_DATA:
      setUserData(action.userData);
      break;
    case ActionTypes.APP_RECEIVE_IMAGE_DIMENSIONS_KEY:
      setImageDimensionsKey(action.imageDimensionsKey);
      break;

    case ActionTypes.APP_RECEIVE_METADATA:
      setMetaData(action.metaData);
      break;

    case ActionTypes.APP_RECEIVE_OPTIONS:
      setOptions(action.options);
      break;

    case ActionTypes.APP_RECEIVE_CSRF_TOKEN:
      setCsrfToken(action.csrfToken);
      break;

    case ActionTypes.APP_RECEIVE_TWITTER_AUTOCOMPLETE_BOOTSTRAP_DATA:
      setTwitterAutocompleteBootstrapData(action.friends, action.profilesIds);
      break;

    case ActionTypes.COMPOSER_EXPAND_PROFILE_SUBPROFILE_DROPDOWN:
      expandProfileSubprofileDropdown(action.id);
      break;

    case ActionTypes.COMPOSER_COLLAPSE_PROFILE_SUBPROFILE_DROPDOWN:
      collapseProfileSubprofileDropdown(action.id);
      break;

    case ActionTypes.COMPOSER_CREATE_NEW_SUBPROFILE:
      createNewSubprofile(
        action.profileId,
        action.subprofileId,
        action.avatar,
        action.name,
        action.isShared
      );
      setProfileSubprofileCreationState(
        action.profileId,
        AsyncOperationStates.DONE
      );
      break;

    case ActionTypes.APP_REFRESH_SUBPROFILE_DATA:
      refreshSubprofileData(action.subprofileData, action.profileId);
      break;

    case ActionTypes.COMPOSER_CREATE_NEW_SUBPROFILE_FAILED:
      setProfileSubprofileCreationState(
        action.profileId,
        AsyncOperationStates.DONE
      );
      break;

    case ActionTypes.COMPOSER_CREATE_NEW_SUBPROFILE_PENDING:
      setProfileSubprofileCreationState(
        action.profileId,
        AsyncOperationStates.PENDING
      );
      break;

    case ActionTypes.APP_SELECT_GROUP_PROFILES:
      selectGroupProfiles(action.id);
      break;

    case ActionTypes.APP_UNSELECT_GROUP_PROFILES:
      unselectGroupProfiles(action.id, action.selectedProfileGroupsIds);
      break;

    case ActionTypes.APP_TOGGLE_ALL_PROFILES:
      toggleAllProfiles();
      break;

    case ActionTypes.COMPOSER_PROFILE_GROUP_CREATED:
      createProfileGroup(action.groupData);
      break;

    case ActionTypes.COMPOSER_PROFILE_GROUP_UPDATED:
      updateProfileGroup(action.groupData);
      break;

    case ActionTypes.APP_SET_THUMBNAIL_LOADING:
      setThumbnailLoading(action.isLoading);
      break;

    case ActionTypes.COMPOSER_PROFILE_GROUP_DELETED:
      deleteProfileGroup(action.groupData);
      break;

    case ActionTypes.APP_LOADED:
      markAppAsLoaded();
      break;

    case ActionTypes.APP_RESET:
      state = getInitialState();
      break;

    case ActionTypes.APP_SOFT_RESET:
      softResetState();
      break;

    case ActionTypes.COMPOSER_UPDATE_DRAFTS_SCHEDULED_AT:
      ensureProfileSchedulesSlotsDataIsAvailableForDate(action.scheduledAt);
      break;

    case ActionTypes.APP_REMEMBER_TWITTER_MAX_PROFILE_NOTIF_CLOSED_ONCE:
      state.appState.wasTwitterMaxOneProfileSelectedNotifClosedOnce = true;
      break;

    case ActionTypes.APP_RECEIVE_PROFILE_SLOT_DATA:
      updateProfileSchedulesSlots(action.id, action.slots);
      break;

    case ActionTypes.APP_REFRESH_FACEBOOK_DOMAIN_OWNERSHIP_DATA:
      refreshFacebookDomainOwnershipData();
      break;

    case ActionTypes.APP_RECEIVE_FACEBOOK_DOMAIN_OWNERSHIP_DATA:
      updateFacebookDomainOwnershipForPage(
        action.profileId,
        action.url,
        action.isOwner
      );
      break;

    case ActionTypes.COMPOSER_ENABLE:
      if (action.id === 'facebook') refreshFacebookDomainOwnershipData();
      break;

    case ActionTypes.RESET_PROFILES_DATA:
      resetProfilesData(action.profilesData);
      break;

    case ActionTypes.APP_NOT_LOADED:
      markAppAsNotLoaded();
      break;

    case ActionTypes.RESET_USER_DATA:
      resetUserData(action.userData);
      break;

    /**
     * Changes that have an impact on state.appState.isSavingPossible and happening
     * outside of a composer's expanded state need to dispatch actions that we'll
     * explicitly listen to here in order to react to those changes. Same applies
     * to changes that'd require App to re-render, we need to listen to those too.
     */
    case ActionTypes.COMPOSER_DRAFT_ATTACHMENT_TOGGLED:
    case ActionTypes.COMPOSER_UPDATE_DRAFT_CHARACTER_COUNT:
    case ActionTypes.COMPOSER_UPDATE_DRAFT_COMMENT_CHARACTER_COUNT:
    case ActionTypes.COMPOSER_UPDATE_DRAFT_SOURCE_LINK:
    case ActionTypes.COMPOSER_UPDATE_DRAFTS_SOURCE_LINK:
    case ActionTypes.COMPOSER_UPDATE_DRAFT_SOURCE_LINK_DATA:
    case ActionTypes.PROFILE_DROPDOWN_HIDDEN:
    case ActionTypes.UPDATE_DRAFT_HAS_SAVING_ERROR:
      isPayloadInteresting = true;
      break;

    case ActionTypes.COMPOSER_UPDATE_TOGGLE_SIDEBAR:
      state.appState.composerSidebarVisible = action.composerSidebarVisible;
      isPayloadInteresting = true;
      break;

    default:
      isPayloadInteresting = false;
      break;
  }

  if (isPayloadInteresting) {
    updateIsSavingPossible();
    AppStore.emitChange();
  }

  // (uncomment to enable Redux DevTools)
  // sendToMonitor('app', action, state);
};

AppDispatcher.register(onDispatchedPayload);

export default AppStore;
