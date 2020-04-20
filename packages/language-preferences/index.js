import { connect } from 'react-redux';
import { actions as translationActions } from '@bufferapp/publish-i18n/reducer';
import LanguagePreferences from './components/LanguagePreferences';

const language = locale =>
  ({
    'en-US': 'English',
    'es-ES': 'Español',
    default: 'English',
  }[locale]);

export default connect(
  state => ({
    initialValues: {
      locale: state.i18n.locale,
      language: language(state.i18n.locale) || language('en-US'),
    },
  }),
  dispatch => ({
    onSelectLanguage: locale => {
      dispatch(translationActions.setLocale({ locale }));
    },
  })
)(LanguagePreferences);
