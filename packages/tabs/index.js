import { profileChildTabPages, plansPage } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';

import TabNavigation from './components/TabNavigation';
import { actions } from './reducer';

// default export = container
export default connect(
  (state, ownProps) => ({
    isBusinessAccount: state.profileSidebar.selectedProfile.business,
    isManager: state.profileSidebar.selectedProfile.isManager,
    selectedTabId: ownProps.tabId,
    selectedChildTabId: ownProps.childTabId,
    onProTrial:
      state.user.trial?.onTrial &&
      !state.profileSidebar.selectedProfile.business,
    shouldShowUpgradeCta:
      state.user.is_free_user && !state.user.isBusinessTeamMember,
    shouldShowUpgradeButton:
      state.user.plan === 'free' ||
      state.user.plan === 'pro' ||
      state.user.plan === 'solo_premium_business' ||
      state.user.plan === 'premium_business',
    shouldShowNestedSettingsTab: ownProps.tabId === 'settings',
    shouldShowNestedAnalyticsTab: ownProps.tabId === 'analytics',
    shouldHideAdvancedAnalytics:
      state.profileSidebar.selectedProfile.type === 'linkedin' ||
      state.profileSidebar.selectedProfile.type === 'pinterest' ||
      state.profileSidebar.selectedProfile.shouldHideAdvancedAnalytics,
    profileId: ownProps.profileId,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isDisconnectedProfile: state.profileSidebar.selectedProfile.isDisconnected,
    isInstagramProfile: state.generalSettings.isInstagramProfile,
    selectedProfile: state.profileSidebar.selectedProfile,
    hasStoriesFlip: state.user.features?.includes('stories_groups') ?? false,
    draftsNeedApprovalCount: state.tabs.draftsNeedApprovalCount,
    draftsCount: state.tabs.draftsCount,
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
