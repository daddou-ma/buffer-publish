import { connect } from 'react-redux';
import {
  newBusinessTrialists,
  preferencesGeneral,
  organization,
  plansPage,
} from '@bufferapp/publish-routes';
import { getURL } from '@bufferapp/publish-server/formatters';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';

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
          upgradePathName: SEGMENT_NAMES.APP_SHELL_USER_MENU_UPGRADE,
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
