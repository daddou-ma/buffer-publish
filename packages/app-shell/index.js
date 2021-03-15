import { connect } from 'react-redux';
import {
  newBusinessTrialists,
  preferencesGeneral,
  organization,
  plansPage,
} from '@bufferapp/publish-routes';
import { actions as modalActions } from '@bufferapp/publish-modals';
import { getURL } from '@bufferapp/publish-server/formatters';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

import { actions } from './reducer';
import AppShell from './components/AppShell';

export default connect(
  state => {
    const shouldRedirectToAccountChannels =
      state.organizations.selected?.shouldRedirectToAccountChannels;

    return {
      bannerOptions: state.appShell.bannerOptions,
      bannerKey: state.appShell.bannerKey,
      manageChannelsURL: shouldRedirectToAccountChannels
        ? getURL.getAccountChannelsURL()
        : getURL.getManageSocialAccountURL(),
      shouldShowUpgradeButton:
        state.organizations.selected?.shouldShowUpgradeButton,
      hideAppShell:
        state.onboarding.canSeeOnboardingPage &&
        state.router.location.pathname === newBusinessTrialists.route,
      /**
      * Org Switcher
      * Needs profiles.
      */
      profiles: state.profileSidebar.profileList,
    };
  },
  dispatch => ({
    openPreferences() {
      dispatch(preferencesGeneral.goTo());
    },
    showPlans() {
      dispatch(
        analyticsActions.trackEvent('Upgrade Path Viewed', {
          upgradePathName: 'app-shell-userMenu-upgrade',
        })
      );
      dispatch(plansPage.goTo());
    },
    onCloseBanner({ key }) {
      dispatch(actions.onCloseBanner({ key }));
    },
    switchOrganization(organizationId) {
      dispatch(
        organization.goTo({
          orgId: organizationId,
        })
      );
    },
  })
)(AppShell);

export { default as reducer } from './reducer';
export { default as middleware } from './middleware';
