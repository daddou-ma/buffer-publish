import { connect } from 'react-redux';
import LanguagePreferences from './components/LanguagePreferences';
import { actions } from './reducer';
import languageLabel from './utils';

export default connect(
  state => ({
    initialValues: {
      locale: state.i18n.locale,
      language: languageLabel(state.i18n.locale) || languageLabel('en-US'),
    },
  }),
  dispatch => ({
    onSelectLanguage: language => {
      dispatch(actions.setUserLanguage({ language }));
    },
  })
)(LanguagePreferences);
