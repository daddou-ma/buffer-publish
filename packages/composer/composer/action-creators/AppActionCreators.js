import partition from 'lodash.partition';
import WebSocket from '@bufferapp/publish-upload-zone/utils/WebSocket';
import AppDispatcher from '../dispatcher';
import {
  ActionTypes,
  QueueingTypes,
  NotificationScopes,
  ErrorTypes,
  FloatingErrorCodes,
  InlineSaveButtonTypes,
  ButtonsQueuingTypesMap,
  UpgradeErrorCodes,
  bufferOrigins,
} from '../AppConstants';
import NotificationActionCreators from './NotificationActionCreators';
import ServerActionCreators from './ServerActionCreators';
import WebAPIUtils from '../utils/WebAPIUtils';
import ComposerStore from '../stores/ComposerStore';
import ComposerActionCreators from './ComposerActionCreators';
import AppStore from '../stores/AppStore';
import AppHooks from '../utils/LifecycleHooks';
import ModalActionCreators from '../shared-components/modal/actionCreators';
import { extractSavedUpdatesIdsFromResponses } from '../utils/APIDataTransforms';
import { removeLinkFromErrorMessageText } from '../utils/StringUtils';

const getDefaultQueueingType = () => {
  const { saveButtons } = AppStore.getOptions();
  const [inlineSaveButtonTypes, stackedSaveButtonTypes] = partition(
    saveButtons,
    button => InlineSaveButtonTypes.includes(button)
  );

  let saveButtonType;

  if (inlineSaveButtonTypes.length > 0) {
    saveButtonType = inlineSaveButtonTypes[inlineSaveButtonTypes.length - 1];
  } else if (stackedSaveButtonTypes.length > 0) {
    saveButtonType = stackedSaveButtonTypes[0];
  }

  return ButtonsQueuingTypesMap.get(saveButtonType);
};

