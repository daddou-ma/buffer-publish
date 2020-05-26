import { connect } from 'react-redux';
import LanguagePreferences from './components/LanguagePreferences';
import { actions } from './reducer';

export default connect(
  state => ({
    hasTranslationsFlip: state.user.features
      ? state.user.features?.includes('publish-translations')
      : false,
  }),
  dispatch => ({
    onSelectLanguage: language => {
      dispatch(actions.setUserLanguage({ language }));
    },
  })
)(LanguagePreferences);

// export reducer
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
