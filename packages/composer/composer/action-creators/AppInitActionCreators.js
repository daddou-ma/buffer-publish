import cloneDeep from 'lodash.clonedeep';
import twitterText from 'twitter-text';
import AppDispatcher from '../dispatcher';
import {
  ActionTypes,
  AttachmentTypes,
  NotificationScopes,
} from '../AppConstants';
import AppHooks from '../utils/LifecycleHooks';
import AppActionCreators from './AppActionCreators';
import NotificationActionCreators from './NotificationActionCreators';
import { getFileTypeFromPath } from '../utils/StringUtils';
import { getStillDataUriFromGif } from '../utils/DOMUtils';
import AppStore from '../stores/AppStore';
import { observeStore } from '../utils/StoreUtils';
import WebAPIUtils from '../utils/WebAPIUtils';

const loadInitialProfilesData = (profilesData, options) => {
  const autoSelectedProfiles = profilesData.filter(
    profile => profile.shouldBeAutoSelected && !profile.isDisabled
  );
  const autoSelectedProfilesIds = autoSelectedProfiles.map(
    profile => profile.id
  );
  const autoSelectedProfilesSubprofilesIds = new Map();
  const hasAutoSelectedProfilesIds = autoSelectedProfilesIds.length > 0;
  const hasOnlyOneProfileConnected = profilesData.length === 1;

  /**
   * If we can't select profiles (and thus don't have access to the manual flow
   * for selecting subprofiles), make sure that whichever profile is auto-selected
   * also has an auto-selected subprofile.
   */
  const shouldEnsureAllSelectedProfilesHaveSubprofileSelected = !options.canSelectProfiles;
  if (shouldEnsureAllSelectedProfilesHaveSubprofileSelected) {
    profilesData.forEach(profile => {
      const hasSubprofiles = profile.subprofiles.length > 0;
      if (!profile.shouldBeAutoSelected || !hasSubprofiles) return;

      const doesProfileHaveSelectedSubprofile = profile.subprofiles.some(
        subprofile => subprofile.shouldBeAutoSelected
      );
      const shouldAutoSelectFirstSubprofile = !doesProfileHaveSelectedSubprofile;

      if (shouldAutoSelectFirstSubprofile)
        profile.subprofiles[0].shouldBeAutoSelected = true;
    });
  }

  autoSelectedProfiles.forEach(profile => {
    const hasSubprofiles = profile.subprofiles.length > 0;
    const profileId = profile.id;

    if (hasSubprofiles) {
      const autoSelectedSubprofile = profile.subprofiles.find(
        subprofile => subprofile.shouldBeAutoSelected
      );
      const hasAutoSelectedSubprofile =
        typeof autoSelectedSubprofile !== 'undefined';

      if (hasAutoSelectedSubprofile) {
        autoSelectedProfilesSubprofilesIds.set(
          profileId,
          autoSelectedSubprofile.id
        );
      }
    }
  });

  const hasAutoSelectedSubprofiles =
    autoSelectedProfilesSubprofilesIds.size > 0;

  AppDispatcher.handleViewAction({
    actionType: ActionTypes.COMPOSER_CREATE_PROFILES,
    profilesData,
  });

  if (hasAutoSelectedProfilesIds) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_SELECT_PROFILES_ON_BEHALF_OF_USER,
      ids: autoSelectedProfilesIds,
      markAppAsLoadedWhenDone: true,
    });
  } else if (hasOnlyOneProfileConnected) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_SELECT_PROFILES_ON_BEHALF_OF_USER,
      ids: [profilesData[0].id],
      markAppAsLoadedWhenDone: true,
    });
  } else if (!hasAutoSelectedSubprofiles) {
    AppActionCreators.markAppAsLoaded();
  }

  if (hasAutoSelectedSubprofiles) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_SELECT_SUBPROFILES,
      idsMap: autoSelectedProfilesSubprofilesIds,
      markAppAsLoadedWhenDone: true,
    });
  }
};

const loadInitialUserData = userData => {
  AppDispatcher.handleViewAction({
    actionType: ActionTypes.APP_RECEIVE_USER_DATA,
    userData,
  });
};

const loadInitialOrganizationsData = organizationsData => {
  AppDispatcher.handleViewAction({
    actionType: ActionTypes.APP_RECEIVE_ORGANIZATIONS_DATA,
    organizationsData,
  });
};

const loadInitialImageDimensionsKey = imageDimensionsKey => {
  AppDispatcher.handleViewAction({
    actionType: ActionTypes.APP_RECEIVE_IMAGE_DIMENSIONS_KEY,
    imageDimensionsKey,
  });
};

