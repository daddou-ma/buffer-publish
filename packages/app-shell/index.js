import { connect } from 'react-redux';
import {
  newBusinessTrialists,
  preferencesGeneral,
} from '@bufferapp/publish-routes';
import { actions as modalActions } from '@bufferapp/publish-modals';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions } from './reducer';
import AppShell from './components/AppShell';

export default connect(
  state => ({
    user: state.appShell.user,
    bannerOptions: state.appShell.bannerOptions,
    bannerKey: state.appShell.bannerKey,
    showReturnToClassic: state.appShell.showReturnToClassic,
    showSwitchPlan: state.appShell.showSwitchPlan,
    showManageTeam: state.appShell.showManageTeam,
    showStartProTrial: state.appShell.showStartProTrial,
    hideAppShell:
      state.onboarding.canSeeOnboardingPage &&
      state.router.location.pathname === newBusinessTrialists.route,
    hideMenuItems: state.appShell.hideMenuItems,
    enabledProducts: state.appShell.enabledProducts,
    featureFlips: state.appShell.featureFlips,
    organizations: state.organizations.list,
    selectedOrganizationId: state.organizations.selected?.id,
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
  })
)(AppShell);

export reducer from './reducer';
export middleware from './middleware';
