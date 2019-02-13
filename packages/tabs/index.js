import { push } from 'react-router-redux';
import { generateProfilePageRoute, generateChildTabRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import TabNavigation from './components/TabNavigation';


// default export = container
export default connect(
  (state, ownProps) => ({
    isBusinessAccount: state.profileSidebar.selectedProfile.business,
    isManager: state.profileSidebar.selectedProfile.isManager,
    selectedTabId: ownProps.tabId,
    selectedChildTabId: ownProps.childTabId,
    shouldShowUpgradeCta: state.appSidebar.user.is_free_user,
    shouldShowNestedSettingsTab: ownProps.tabId === 'settings',
    profileId: ownProps.profileId,
    isLockedProfile: state.profileSidebar.isLockedProfile,
    isInstagramProfile: state.generalSettings.isInstagramProfile,
  }),
  (dispatch, ownProps) => ({
    onTabClick: tabId => dispatch(push(generateProfilePageRoute({
      tabId,
      profileId: ownProps.profileId,
    }))),
    showUpgradeModal: () => dispatch(modalsActions.showUpgradeModal({ source: 'app_header' })),
    onChildTabClick: childTabId => dispatch(push(generateChildTabRoute({
      tabId: ownProps.tabId,
      childTabId,
      profileId: ownProps.profileId,
    }))),
  }),
)(TabNavigation);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
