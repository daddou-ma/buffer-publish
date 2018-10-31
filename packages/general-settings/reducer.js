import { actionTypes as profileActionTypes } from '@bufferapp/publish-profile-sidebar';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import keyWrapper from '@bufferapp/keywrapper';

export const actionTypes = keyWrapper('GENERAL_SETTINGS', {
  SET_DIRECT_POSTING: 0,
  CHANGE_SELECTED_LINK_SHORTENER: 0,
  SHOW_GA_CUSTOMIZATION_FORM: 0,
});

const initialState = {
  directPostingEnabled: false,
  profileId: null,
  showGACustomizationForm: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case profileActionTypes.SELECT_PROFILE:
      return {
        ...state,
        directPostingEnabled: action.profile.directPostingEnabled,
        profileId: action.profileId,
        profileService: action.profile.service,
        loadingLinkShorteners: true,
        selectedShortener: null,
      };
    case `changeLinkShortener_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        selectedShortener: action.args.domain,
      };
    case `getLinkShortener_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        linkShorteners: null,
        loadingLinkShorteners: true,
      };
    case `getLinkShortener_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case `changeLinkShortener_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        linkShorteners: action.result.linkShorteners,
        loadingLinkShorteners: false,
        selectedShortener: null,
      };
    case actionTypes.SHOW_GA_CUSTOMIZATION_FORM:
      return {
        ...state,
        showGACustomizationForm: true,
      };
    default:
      return state;
  }
};

export const actions = {
  handleSetUpDirectPostingClick: action => ({
    type: actionTypes.SET_DIRECT_POSTING,
    profileId: action.profileId,
  }),
  handleOnSelectLinkShortenerChange: ({ profileId, domain }) => ({
    type: actionTypes.CHANGE_SELECTED_LINK_SHORTENER,
    profileId,
    domain,
  }),
  handleShowGACustomizationFormClick: () => ({
    type: actionTypes.SHOW_GA_CUSTOMIZATION_FORM,
  }),
};
