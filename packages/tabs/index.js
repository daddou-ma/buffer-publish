import { push } from 'connected-react-router';
import {
  generateChildTabRoute,
  plansPageRoute,
} from '@bufferapp/publish-routes';
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
      state.appSidebar.user.trial &&
      state.appSidebar.user.trial.onTrial &&
      !state.profileSidebar.selectedProfile.business,
    shouldShowUpgradeCta:
      state.appSidebar.user.is_free_user &&
      !state.appSidebar.user.isBusinessTeamMember,
    shouldShowUpgradeButton:
      state.appSidebar.user.plan === 'free' ||
      state.appSidebar.user.plan === 'pro' ||
      state.appSidebar.user.plan === 'solo_premium_business' ||
      state.appSidebar.user.plan === 'premium_business',
    shouldShowNestedSettingsTab: ownProps.tabId === 'settings',
    shouldShowNestedAnalyticsTab: ownProps.tabId === 'analytics',
    shouldHideAdvancedAnalytics:
      state.profileSidebar.selectedProfile.type === 'linkedin' ||
      state.profileSidebar.selectedProfile.type === 'pinterest' ||
      state.profileSidebar.selectedProfile.shouldHideAdvancedAnalytics,
    profileId: ownProps.profileId,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isInstagramProfile: state.generalSettings.isInstagramProfile,
    selectedProfile: state.profileSidebar.selectedProfile,
    canStartProTrial: state.appSidebar.user.canStartProTrial,
    hasStoriesFlip: state.appSidebar.user.features
      ? state.appSidebar.user.features.includes('stories_groups')
      : false,
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
      dispatch(push(plansPageRoute));
    },
    onChildTabClick: childTabId => {
      const { tabId, profileId } = ownProps;
      dispatch(
        push(
          generateChildTabRoute({
            tabId,
            childTabId,
            profileId,
          })
        )
      );
    },
  })
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
