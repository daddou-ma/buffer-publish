import { connect } from 'react-redux';
import { plansPage } from '@bufferapp/publish-routes';
import { getURL } from '@bufferapp/publish-server/formatters';
import TabNavigation from './components/TabNavigation';

// default export = container
export default connect(
  state => {
    const { showProPaywall, showFreePaywall } =
      state.organizations.selected || {};
    return {
      profileNavTabs: state.profileNav.profileNavTabs,
      profileId: state.profileSidebar.selectedProfile.id,
      showNestedAnalyticsTab:
        state.profileNav.selectedTabId === 'analytics' &&
        !state.profileSidebar.selectedProfile.isLockedProfile,
      showNestedSettingsTab:
        state.profileNav.selectedTabId === 'settings' &&
        !state.profileSidebar.selectedProfile.isLockedProfile,
      showUpgradeButton: state.organizations.selected?.shouldShowUpgradeButton,
      showReconnectButton:
        state.profileSidebar.selectedProfile.isDisconnected &&
        state.organizations.selected?.canReconnectChannels,
      draftsNeedApprovalCount: state.profileNav.draftsNeedApprovalCount,
      draftsCount: state.profileNav.draftsCount,
      reconnectURL: state.organizations.selected?.shouldRedirectToAccountChannels
        ? getURL.getAccountChannelsURL()
        : getURL.getManageSocialAccountURL(),
      showPaywallTag: showProPaywall || showFreePaywall,
    };
  },
  dispatch => ({
    onUpgradeButtonClick: () => {
      dispatch(plansPage.goTo());
    },
  })
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