const dispatchAutoUploadedImage = image =>
  new Promise(resolve => {
    const isGif = getFileTypeFromPath(image.picture) === 'gif';

    if (isGif) {
      getStillDataUriFromGif(image.picture)
        .then(dataUri => {
          AppDispatcher.handleViewAction({
            actionType: ActionTypes.COMPOSER_ADD_DRAFTS_AUTO_UPLOADED_GIF,
            url: image.picture,
            stillGifUrl: dataUri,
          });
          resolve();
        })
        .catch(() => {
          AppDispatcher.handleViewAction({
            actionType: ActionTypes.COMPOSER_ADD_DRAFTS_AUTO_UPLOADED_GIF,
            url: image.picture,
            stillGifUrl: null,
          });
          resolve();
        });
    } else {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ADD_DRAFTS_AUTO_UPLOADED_IMAGE,
        url: image.picture,
        altText: image.alt_text,
      });
      resolve();
    }
  });

const loadInitialOptions = options => {
  AppDispatcher.handleViewAction({
    actionType: ActionTypes.APP_RECEIVE_OPTIONS,
    options,
  });
};

const loadInitialMetaData = metaData => {
  // Dispatch all metadata
  AppDispatcher.handleViewAction({
    actionType: ActionTypes.APP_RECEIVE_METADATA,
    metaData,
  });

  // Create more specific actions for interesting bits of metadata
  if (metaData.retweetData) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ADD_DRAFTS_RETWEET,
      retweetData: metaData.retweetData,
    });

    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ENABLE_DRAFTS_ATTACHMENT,
      type: AttachmentTypes.RETWEET,
    });
  }

  const hasRetweetComment =
    metaData.retweetData && metaData.retweetData.comment;
  if (metaData.text || metaData.url || metaData.via || hasRetweetComment) {
    let text = metaData.text || '';
    if (hasRetweetComment)
      text = `${metaData.retweetData.comment} ${text}`.trim();

    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_SET_DRAFTS_INITIAL_TEXT,
      text,
      url: metaData.url,
      facebookMentionEntities: metaData.facebookMentionEntities,
      via: metaData.via,
      composerInitiator: metaData.composerInitiator,
      isPrefillingExistingUpdate: metaData.isPrefillingExistingUpdate,
      isEditing: metaData.updateId !== null,
    });

    observeStore(AppStore, store => store.getAppState().isLoaded).then(() => {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_PARSE_DRAFTS_TEXT_LINKS,
      });
    });
  }

  const initialUrlsInText = metaData.text
    ? twitterText
        .extractUrlsWithIndices(metaData.text)
        .map(urlWithIndices => urlWithIndices.url)
    : null;
  const initialUrl =
    metaData.url || (initialUrlsInText && initialUrlsInText[0]);

  // Don't auto-attach link when importing an update to edit that didn't
  // have a link attached in the first place
  const isEditingUpdate = metaData.updateId !== null;
  const preventAutoAttachingLink =
    isEditingUpdate && metaData.linkData === null;

  if (initialUrl) {
    // If we haven't auto-attached a link on init, also prevent that same link
    // from expanding automatically later on
    if (preventAutoAttachingLink) {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_DRAFTS_PREVENT_AUTO_ATTACHING_URLS,
        urls: initialUrlsInText,
      });
    } else {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_LINK_DATA,
        linkData: { url: initialUrl },
        meta: {
          isNewLinkAttachment: true,
          comesFromDirectUserAction: false,
        },
      });

      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ENABLE_DRAFTS_ATTACHMENT,
        type: AttachmentTypes.LINK,
      });
    }
  }

  if (metaData.linkData) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_LINK_DATA,
      linkData: metaData.linkData,
      meta: {
        isNewLinkAttachment: true,
        comesFromDirectUserAction: false,
      },
    });

    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ENABLE_DRAFTS_ATTACHMENT,
      type: AttachmentTypes.LINK,
    });
  }

  if (metaData.sourceUrl || initialUrl) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_SOURCE_LINK,
      url: metaData.sourceUrl || metaData.url,
    });
  }

  if (metaData.userTags) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_IMAGE_USER_TAGS,
      userTags: metaData.userTags,
    });
  }

  if (metaData.campaignDetails) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_CAMPAIGN_ID,
      campaignId: metaData.campaignDetails.id,
    });
  }

  if (metaData.locationId && metaData.locationName) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_LOCATION,
      locationId: metaData.locationId,
      locationName: metaData.locationName,
    });
  }

  if (metaData.commentEnabled) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_TOGGLE_COMMENT,
      commentEnabled: metaData.commentEnabled,
    });
  }

  if (metaData.commentText) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_COMMENT,
      commentText: metaData.commentText,
    });
  }

  if (metaData.shopgridLink) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_SHOPGRID_LINK,
      shopgridLink: metaData.shopgridLink,
    });
  }

  if (metaData.isTaggingPageLocation) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_IS_TAGGING_PAGE_LOCATION,
      isTaggingPageLocation: metaData.isTaggingPageLocation,
    });
  }

  if (metaData.images) {
    const dispatches = metaData.images.map(image =>
      dispatchAutoUploadedImage(image)
    );

    // TODO: Instead of blocking on dispatchAutoUploadedImage(), we could dispatch instantly,
    // and dispatch one more time once stillGifUrl has been generated, like dimensions below
    Promise.all(dispatches).then(() => {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ENABLE_DRAFTS_ATTACHMENT,
        type: AttachmentTypes.MEDIA,
      });

      // TODO: this call to observeStore() could probably be moved to WebAPIUtils
      // where there are store queries that actually depend on it
      observeStore(AppStore, store => store.getAppState().isLoaded).then(() => {
        metaData.images.forEach(image => {
          WebAPIUtils.getImageDimensions({
            url: image.picture,
            key: AppStore.getImageDimensionsKey(),
            user_id: AppStore.getUserData().id,
          }).then(({ width, height }) => {
            AppDispatcher.handleViewAction({
              actionType: ActionTypes.COMPOSER_UPDATE_UPLOADED_IMAGE_DIMENSIONS,
              url: image.picture,
              width,
              height,
            });
          });
        });
      });
    });
  }

  if (metaData.shouldShowRolloutTooltip) {
    NotificationActionCreators.queueInfo({
      scope: NotificationScopes.MC_ROLLOUT_INFO,
      message: `<h4>Add a personal touch</h4>
                You can now customize your messages for each network when using the
                Buffer dashboard. Feel free to make each one personal and unique!`,
      onlyCloseOnce: true,
    });
  }

  if (metaData.video) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ADD_DRAFTS_AUTO_UPLOADED_VIDEO,
      video: metaData.video,
    });

    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ENABLE_DRAFTS_ATTACHMENT,
      type: AttachmentTypes.MEDIA,
    });
  }

  if (metaData.scheduledAt !== null || metaData.isPinnedToSlot !== null) {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_SCHEDULED_AT,
      scheduledAt: metaData.scheduledAt,
      isPinnedToSlot: metaData.isPinnedToSlot,
    });
  }
};

