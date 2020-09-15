import { profileChildTabPages, plansPage } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';

import TabNavigation from './components/TabNavigation';
import { actions } from './reducer';

// default export = container
export default connect(
  (state, ownProps) => ({
    selectedTabId: ownProps.tabId,
    selectedChildTabId: ownProps.childTabId,
    shouldShowUpgradeButton: state.user.shouldShowUpgradeButton,
    shouldShowNestedSettingsTab: ownProps.tabId === 'settings',
    shouldShowNestedAnalyticsTab: ownProps.tabId === 'analytics',
    shouldHideAdvancedAnalytics:
      state.profileSidebar.selectedProfile.type === 'linkedin' ||
      state.profileSidebar.selectedProfile.type === 'pinterest' ||
      state.profileSidebar.selectedProfile.shouldHideAdvancedAnalytics,
    profileId: ownProps.profileId,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isDisconnectedProfile: state.profileSidebar.selectedProfile.isDisconnected,
    draftsNeedApprovalCount: state.tabs.draftsNeedApprovalCount,
    draftsCount: state.tabs.draftsCount,
    canReconnectChannels: state.user.canReconnectChannels,
    hasApprovalFeature: state.organizations?.selected?.hasApprovalFeature,
    hasDraftsFeature: state.organizations?.selected?.hasDraftsFeature,
    hasGridFeature: state.organizations?.selected?.hasGridFeature,
    hasStoriesFeature: state.organizations?.selected?.hasStoriesFeature,
    isInstagramProfile:
      state.profileSidebar.selectedProfile.service === 'instagram',
    isManager: state.profileSidebar.selectedProfile.isManager,
  }),

  (dispatch, ownProps) => ({
    onTabClick: tabId => {
      const { profileId } = ownProps;
      dispatch(
        actions.selectTab({
          tabId,
          profileId,
        })
      );
    },
    onUpgradeButtonClick: () => {
      dispatch(plansPage.goTo());
    },
    onChildTabClick: childTabId => {
      const { tabId, profileId } = ownProps;
      dispatch(
        profileChildTabPages.goTo({
          tabId,
          childTabId,
          profileId,
        })
      );
    },
  })
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
