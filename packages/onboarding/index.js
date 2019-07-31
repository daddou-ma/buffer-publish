import { connect } from 'react-redux';
import { actions } from './reducer';

import OnboardingPage from './components/OnboardingPage';

export default connect(
  state => ({
    translations: state.i18n.translations['onboarding-page'],
  }),
  dispatch => ({
    onConnectSocialAccountClick: () => {
      dispatch(actions.handleConnectSocialAccountClick());
    },
  }),
)(OnboardingPage);

export { actions, actionTypes } from './reducer';
export middleware from './middleware';