const AppActionCreators = {
  // Preload a subset of relevant autocomplete data for Twitter
  refreshTwitterAutocompleteBootstrapData: profilesIds => {
    WebAPIUtils.getTwitterAutocompleteBootstrapData(profilesIds).then(
      friends => {
        AppDispatcher.handleApiAction({
          actionType:
            ActionTypes.APP_RECEIVE_TWITTER_AUTOCOMPLETE_BOOTSTRAP_DATA,
          friends,
          profilesIds,
        });
      }
    );
  },

  triggerInteraction: message => {
    AppHooks.handleActionTaken(message);
  },

  saveDrafts: (
    queueingType = getDefaultQueueingType(),
    { customScheduleTime = null, shouldSkipEmptyTextAlert = true } = {}
  ) => {
    const { isSavingPossible } = AppStore.getAppState();
    const { shouldAlwaysSkipEmptyTextAlert } = AppStore.getUserData();
    const metaData = AppStore.getMetaData();
    const hadTextToPrefill =
      metaData.text ||
      metaData.url ||
      metaData.via ||
      (metaData.retweetData && metaData.retweetData.comment);

    if (!isSavingPossible) return Promise.reject();

    const { saveButtons } = AppStore.getOptions();
    const allowedQueuingTypes = saveButtons.map(saveButtonType =>
      ButtonsQueuingTypesMap.get(saveButtonType)
    );
    if (!allowedQueuingTypes.includes(queueingType)) return Promise.reject();

    const shouldShowEmptyTextAlert =
      !metaData.isPrefillingExistingUpdate &&
      hadTextToPrefill &&
      !shouldAlwaysSkipEmptyTextAlert &&
      !shouldSkipEmptyTextAlert &&
      AppStore.hasFBDraftWithNoText();

    if (shouldShowEmptyTextAlert) {
      ModalActionCreators.openModal('EmptyTextAlert', { queueingType });
      return Promise.reject();
    }

    const data = {
      queueingType,
      customScheduleTime,
      profiles: AppStore.getSelectedProfiles(),
      drafts: ComposerStore.getEnabledDrafts().filter(
        draft => !ComposerStore.isDraftLocked(draft.id)
      ),
    };

    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_SAVE_DRAFTS,
      data,
    });

    return WebAPIUtils.saveDrafts(data)
      .then(async ({ successfulResponses, unsuccessfulResponses }) => {
        // If we're "saving and approving", approve successfully saved updates
        if (
          queueingType === QueueingTypes.SAVE_AND_APPROVE &&
          successfulResponses.length > 0
        ) {
          const ids = extractSavedUpdatesIdsFromResponses(successfulResponses);
          await WebAPIUtils.approveDrafts(ids);
        }

        return { successfulResponses, unsuccessfulResponses };
      })
      .then(({ successfulResponses, unsuccessfulResponses }) => {
        AppDispatcher.handleApiAction({
          actionType: ActionTypes.COMPOSER_RECEIVE_SAVED_DRAFTS,
        });

        // Queue aggregate notification to let user know of general state of saved updates
        const areAllResponsesSuccessful = unsuccessfulResponses.length === 0;

        if (areAllResponsesSuccessful) {
          const successfulResponseMessageMap = new Map([
            [
              QueueingTypes.QUEUE,
              {
                singular: 'Great! The post has been added to your queue.',
                plural: 'Great! All posts have been added to your queue.',
              },
            ],
            [
              QueueingTypes.NEXT,
              {
                singular: 'Great! The post has been added to your queue.',
                plural: 'Great! All posts have been added to your queue.',
              },
            ],
            [
              QueueingTypes.NOW,
              {
                singular: 'Great! The post has been shared.',
                plural: 'Great! All posts have been shared.',
              },
            ],
            [
              QueueingTypes.CUSTOM,
              {
                singular: 'Great! The post has been scheduled.',
                plural: 'Great! All posts have been scheduled.',
              },
            ],
            [
              QueueingTypes.SAVE,
              {
                singular: 'Great! The post has been saved.',
                plural: 'Great! All posts have been saved.',
              },
            ],
            [
              QueueingTypes.SAVE_AND_APPROVE,
              {
                singular: 'Great! The post has been saved.',
                plural: 'Great! All posts have been saved.',
              },
            ],
            [
              QueueingTypes.ADD_DRAFT,
              {
                singular: 'Great! The post has been added to your drafts.',
                plural: 'Great! All posts have been added to your drafts.',
              },
            ],
            [
              QueueingTypes.NEXT_DRAFT,
              {
                singular: 'Great! The post has been added to your drafts.',
                plural: 'Great! All posts have been added to your drafts.',
              },
            ],
            [
              QueueingTypes.CUSTOM_DRAFT,
              {
                singular: 'Great! The post has been added to your drafts.',
                plural: 'Great! All posts have been added to your drafts.',
              },
            ],
          ]);

          const successMessage =
            successfulResponses.length > 1
              ? successfulResponseMessageMap.get(queueingType).plural
              : successfulResponseMessageMap.get(queueingType).singular;

          AppHooks.handleSavedDrafts({
            message: successMessage,
          });

          if (AppStore.isExtension()) {
            NotificationActionCreators.queueSuccess({
              scope: NotificationScopes.UPDATE_SAVING_AGGREGATE,
              message: successMessage,
            });
          }
        }

        // Queue individual notifications to let user know of individual
        // error/success states for each composer (we could be even more granular
        // here by, for each composer, singling out profile ids that either succeeded
        // or failed, and offering custom messages accordingly)
        successfulResponses.forEach(successfulResponse => {
          AppActionCreators.clearComposerInlineErrors(
            successfulResponse.serviceName
          );
          ComposerActionCreators.updateDraftHasSavingError(
            successfulResponse.serviceName,
            false
          );
          ComposerActionCreators.updateDraftIsSaved(
            successfulResponse.serviceName
          );
          NotificationActionCreators.queueSuccess({
            scope: `${NotificationScopes.UPDATE_SAVING}-${successfulResponse.serviceName}`,
          });
        });

        unsuccessfulResponses.forEach(unsuccessfulResponse => {
          AppActionCreators.clearComposerInlineErrors(
            unsuccessfulResponse.serviceName
          );

          // Did we get an error because the user reached a limit and could upgrade?
          // Don't show it as an 'error' in that case
          if (unsuccessfulResponse.code === UpgradeErrorCodes.queueLimit) {
            const organizations = AppStore.getOrganizationsData();
            const {
              showUpgradeToBusinessCta,
              showUpgradeToProCta,
            } = organizations.selected;
            const scope = `${NotificationScopes.PROFILE_QUEUE_LIMIT}-${unsuccessfulResponse.serviceName}`;

            NotificationActionCreators.queueInfo({
              scope,
              // Remove the <a> from the response message for now until the backend stops returning it
              // since we already have a special setup for showing a `cta` button in the notification
              // TODO: Replace below with just `unsuccessfulResponse.message` when the API has removed
              // the link.
              message: removeLinkFromErrorMessageText(
                unsuccessfulResponse.message,
                'embedded-cta-link'
              ),
              isUnique: true,
              cta: {
                label: 'Show Paid Plans',
                action: () => {
                  const { environment } = AppStore.getMetaData();
                  if (showUpgradeToProCta) {
                    if (AppStore.isExtension()) {
                      window.open(`${bufferOrigins.get(environment)}/pricing`);
                    } else {
                      AppDispatcher.handleViewAction({
                        actionType: ActionTypes.EVENT_SHOW_SWITCH_PLAN_MODAL,
                      });
                    }
                  } else if (showUpgradeToBusinessCta) {
                    window.open(`${bufferOrigins.get(environment)}/pricing`);
                  } else {
                    window.open(
                      `${bufferOrigins.get(
                        environment
                      )}/app/account/receipts?content_only=true`
                    );
                  }
                },
              },
            });
          } else {
            ComposerActionCreators.updateDraftHasSavingError(
              unsuccessfulResponse.serviceName,
              true
            );

            const scope = FloatingErrorCodes.includes(unsuccessfulResponse.code)
              ? `${NotificationScopes.UPDATE_SAVING}-${ErrorTypes.FLOATING}`
              : `${NotificationScopes.UPDATE_SAVING}-${ErrorTypes.INLINE}-${unsuccessfulResponse.serviceName}`;

            NotificationActionCreators.queueError({
              scope,
              message: unsuccessfulResponse.message,
            });
          }
        });
      });
  },

  clearComposerInlineErrors: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_CLEAR_INLINE_ERRORS,
      id,
    });
  },

  createNewSubprofile: (profileId, name) => {
    const data = { name };

    WebAPIUtils.createNewSubprofile(profileId, data)
      .then(newSubprofile => {
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.COMPOSER_CREATE_NEW_SUBPROFILE,
          profileId: newSubprofile.profileId,
          subprofileId: newSubprofile.id,
          avatar: newSubprofile.avatar,
          name: newSubprofile.name,
          isShared: newSubprofile.isShared,
        });
      })
      .catch(({ message }) => {
        AppDispatcher.handleViewAction({
          actionType: ActionTypes.COMPOSER_CREATE_NEW_SUBPROFILE_FAILED,
          profileId,
        });

        NotificationActionCreators.queueError({
          scope: NotificationScopes.BOARD_CREATION,
          data: { profileId },
          message,
        });
      });
  },

  refreshSubprofileData: profileId => {
    WebAPIUtils.fetchProfileSubprofiles(profileId).then(response => {
      AppDispatcher.handleViewAction({
        actionType: ActionTypes.APP_REFRESH_SUBPROFILE_DATA,
        profileId,
        subprofileData: response.subprofiles,
      });
    });
  },

  createSubprofilePending: profileId => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_CREATE_NEW_SUBPROFILE_PENDING,
      profileId,
    });
  },

  setThumbnailLoading: isLoading => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_SET_THUMBNAIL_LOADING,
      isLoading,
    });
  },

  unselectSubprofile: (profileId, subprofileId) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_UNSELECT_SUBPROFILE,
      profileId,
      subprofileId,
    });
  },

  selectSubprofile: (profileId, subprofileId) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_SELECT_SUBPROFILE,
      profileId,
      subprofileId,
    });
  },

  selectProfile: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_SELECT_PROFILE,
      id,
    });
  },

  unselectProfile: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UNSELECT_PROFILE,
      id,
    });
  },

  selectProfiles: (
    ids,
    markAppAsLoadedWhenDone = false,
    originatedFromGroupSelection = false
  ) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_SELECT_PROFILES,
      ids,
      markAppAsLoadedWhenDone,
      originatedFromGroupSelection,
    });
  },

  unselectProfiles: ids => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_UNSELECT_PROFILES,
      ids,
    });
  },

  queueProfileSubprofilesDropdownsIdsToExpand: ids => {
    AppDispatcher.handleViewAction({
      actionType:
        ActionTypes.COMPOSER_QUEUE_PROFILES_SUBPROFILES_DROPDOWNS_TO_EXPAND,
      ids,
    });
  },

  emptyProfileSubprofilesDropdownsIdsToExpand: () => {
    AppDispatcher.handleViewAction({
      actionType:
        ActionTypes.COMPOSER_EMPTY_PROFILES_SUBPROFILES_DROPDOWNS_TO_EXPAND,
    });
  },

  selectProfilesOnBehalfOfUser: (
    ids,
    markAppAsLoadedWhenDone,
    originatedFromGroupSelection
  ) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_SELECT_PROFILES_ON_BEHALF_OF_USER,
      ids,
      markAppAsLoadedWhenDone,
      originatedFromGroupSelection,
    });
  },

  collapseProfileSubprofileDropdown: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_COLLAPSE_PROFILE_SUBPROFILE_DROPDOWN,
      id,
    });
  },

  expandProfileSubprofileDropdown: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_EXPAND_PROFILE_SUBPROFILE_DROPDOWN,
      id,
    });
  },

  profileDropdownHidden: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.PROFILE_DROPDOWN_HIDDEN,
    });
  },

  selectGroupProfiles: id => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_SELECT_GROUP_PROFILES,
      id,
    });
  },

  unselectGroupProfiles: (id, selectedProfileGroupsIds) => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_UNSELECT_GROUP_PROFILES,
      id,
      selectedProfileGroupsIds,
    });
  },

  getProfileSlotDataForMonth: (() => {
    const pendingAPICalls = new Set();

    return (profileId, momentInMonth) => {
      const startDateString = momentInMonth
        .startOf('month')
        .format('YYYY-MM-DD');
      const endDateString = momentInMonth.endOf('month').format('YYYY-MM-DD');
      const requestIdentifier = `${profileId}-${startDateString}-${endDateString}`;

      // If a request for the same profile and month is already running, don't make another one
      if (pendingAPICalls.has(requestIdentifier)) return;

      WebAPIUtils.getProfileSlotDataForDateRange(
        profileId,
        startDateString,
        endDateString
      ).then(slots => {
        pendingAPICalls.delete(requestIdentifier);

        AppDispatcher.handleViewAction({
          actionType: ActionTypes.APP_RECEIVE_PROFILE_SLOT_DATA,
          id: profileId,
          slots,
        });
      });

      pendingAPICalls.add(requestIdentifier);
    };
  })(),

  closeComposer: () => AppHooks.closeComposer(),

  toggleAllProfiles: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_TOGGLE_ALL_PROFILES,
    });
  },

  updateOmniboxState: isEnabled => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_UPDATE_OMNIBOX_STATE,
      isEnabled,
    });
  },

  updatePartiallySavedDraftsProfilesIds: partiallySavedDrafts => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_UPDATE_PARTIALLY_SAVED_DRAFTS_PROFILES_IDS,
      partiallySavedDrafts,
    });
  },

  rememberModalView: modalKey => WebAPIUtils.rememberModalView(modalKey),

  forceEditorFocus: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_FORCE_FOCUS,
    });
  },

  stopForcingEditorFocus: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.COMPOSER_STOP_FORCE_FOCUS,
    });
  },

  markAppAsLoaded: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_LOADED,
    });
  },

  markAppAsNotLoaded: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_NOT_LOADED,
    });
  },

  listenToChangeEventsForGroups: () => {
    const { appEnvironment } = AppStore.getMetaData();
    WebSocket.init({
      userId: AppStore.getUserData().id,
      notifiers: ServerActionCreators,
      appEnvironment,
    });
  },

  resetSelectedProfiles: profilesData => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.RESET_PROFILES_DATA,
      profilesData,
    });
  },

  getFacebookDomainOwnershipForProfile: (profileId, url) => {
    WebAPIUtils.getFacebookDomainOwnershipForProfile(profileId, url).then(
      isOwner => {
        AppDispatcher.handleApiAction({
          actionType: ActionTypes.APP_RECEIVE_FACEBOOK_DOMAIN_OWNERSHIP_DATA,
          profileId,
          url,
          isOwner,
        });
      }
    );
  },

  refreshFacebookDomainOwnershipData: () => {
    AppDispatcher.handleViewAction({
      actionType: ActionTypes.APP_REFRESH_FACEBOOK_DOMAIN_OWNERSHIP_DATA,
    });
  },

  rememberTwitterMaxProfileNotificationClosedOnce: () => {
    AppDispatcher.handleViewAction({
      actionType:
        ActionTypes.APP_REMEMBER_TWITTER_MAX_PROFILE_NOTIF_CLOSED_ONCE,
    });
  },
};

export default AppActionCreators;
