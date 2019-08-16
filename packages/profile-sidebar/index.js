import { push } from 'connected-react-router';
import { generateProfilePageRoute } from '@bufferapp/publish-routes';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { actions as modalActions } from '@bufferapp/publish-modals';
import { actions as tabsActions } from '@bufferapp/publish-tabs';
import ProfileSidebar from './components/ProfileSidebar';
import { actions } from './reducer';

const { formatAnalyticsProfileObj } = require('./analytics');

const reorderProfilesByUnlocked = profiles => (
  // orders unlocked profiles first, followed by locked
  profiles.sort((a, b) => (a.disabled - b.disabled))
);

export default hot(connect(
  (state, ownProps) => ({
    loading: state.profileSidebar.loading,
    selectedProfile: state.profileSidebar.selectedProfile,
    selectedProfileId: ownProps.profileId,
    profiles: reorderProfilesByUnlocked(state.profileSidebar.profiles),
    translations: state.i18n.translations['profile-sidebar'],
    profileLimit: state.appSidebar.user.profile_limit,
    hasInstagram: state.profileSidebar.hasInstagram,
    hasFacebook: state.profileSidebar.hasFacebook,
    hasTwitter: state.profileSidebar.hasTwitter,
    isSearchPopupVisible: state.profileSidebar.isSearchPopupVisible,
  }),
  (dispatch, ownProps) => ({
    onProfileClick: (profile) => {
      if (profile.id !== ownProps.profileId) {
        dispatch(tabsActions.selectTab({
          tabId: ownProps.tabId,
          profileId: profile.id,
        }));
        dispatch(actions.selectProfile({
          profile,
        }));
        if (profile.isAnalyticsSupported) {
          // need to match analyze action to fetch data for new selected profile
          dispatch({
            type: 'PROFILE_SELECTOR__SELECT_PROFILE',
            profile: formatAnalyticsProfileObj(profile),
          });
        }
      }
    },
    onDropProfile: ({ commit, profileLimit, dragIndex, hoverIndex }) => {
      dispatch(actions.onDropProfile({
        commit,
        profileLimit,
        dragIndex,
        hoverIndex,
      }));
    },
    onManageSocialAccountClick: () => {
      dispatch(actions.handleManageSocialAccountClick());
    },
    showProfilesDisconnectedModal: () => {
      dispatch(modalActions.showProfilesDisconnectedModal());
    },
    showSwitchPlanModal: () => {
      dispatch(modalActions.showSwitchPlanModal({ source: 'app_header' }));
    },
    goToConnectSocialAccount: () => {
      dispatch(actions.handleConnectSocialAccount());
    },
    onSearchProfileChange: (value) => {
      dispatch(actions.handleSearchProfileChange({ value }));
    },
  }),
)(ProfileSidebar));

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
