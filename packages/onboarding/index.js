import { connect } from 'react-redux';
import { actions } from './reducer';

import OnboardingManager from './components/OnboardingManager';

export default connect(
  state => ({
    translations: state.i18n.translations['onboarding-page'],
    canSeeOnboardingPage: state.onboarding.canSeeOnboardingPage,
  }),
  dispatch => ({
    onConnectSocialAccountClick: () => {
      dispatch(actions.handleConnectSocialAccountClick());
    },
    onSkipStep: () => {
      dispatch(actions.handleSkipStep());
    },
  }),
)(OnboardingManager);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
