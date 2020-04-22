import americanEnglishTranslations from './translations/en-us.json';
import chinaChineseTranslations from './translations/zh-cn.json';
import spanishSpainTranslations from './translations/es-es.json';
import { actions, actionTypes } from './reducer';

export default store => next => action => {
  switch (action.type) {
    case actionTypes.SET_LOCALE:
      switch (action.locale) {
        case 'en-US':
          store.dispatch(
            actions.setTranslations({
              translations: americanEnglishTranslations,
            })
          );
          break;
        case 'zh-CN':
          store.dispatch(
            actions.setTranslations({
              translations: chinaChineseTranslations,
            })
          );
          break;
        case 'es-ES':
          store.dispatch(
            actions.setTranslations({
              translations: spanishSpainTranslations,
            })
          );
          break;
        default:
          // default to american english translations
          store.dispatch(
            actions.setTranslations({
              translations: americanEnglishTranslations,
            })
          );
          break;
      }
      break;
    default:
      break;
  }
  return next(action);
};
