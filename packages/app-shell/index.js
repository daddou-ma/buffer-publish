import { connect } from 'react-redux';
import {
  newBusinessTrialists,
  preferencesGeneral,
  organization,
  plansPage,
} from '@bufferapp/publish-routes';
import { getOrgsAlfabeticalOrder } from '@bufferapp/publish-data-organizations/utils/';
import { getURL } from '@bufferapp/publish-server/formatters';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';

import { actions } from './reducer';
import AppShell from './components/AppShell';

export default connect(
  state => {
    const shouldRedirectToAccountChannels =
      state.organizations.selected?.shouldRedirectToAccountChannels;
    const manageChannelsURL = shouldRedirectToAccountChannels
      ? getURL.getAccountChannelsURL()
      : getURL.getManageSocialAccountURL();
    return {
      user: {
        email: state.user.email || '...',
        name: state.user.name || '...',
      },
      bannerOptions: state.appShell.bannerOptions,
      bannerKey: state.appShell.bannerKey,
      shouldShowUpgradeButton:
        state.organizations.selected?.shouldShowUpgradeButton,
      manageChannelsURL,
      hideAppShell:
        state.onboarding.canSeeOnboardingPage &&
        state.router.location.pathname === newBusinessTrialists.route,
      enabledProducts: state.appShell.enabledProducts,
      featureFlips: state.appShell.featureFlips,
      /**
       * Org Switcher
       * Needs organizations and profiles.
       */
      canSeeOrgSwitcher: state.organizations.canSeeOrgSwitcher,
      organizations: getOrgsAlfabeticalOrder(state.organizations.list) || [],
      selectedOrganizationId: state.organizations.selected?.id,
      profiles: state.profileSidebar.profileList,
      isImpersonation: state.appShell.isImpersonation,
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
      dispatch(organization.goTo({ orgId: organizationId }));
    },
  })
)(AppShell);

export { default as reducer } from './reducer';
export { default as middleware } from './middleware';
