import { connect } from 'react-redux';
import {
  newBusinessTrialists,
  preferencesGeneral,
  organization,
} from '@bufferapp/publish-routes';
import { actions as modalActions } from '@bufferapp/publish-modals';
import { getURL } from '@bufferapp/publish-server/formatters/src';

import { actions } from './reducer';
import AppShell from './components/AppShell';

export default connect(
  state => ({
    user: {
      email: state.user.email,
      name: state.user.name,
    },
    bannerOptions: state.appShell.bannerOptions,
    bannerKey: state.appShell.bannerKey,
    showReturnToClassic: state.user.showReturnToClassic,
    showSwitchPlan: state.user.is_free_user && !state.user.isBusinessTeamMember,
    showManageTeam: state.user.is_free_user,
    showStartProTrial:
      state.user.canStartProTrial && !state.user.isBusinessTeamMember,
    hideAppShell:
      state.onboarding.canSeeOnboardingPage &&
      state.router.location.pathname === newBusinessTrialists.route,
    hideMenuItems: state.user.canSeePaydayPage && state.user.isOnAwesomePlan,
    enabledProducts: state.appShell.enabledProducts,
    featureFlips: state.appShell.featureFlips,
    /**
     * Org Switcher
     * Needs organizations and profiles.
     */
    hasOrgSwitcherFeature: state.user.hasOrgSwitcherFeature,
    organizations: state.organizations.list,
    selectedOrganizationId: state.organizations.selected?.id,
    profiles: state.publishProfiles,
    isImpersonation: state.appShell.isImpersonation,
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
      dispatch(organization.goTo({ orgId: organizationId }));
    },
  })
)(AppShell);

export reducer from './reducer';
export middleware from './middleware';
