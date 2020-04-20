import keyWrapper from '@bufferapp/keywrapper';
import defaultTranslations from './translations/en-us.json';

export const actionTypes = keyWrapper('I18N', {
  SET_LOCALE: 0,
  SET_TRANSLATIONS: 0,
});

const initialState = {
  locale: 'en-US',
  translations: defaultTranslations,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOCALE:
      return {
        ...state,
        locale: action.locale,
      };
    case actionTypes.SET_TRANSLATIONS:
      return {
        ...state,
        translations: action.translations,
      };
    default:
      return state;
  }
};

export const actions = {
  setLocale: ({ locale }) => ({
    type: actionTypes.SET_LOCALE,
    locale,
  }),
  setTranslations: ({ translations }) => ({
    type: actionTypes.SET_TRANSLATIONS,
    translations,
  }),
};
