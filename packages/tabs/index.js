import { push } from 'connected-react-router';
import { generateProfilePageRoute, generateChildTabRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { trackAction } from '@bufferapp/publish-data-tracking';

import TabNavigation from './components/TabNavigation';


// default export = container
export default connect(
  (state, ownProps) => ({
    isBusinessUser: state.appSidebar.user.is_business_user,
    isBusinessAccount: state.profileSidebar.selectedProfile.business,
    isManager: state.profileSidebar.selectedProfile.isManager,
    selectedTabId: ownProps.tabId,
    selectedChildTabId: ownProps.childTabId,
    shouldShowUpgradeCta: state.appSidebar.user.is_free_user,
    shouldShowNestedSettingsTab: ownProps.tabId === 'settings',
    shouldShowNestedAnalyticsTab: ownProps.tabId === 'analytics',
    profileId: ownProps.profileId,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isInstagramProfile: state.generalSettings.isInstagramProfile,
    hasLinkInBioFeatureFlip: state.appSidebar.user.features ? state.appSidebar.user.features.includes('instagram-link-bio-grid') : false,
  }),
  (dispatch, ownProps) => ({
    onTabClick: (tabId) => {
      const profileId = ownProps.profileId;
      trackAction({ location: 'tabs', action: `click_tab_${tabId}`, metadata: { profileId } });
      dispatch(push(generateProfilePageRoute({
        tabId,
        profileId,
      })));
    },
    onUpgradeButtonClick: (plan) => {
      if (plan === 'pro') {
        dispatch(modalsActions.showUpgradeModal({ source: 'app_header' }));
      } else if (plan === 'b4b') {
        const go = () => window.location.assign('https://buffer.com/business?utm_campaign=app_header');
        trackAction({ location: 'header', action: 'clicked_b4b_learn_more' }, {
          success: go,
          error: go,
        });
      }
    },
    onChildTabClick: (childTabId) => {
      const tabId = ownProps.tabId;
      const profileId = ownProps.profileId;
      trackAction({ location: 'tabs', action: `click_tab_${tabId}_${childTabId}`, metadata: { profileId } });
      dispatch(push(generateChildTabRoute({
        tabId,
        childTabId,
        profileId,
      })));
    },
  }),
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
