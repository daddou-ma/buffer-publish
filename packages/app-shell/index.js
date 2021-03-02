import { connect } from 'react-redux';
import {
  newBusinessTrialists,
  preferencesGeneral,
  organization,
} from '@bufferapp/publish-routes';
import { actions as modalActions } from '@bufferapp/publish-modals';
import { getURL } from '@bufferapp/publish-server/formatters';

import { actions } from './reducer';
import AppShell from './components/AppShell';

export default connect(
  state => ({
    bannerOptions: state.appShell.bannerOptions,
    bannerKey: state.appShell.bannerKey,
    showSwitchPlan: state.organizations.selected?.showUpgradeToProCta,
    showManageTeam: state.organizations.selected?.hasAccessTeamPanel,
    hideAppShell:
      state.onboarding.canSeeOnboardingPage &&
      state.router.location.pathname === newBusinessTrialists.route,
    /**
     * Org Switcher
     * Needs profiles.
     */
    profiles: state.profileSidebar.profileList,
  }),

  dispatch => ({
    openPreferences() {
      dispatch(preferencesGeneral.goTo());
    },
    returnToClassic() {
      window.location = getURL.getBackToClassicNewPublishBufferURL();
    },
    switchPlan() {
      dispatch(
        modalActions.showSwitchPlanModal({ source: 'app_shell', plan: 'pro' })
      );
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

export reducer from './reducer';
export middleware from './middleware';
