import { connect } from 'react-redux';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions } from './reducer';
import getOnboardingConnectURLs from './utils/index';

import OnboardingManager from './components/OnboardingManager';

export default connect(
  state => {
    const { shouldRedirectToAccountChannels } = state.globalAccount;
    const accountChannelsURL =
      shouldRedirectToAccountChannels && getURL.getAccountChannelsURL();
    return {
      translations: state.i18n.translations['onboarding-page'],
      canSeeOnboardingPage: state.onboarding.canSeeOnboardingPage,
      showUpgradeToProCta: state.organizations.selected?.showUpgradeToProCta,
      profileLimit: state.organizations.selected?.profileLimit,
      connectChannelsURL:
        accountChannelsURL || getURL.getConnectSocialAccountURL(),
      manageChannelsURL:
        accountChannelsURL || getURL.getManageSocialAccountURL(),
      onboardingConnectURLs: getOnboardingConnectURLs(accountChannelsURL),
    };
  },
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
