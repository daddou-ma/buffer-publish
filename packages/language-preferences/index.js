import { connect } from 'react-redux';
import LanguagePreferences from './components/LanguagePreferences';
import { actions } from './reducer';

export default connect(
  state => ({
    hasTranslationsFlip: state.appSidebar.user.features
      ? state.appSidebar.user.features.includes('publish-translations')
      : false,
  }),
  dispatch => ({
    onSelectLanguage: language => {
      dispatch(actions.setUserLanguage({ language }));
    },
  })
)(LanguagePreferences);
