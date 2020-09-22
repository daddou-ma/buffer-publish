import { connect } from 'react-redux';
import { actions } from './reducer';

import OnboardingManager from './components/OnboardingManager';

export default connect(
  state => ({
    translations: state.i18n.translations['onboarding-page'],
    canSeeOnboardingPage: state.onboarding.canSeeOnboardingPage,
    showUpgradeToProCta: state.organizations.selected?.showUpgradeToProCta,
    profileLimit: state.organizations.selected?.profileLimit,
  }),
  dispatch => ({
    onConnectSocialAccountOnboardingClick: () => {
      dispatch(actions.handleConnectSocialAccountOnboardingClick());
    },
    onSkipStep: () => {
      dispatch(actions.handleSkipStep());
    },
    onManageSocialAccountClick: () => {
      dispatch(actions.handleManageSocialAccountClick());
    },
    onConnectSocialAccountSidebarClick: () => {
      dispatch(actions.handleConnectSocialAccountSidebarClick());
    },
  })
)(OnboardingManager);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
