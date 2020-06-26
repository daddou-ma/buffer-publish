import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar/reducer';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('GENERAL_SETTINGS', {
  CHANGE_SELECTED_LINK_SHORTENER: 0,
  SHOW_GA_CUSTOMIZATION_FORM: 0,
  TOGGLE_GOOGLE_ANALYTICS: 0,
  CONNECT_BITLY: 0,
  DISCONNECT_BITLY: 0,
  SAVE_GA_CUSTOM_FORM: 0,
  SET_UTM_CAMPAIGN: 0,
  SET_UTM_SOURCE: 0,
  SET_UTM_MEDIUM: 0,
  TOGGLE_INSTAGRAM_REMINDERS: 0,
  SHUFFLE_QUEUE: 0,
  CONFIRM_SHUFFLE_QUEUE: 0,
  CLOSE_MODAL: 0,
});

const initialState = {
  isInstagramProfile: false,
  isInstagramBusiness: false,
  profileId: null,
  showGACustomizationForm: false,
  googleAnalyticsIsEnabled: false,
  remindersAreEnabled: false,
  showModal: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      return {
        ...state,
        isInstagramProfile: action.profile.service === 'instagram',
        isInstagramBusiness: action.profile.isInstagramBusiness,
        googleAnalyticsEnabled: action.profile.googleAnalyticsEnabled,
        profileId: action.profileId,
        profileService: action.profile.service,
        avatarUrl: action.profile.avatarUrl,
        profileName: action.profile.serviceUsername,
        loadingShuffle: false,
        linkShortening: {
          selectedShortener: null,
          profileService: action.profile.service,
          linkShorteners: null,
          isBitlyConnected: false,
          loading: true,
        },
        trackingSettings: action.trackingSettings,
        remindersAreEnabled: !action.profile.directPostingEnabled,
        linkShorteningEnabled: false,
      };
    case `changeLinkShortener_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        linkShortening: {
          ...(state.linkShortening || {}),
          selectedShortener: action.args.domain,
        },
      };
    case `getLinkShortener_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        linkShortening: {
          selectedShortener: null,
          profileService: state.profileService,
          linkShorteners: null,
          isBitlyConnected: false,
          loading: true,
        },
      };
    case `getLinkShortener_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `changeLinkShortener_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { linkShorteners } = action.result;
      const hasShortenersWithLogins =
        (linkShorteners &&
          linkShorteners.filter(shortener => shortener.login)) ||
        [];
      const isBitlyConnected = hasShortenersWithLogins.length > 0;

      const noLinkShorteningDomain = linkShorteners.find(
        ls => ls.domain === 'No Shortening'
      );

      const linkShorteningEnabled = !noLinkShorteningDomain.selected;

      return {
        ...state,
        isBitlyConnected,
        linkShorteningEnabled,
        linkShortening: {
          loading: false,
          selectedShortener: null,
          profileService: state.profileService,
          linkShorteners,
          isBitlyConnected,
        },
        googleAnalyticsEnabled: linkShorteningEnabled
          ? state.googleAnalyticsEnabled
          : false,
      };
    }
    case actionTypes.SHOW_GA_CUSTOMIZATION_FORM:
      return {
        ...state,
      };
    case `getGATrackingSettings_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        showGACustomizationForm: false,
      };
    case `getGATrackingSettings_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const { trackingSettings } = action.result;
      return {
        ...state,
        showGACustomizationForm: true,
        utmCampaign: trackingSettings ? trackingSettings.utm_campaign : '',
        utmSource: trackingSettings ? trackingSettings.utm_source : '',
        utmMedium: trackingSettings ? trackingSettings.utm_medium : '',
      };
    }
    case actionTypes.TOGGLE_GOOGLE_ANALYTICS:
      return {
        ...state,
      };
    case `toggleGoogleAnalytics_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        utmTrackingChoice: action.args.utmTrackingChoice,
      };
    case `toggleGoogleAnalytics_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        googleAnalyticsEnabled: action.result.isEnabled,
      };
    case actionTypes.SAVE_GA_CUSTOM_FORM:
      return {
        ...state,
      };
    case `saveGATrackingSettings_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        showGACustomizationForm: false,
        result: action.result,
      };
    case actionTypes.SET_UTM_CAMPAIGN:
      return {
        ...state,
        utmCampaign: action.utmCampaign,
      };
    case actionTypes.SET_UTM_SOURCE:
      return {
        ...state,
        utmSource: action.utmSource,
      };
    case actionTypes.SET_UTM_MEDIUM:
      return {
        ...state,
        utmMedium: action.utmMedium,
      };
    case `toggleInstagramReminders_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        remindersAreEnabled: action.args.allowReminders,
      };
    case `toggleInstagramReminders_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        remindersAreEnabled: !state.remindersAreEnabled,
      };
    case `shuffleQueue_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `shuffleQueue_${dataFetchActionTypes.FETCH_FAIL}`:
      return {
        ...state,
        showModal: false,
        loadingShuffle: false,
      };
    case actionTypes.SHUFFLE_QUEUE:
      return {
        ...state,
        showModal: true,
      };
    case actionTypes.CONFIRM_SHUFFLE_QUEUE:
      return {
        ...state,
        loadingShuffle: true,
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
      };
    default:
      return state;
  }
};

export const actions = {
  handleConnectBitlyURLClick: action => ({
    type: actionTypes.CONNECT_BITLY,
    profileId: action.profileId,
  }),
  handleDisconnectBitlyURLClick: action => ({
    type: actionTypes.DISCONNECT_BITLY,
    profileId: action.profileId,
  }),
  handleShowGACustomizationFormClick: action => ({
    type: actionTypes.SHOW_GA_CUSTOMIZATION_FORM,
    profileId: action.profileId,
  }),
  handleOnSelectLinkShortenerChange: ({ profileId, domain }) => ({
    type: actionTypes.CHANGE_SELECTED_LINK_SHORTENER,
    profileId,
    domain,
  }),
  handleGoogleAnalyticsToggle: ({ profileId, utmTrackingChoice }) => ({
    type: actionTypes.TOGGLE_GOOGLE_ANALYTICS,
    profileId,
    utmTrackingChoice,
  }),
  handleSaveGATrackingSettings: ({
    profileId,
    utmCampaign,
    utmSource,
    utmMedium,
  }) => ({
    type: actionTypes.SAVE_GA_CUSTOM_FORM,
    profileId,
    utmCampaign,
    utmSource,
    utmMedium,
  }),
  handleChangeUtmCampaign: ({ utmCampaign }) => ({
    type: actionTypes.SET_UTM_CAMPAIGN,
    utmCampaign,
  }),
  handleChangeUtmSource: ({ utmSource }) => ({
    type: actionTypes.SET_UTM_SOURCE,
    utmSource,
  }),
  handleChangeUtmMedium: ({ utmMedium }) => ({
    type: actionTypes.SET_UTM_MEDIUM,
    utmMedium,
  }),
  handleRemindersToggle: ({ profileId, allowReminders }) => ({
    type: actionTypes.TOGGLE_INSTAGRAM_REMINDERS,
    profileId,
    allowReminders,
  }),
  handleShuffleQueue: () => ({
    type: actionTypes.SHUFFLE_QUEUE,
  }),
  handleConfirmShuffleClick: ({ profileId }) => ({
    type: actionTypes.CONFIRM_SHUFFLE_QUEUE,
    profileId,
  }),
  handleCloseModal: () => ({
    type: actionTypes.CLOSE_MODAL,
  }),
};
