import { UploadTypes, MediaTypes } from '@bufferapp/publish-constants';
import AppDispatcher from '../dispatcher';
import { ActionTypes, NotificationScopes } from '../AppConstants';
import AppStore from '../stores/AppStore';
import ComposerStore from '../stores/ComposerStore';
import Scraper from '../utils/Scraper';
import Shortener from '../utils/Shortener';
import Uploader from '@bufferapp/publish-upload-zone/utils/Uploader';
import NotificationActionCreators from './NotificationActionCreators';
import AppActionCreators from './AppActionCreators';
import { getFileTypeFromPath } from '../utils/StringUtils';
import ModalActionCreators from '../shared-components/modal/actionCreators';
import ServerActionCreators from './ServerActionCreators';

const ComposerActionCreators = {
  enable: (id, markAppAsLoadedWhenDone = false) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ENABLE,
      id,
      markAppAsLoadedWhenDone,
    });
  },

  disable: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DISABLE,
      id,
    });
  },

  expand: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_EXPAND,
      id,
    });
  },

  collapse: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_COLLAPSE,
      id,
    });
  },

  updateDraftHasSavingError: (id, hasSavingError) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.UPDATE_DRAFT_HAS_SAVING_ERROR,
      id,
      hasSavingError,
    });
  },

  updateDraftIsSaved: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.UPDATE_DRAFT_IS_SAVED,
      id,
    });
  },

  /**
   * Note: we're using a synchronous "dispatch" here, despite it not being
   * idiomatic, to prevent race conditions when updating the editor state:
   * if the state is updated in the editor component and takes some time to
   * reach the store because of an async dispatch, then any change made to
   * the editor state within the store during that time period will be lost.
   * This is the reason why this should be done synchronously.
   */
  updateDraftEditorState: (id, editorState) => {
    ComposerStore._syncDispatch({
      action: {
        actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_EDITOR_STATE,
        id,
        editorState,
      },
    });
  },

  updateDraftSourceLink: (id, url) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_SOURCE_LINK,
      id,
      url,
    });
  },

  updateDraftSourceLinkData: (() => {
    let currentCanonicalUrl;

    return (id, url) => {
      const { environment } = AppStore.getMetaData();
      const canonicalUrl = ComposerStore.getCanonicalUrl(url);

      currentCanonicalUrl = canonicalUrl;

      Scraper.scrape(canonicalUrl, environment).then(scrapedData => {
        const doesScrapedDataStillMatchSourceUrl =
          currentCanonicalUrl === canonicalUrl;
        if (!doesScrapedDataStillMatchSourceUrl) return;

        const linkData = Object.assign({}, scrapedData, { url });
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_SOURCE_LINK_DATA,
          id,
          linkData,
        });
      });
    };
  })(),

  updateDraftCharacterCount: (id, { didEditorStateChange = true } = {}) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_CHARACTER_COUNT,
      id,
      didEditorStateChange,
    });
  },

  updateDraftCommentCharacterCount: (
    id,
    { didEditorStateChange = true } = {}
  ) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_COMMENT_CHARACTER_COUNT,
      id,
      didEditorStateChange,
    });
  },

  updateDraftComment: (id, commentText) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_COMMENT,
      id,
      commentText,
    });
  },

  updateDraftShopgridLink: (id, shopgridLink) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_SHOPGRID_LINK,
      id,
      shopgridLink,
    });
  },

  updateToggleSidebarVisibility: (id, composerSidebarVisible) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_TOGGLE_SIDEBAR,
      id,
      composerSidebarVisible,
    });
  },

  parseDraftTextLinks: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_PARSE_DRAFT_TEXT_LINKS,
      id,
    });
  },

  handleNewDraftLinks: (id, newUrls) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_HANDLE_NEW_DRAFT_TEXT_LINKS,
      id,
      newUrls,
    });
  },

  handleRemovedDraftLinks: (id, removedUrls) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_HANDLE_REMOVED_DRAFT_TEXT_LINKS,
      id,
      removedUrls,
    });
  },

  updateDraftLink: (id, url) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_LINK_DATA,
      id,
      linkData: { url },
      meta: {
        isNewLinkAttachment: true,
        comesFromDirectUserAction: false,
      },
    });
  },

  updateDraftLinkTitle: (id, title) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_LINK_DATA,
      id,
      linkData: { title },
      meta: {
        isNewLinkAttachment: false,
        comesFromDirectUserAction: true,
      },
    });
  },

  updateDraftLinkDescription: (id, description) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_LINK_DATA,
      id,
      linkData: { description },
      meta: {
        isNewLinkAttachment: false,
        comesFromDirectUserAction: true,
      },
    });
  },

  scrapeDraftLinkData: (id, url) => {
    const { environment } = AppStore.getMetaData();
    const canonicalUrl = ComposerStore.getCanonicalUrl(url);

    Scraper.scrape(canonicalUrl, environment)
      .then(scrapedData => ({
        url,
        title: scrapedData.title || '',
        description: scrapedData.description || '',
        availableThumbnails: scrapedData.images || [],
      }))
      .then(linkData => {
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_LINK_DATA,
          id,
          linkData,
          meta: {
            isNewLinkAttachment: false,
            comesFromDirectUserAction: false,
          },
        });
      });
  },

  selectNextLinkThumbnail: draftId => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_NEXT_LINK_THUMBNAIL,
      draftId,
    });
  },

  selectPreviousLinkThumbnail: draftId => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_PREVIOUS_LINK_THUMBNAIL,
      draftId,
    });
  },

  shortenDraftLink: (id, url) => {
    const draft = ComposerStore.getDraft(id);

    // Use the first selected profile for link shortenig config
    // If omni, use the first selected profile or first connected profile
    // if no profiles are selected
    let profiles = [];
    if (draft.service.isOmni) {
      const enabledDrafts = ComposerStore.getEnabledDrafts();
      profiles =
        enabledDrafts.length > 0
          ? AppStore.getSelectedProfilesForService(
              enabledDrafts[0].service.name
            )
          : AppStore.getProfiles();
    } else {
      profiles = draft.isEnabled
        ? AppStore.getSelectedProfilesForService(draft.service.name)
        : [];
    }

    if (profiles.length <= 0) return;
    const profileId = profiles[0].id;

    Shortener.shorten(profileId, url).then(shortLink => {
      // Don't create action when no new shortlink generated (can happen when url is already
      // a short link, or when link shortening is disabled for that profile)
      if (url === shortLink) return;

      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_DRAFT_LINK_SHORTENED,
        id,
        link: url,
        shortLink,
      });
    });
  },

  draftTextLinkUnshortened: (id, unshortenedLink) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DRAFT_LINK_UNSHORTENED,
      id,
      unshortenedLink,
    });
  },

  draftTextLinkShortened: (id, unshortenedLink, shortLink) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DRAFT_LINK_SHORTENED,
      id,
      link: unshortenedLink,
      shortLink,
    });
  },

  draftTextLinkReshortened: (id, unshortenedLink, shortLink) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DRAFT_LINK_RESHORTENED,
      id,
      shortLink,
      link: unshortenedLink,
    });
  },

  updateDraftLinkAvailableImages: (id, url) => {
    const { environment } = AppStore.getMetaData();
    const canonicalUrl = ComposerStore.getCanonicalUrl(url);

    Scraper.scrape(canonicalUrl, environment).then(({ images = [] }) => {
      if (images.length === 0) return;

      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ADD_DRAFT_AVAILABLE_IMAGES,
        id,
        images,
        sourceLink: url,
      });
    });
  },

  removeDraftLinkAvailableImages: (id, sourceLink) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_REMOVE_DRAFT_AVAILABLE_IMAGES,
      id,
      sourceLink,
    });
  },

  toggleAttachment: (id, type) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_TOGGLE_DRAFT_ATTACHMENT,
      id,
      type,
    });
  },

  attachmentToggled: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DRAFT_ATTACHMENT_TOGGLED,
      id,
    });
  },

  addDraftImage: (id, image) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ADD_DRAFT_IMAGE,
      id,
      image,
    });
  },

  draftImageAdded: (id, url) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DRAFT_IMAGE_ADDED,
      id,
      url,
    });
  },

  addDraftVideo: (id, video) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ADD_DRAFT_VIDEO,
      id,
      video,
    });
  },

  addDraftGif: (id, gif) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_ADD_DRAFT_GIF,
      id,
      gif,
    });
  },

  updateDraftImageUserTags: (id, userTags) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_IMAGE_USER_TAGS,
      id,
      userTags,
    });
  },

  updateDraftCampaignId: campaignId => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_CAMPAIGN_ID,
      campaignId,
    });
  },

  updateDraftLinkThumbnail: (id, thumbnail) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_LINK_THUMBNAIL,
      id,
      thumbnail,
    });
  },

  updateDraftVideoThumbnail: (id, thumbnail) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_VIDEO_THUMBNAIL,
      id,
      thumbnail,
    });
  },

  updateDraftVideoTitle: (id, title) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_VIDEO_TITLE,
      id,
      title,
    });
  },

  draftVideoAdded: (id, video) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DRAFT_VIDEO_ADDED,
      id,
      video,
    });
  },

  draftGifAdded: (id, url) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_DRAFT_GIF_ADDED,
      id,
      url,
    });
  },

  removeDraftImage: (id, image) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_REMOVE_DRAFT_IMAGE,
      id,
      image,
    });
  },

  removeDraftVideo: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_REMOVE_DRAFT_VIDEO,
      id,
    });
  },

  removeDraftGif: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_REMOVE_DRAFT_GIF,
      id,
    });
  },

  updateDraftTempImage: (id, url) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_TEMP_IMAGE,
      id,
      url,
    });
  },

  removeDraftTempImage: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_REMOVE_DRAFT_TEMP_IMAGE,
      id,
    });
  },

  updateDraftAttachedMediaEditingPayload: (id, media) => {
    AppDispatcher.handleViewAction({
      actionType:
        ActionTypes.COMPOSER_UPDATE_DRAFT_ATTACHED_MEDIA_EDITING_PAYLOAD,
      id,
      media,
    });
  },

  uploadInstagramDraftThumbnail: (id, imageFile, video) => {
    const { id: userId, s3UploadSignature } = AppStore.getUserData();
    const uploader = new Uploader({
      csrf_token: AppStore.getCsrfToken(),
      userId,
      s3UploadSignature,
      errorNotifier: ({ message }) =>
        NotificationActionCreators.queueError({
          scope: NotificationScopes.FILE_UPLOAD,
          message,
        }),
      notifiers: ServerActionCreators,
    });
    uploader
      .upload(imageFile)
      .then(uploadedFile => {
        const thumbOffset = video.currentTime * 1000;
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.COMPOSER_UPDATE_INSTAGRAM_DRAFT_THUMBNAIL,
          id,
          thumbOffset,
          thumbnail: uploadedFile.thumbnailUrl,
        });
        // allows you to add to queue once upload is complete
        AppActionCreators.setThumbnailLoading(false);
        ModalActionCreators.closeModal('overlay');
      })
      .catch(() => {
        NotificationActionCreators.queueError({
          scope: NotificationScopes.FILE_UPLOAD,
          message:
            'Uh oh! It looks like we had an issue saving the thumbnail. Up for trying again?',
        });
        AppActionCreators.setThumbnailLoading(false);
        ModalActionCreators.closeModal('overlay');
      });
  },
  notifiers: {
    uploadStarted: ({ id, uploaderInstance }) => {
      return AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_DRAFT_FILE_UPLOAD_STARTED,
        id,
        uploaderInstance,
      });
    },
    uploadedLinkThumbnail: ({ id, uploaderInstance, url, width, height }) => {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ADD_DRAFT_UPLOADED_LINK_THUMBNAIL,
        id,
        uploaderInstance,
        url,
        width,
        height,
      });
    },
    uploadedDraftImage: ({
      id,
      uploaderInstance,
      url,
      location,
      width,
      height,
    }) => {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ADD_DRAFT_UPLOADED_IMAGE,
        id,
        uploaderInstance,
        url,
        location,
        width,
        height,
      });
    },
    uploadedDraftVideo: ({ id, uploaderInstance, uploadId, fileExtension }) => {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ADD_DRAFT_UPLOADED_VIDEO,
        id,
        uploaderInstance,
        uploadId,
      });
    },
    draftGifUploaded: ({
      id,
      uploaderInstance,
      url,
      stillGifUrl,
      width,
      height,
    }) => {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.COMPOSER_ADD_DRAFT_UPLOADED_GIF,
        id,
        uploaderInstance,
        url,
        stillGifUrl,
        width,
        height,
      });
    },
    queueError: ({ message }) => {
      NotificationActionCreators.queueError({
        scope: NotificationScopes.FILE_UPLOAD,
        message,
      });
    },
    monitorFileUploadProgress: ({ id, uploaderInstance }) => {
      ComposerActionCreators.monitorDraftFileUploadProgress(
        id,
        uploaderInstance
      );
    },
  },
  uploadDraftFile: (
    id,
    file,
    uploadType,
    notifiers,
    createFileUploaderCallback
  ) => {
    const { id: userId, s3UploadSignature } = AppStore.getUserData();
    const imageDimensionsKey = AppStore.getImageDimensionsKey();
    const csrfToken = AppStore.getCsrfToken();

    const uploadDraftFile = createFileUploaderCallback({
      s3UploadSignature,
      userId,
      csrfToken,
      serverNotifiers: ServerActionCreators,
      imageDimensionsKey,
    });

    return uploadDraftFile(id, file, uploadType, notifiers);
  },

  updateImageAltText: (image, altText) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_IMAGE_ALT_TEXT,
      image,
      altText,
    });
  },

  monitorDraftFileUploadProgress: async (id, uploaderInstance) => {
    const progressIterator = uploaderInstance.getProgressIterator();
    let item;

    while (!(item = progressIterator.next()).done) {
      // eslint-disable-line no-cond-assign
      const promisedProgress = item.value;

      await promisedProgress.then(progress => {
        // eslint-disable-line no-await-in-loop
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.COMPOSER_DRAFT_FILE_UPLOAD_PROGRESS,
          id,
          uploaderInstance,
          progress,
        });
      });
    }
  },

  applyOmniUpdate: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_APPLY_OMNI_UPDATE,
    });
  },

  updateDraftsScheduledAt: (scheduledAt, isPinnedToSlot) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFTS_SCHEDULED_AT,
      scheduledAt,
      isPinnedToSlot,
    });
  },

  updateInstagramState: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_INSTAGRAM_STATE,
    });
  },

  updateDraftLocation: (id, locationId, locationName) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_LOCATION,
      id,
      locationId,
      locationName,
    });
  },

  updateDraftListPlaces: (id, places) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UPDATE_DRAFT_LIST_PLACES,
      id,
      places,
    });
  },
};

export default ComposerActionCreators;
