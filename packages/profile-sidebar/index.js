import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { actions as modalActions } from '@bufferapp/publish-modals';
import { actions as tabsActions } from '@bufferapp/publish-tabs';
import ProfileSidebar from './components/ProfileSidebar';
import { actions } from './reducer';

const reorderProfilesByUnlocked = profiles =>
  // orders unlocked profiles first, followed by locked
  profiles.sort((a, b) => a.disabled - b.disabled);

export default hot(
  connect(
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
      onProfileClick: profile => {
        if (profile && profile.id !== ownProps.profileId) {
          dispatch(
            tabsActions.selectTab({
              tabId: ownProps.tabId,
              profileId: profile.id,
            })
          );
          dispatch(
            actions.selectProfile({
              profile,
            })
          );
        }
      },
      onDropProfile: ({ commit, profileLimit, dragIndex, hoverIndex }) => {
        dispatch(
          actions.onDropProfile({
            commit,
            profileLimit,
            dragIndex,
            hoverIndex,
          })
        );
      },
      onManageSocialAccountClick: () => {
        dispatch(actions.handleManageSocialAccountClick());
      },
      showSwitchPlanModal: () => {
        dispatch(
          modalActions.showSwitchPlanModal({
            source: 'app_header',
            plan: 'pro',
          })
        );
      },
      goToConnectSocialAccount: () => {
        dispatch(actions.handleConnectSocialAccount());
      },
      onSearchProfileChange: value => {
        dispatch(actions.handleSearchProfileChange({ value }));
      },
    })
  )(ProfileSidebar)
);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
