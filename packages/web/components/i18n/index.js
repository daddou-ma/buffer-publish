import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '@bufferapp/publish-i18n/translations/en-us.json';
import esTranslation from '@bufferapp/publish-i18n/translations/es-es.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  'en-US': {
    translation: enTranslation,
  },
  'es-ES': {
    translation: esTranslation,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en-US',
    fallbackLng: 'en-US', // use en if detected lng is not available
    debug: process.env.NODE_ENV !== 'production',

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    react: {
      wait: true,
    },
  });

export default i18n;
