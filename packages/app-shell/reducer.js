import keyWrapper from '@bufferapp/keywrapper';
import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';

export const actionTypes = keyWrapper('APP_SHELL', {
  SET_BANNER_OPTIONS: 0,
  ON_CLOSE_BANNER: 0,
});

export const initialState = {
  bannerKey: null,
  bannerOptions: {
    text:
      'We have had some troubles with a recent deploy; if your posts are in a failed state, please try reconnecting your channel!',
    actionButton: {
      label: 'Learn more',
      action: () =>
        (window.location =
          'https://support.buffer.com/hc/en-us/articles/360038961173-Reconnecting-a-social-channel-in-Buffer-Publish'),
    },
    themeColor: 'orange',
  },
  enabledProducts: [],
  featureFlips: [],
  isImpersonation: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `globalAccount_${dataFetchActionTypes.FETCH_SUCCESS}`: {
      const productLinks = action.result.productlinks || [];
      const enabledProducts = productLinks.map(product => product.productName);

      return {
        ...state,
        enabledProducts,
        featureFlips: action.result.featureFlips,
        isImpersonation: action.result.isImpersonation,
      };
    }
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