const loadInitialCsrfToken = csrfToken => {
  AppDispatcher.handleViewAction({
    actionType: ActionTypes.APP_RECEIVE_CSRF_TOKEN,
    csrfToken,
  });
};

const AppInitActionCreators = {
  resetData: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_RESET,
    });
  },

  resetOrganizationsData: organizationsData => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.RESET_ORGANIZATIONS_DATA,
      organizationsData,
    });
  },

  /**
   * The dispatching of success notifications is delayed by two cycles in
   * AppActionCreators.js#saveDrafts, so we need to delay the resetting by two
   * cycles too so that it's dispatched after new notifications are dispatched.
   */
  softResetData: () =>
    setImmediate(() =>
      setImmediate(() => {
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.APP_SOFT_RESET,
        });
      })
    ),

  /**
   * This is the only data entry point in the app: deep clone all objects to
   * prevent leaking any store mutations to the props storing this initial data.
   * This ensures that there's no leak when resetting stores' states and
   * re-initializing them with the props' initial data.
   * Everything gets deep-cloned: no assumption is made about the shape and depth
   * of an object for future-proofness.
   */
  loadInitialData: ({
    profilesData,
    organizationsData,
    userData,
    metaData,
    csrfToken,
    imageDimensionsKey,
    options,
    onNewPublish,
  }) => {
    const clonedMetaData = cloneDeep(metaData);
    const clonedOptions = cloneDeep(options);

    loadInitialCsrfToken(cloneDeep(csrfToken));
    loadInitialImageDimensionsKey(cloneDeep(imageDimensionsKey));
    loadInitialMetaData(clonedMetaData);
    loadInitialOptions(clonedOptions);
    loadInitialProfilesData(cloneDeep(profilesData), clonedOptions);
    loadInitialUserData(cloneDeep({ ...userData, onNewPublish }));
    loadInitialOrganizationsData(cloneDeep(organizationsData));

    AppHooks.handleAppLoaded();
  },
};

export default AppInitActionCreators;
