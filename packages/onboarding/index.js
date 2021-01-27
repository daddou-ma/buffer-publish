import { connect } from 'react-redux';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions } from './reducer';

import OnboardingManager from './components/OnboardingManager';

export default connect(
  state => ({
    translations: state.i18n.translations['onboarding-page'],
    canSeeOnboardingPage: state.onboarding.canSeeOnboardingPage,
    showUpgradeToProCta: state.organizations.selected?.showUpgradeToProCta,
    profileLimit: state.organizations.selected?.profileLimit,
    connectChannelsURL: state.globalAccount.shouldRedirectToAccountChannels
      ? getURL.getAccountChannelsURL()
      : getURL.getConnectSocialAccountURL(),
    manageChannelsURL: state.globalAccount.shouldRedirectToAccountChannels
      ? getURL.getAccountChannelsURL()
      : getURL.getManageSocialAccountURL(),
    accountChannelsURL:
      state.globalAccount.shouldRedirectToAccountChannels &&
      getURL.getAccountChannelsURL(),
  }),
  dispatch => ({
    onConnectSocialAccountOnboardingClick: () => {
      dispatch(actions.handleConnectSocialAccountOnboardingClick());
    },
    onSkipStep: () => {
      dispatch(actions.handleSkipStep());
    },
  })
)(OnboardingManager);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
