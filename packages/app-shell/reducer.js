import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('APP_SHELL', {
  SET_BANNER_OPTIONS: 0,
  ON_CLOSE_BANNER: 0,
});

export const initialState = {
  showReturnToClassic: false,
  showSwitchPlanModal: false,
  user: {
    name: '...',
    email: '',
    avatar: null,
  },
  bannerKey: null,
  bannerOptions: undefined,
  enabledProducts: [],
  featureFlips: [],
  isImpersonation: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        user: {
          email: action.result.email,
          name: action.result.name,
        },
        hideMenuItems:
          action.result.canSeePaydayPage && action.result.isOnAwesomePlan,
        showReturnToClassic: action.result.showReturnToClassic,
        showSwitchPlanModal:
          action.result.is_free_user && !action.result.isBusinessTeamMember,
        showManageTeam: !action.result.is_free_user,
        showStartProTrial:
          action.result.canStartProTrial && !action.result.isBusinessTeamMember,
      };
    case `globalAccount_${dataFetchActionTypes.FETCH_SUCCESS}`:
      const productLinks = action.result.productlinks || [];
      const enabledProducts = productLinks.map(product => product.productName);

      return {
        ...state,
        enabledProducts,
        featureFlips: action.result.featureFlips,
        isImpersonation: action.result.isImpersonation,
      };
    case actionTypes.SET_BANNER_OPTIONS:
      return {
        ...state,
        bannerKey: action.key,
        bannerOptions: {
          text: action.text,
          actionButton: action.actionButton,
          customHTML: action.customHTML,
          themeColor: action.themeColor,
        },
      };
    default:
      return state;
  }
};

export const actions = {
  setBannerOptions: ({ key, text, actionButton, customHTML, themeColor }) => ({
    type: actionTypes.SET_BANNER_OPTIONS,
    key,
    text,
    actionButton,
    customHTML,
    themeColor,
  }),
  onCloseBanner: ({ key }) => ({
    type: actionTypes.ON_CLOSE_BANNER,
    key,
  }),
};
