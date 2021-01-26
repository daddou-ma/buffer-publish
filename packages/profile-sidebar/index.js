import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { actions as modalActions } from '@bufferapp/publish-modals';
import {
  getMatch,
  campaignsPage,
  profileTabPages,
} from '@bufferapp/publish-routes';
import ProfileSidebar from './components/ProfileSidebar';
import { shouldGoToProfile } from './utils';
import { actions } from './reducer';

export default hot(
  connect(
    (state, ownProps) => {
      return {
        loading: state.profileSidebar.loading,
        selectedProfile: state.profileSidebar.selectedProfile,
        selectedProfileId: ownProps.profileId,
        profiles: state.profileSidebar.profiles,
        translations: state.i18n.translations['profile-sidebar'],
        profileLimit: state.organizations.selected?.profileLimit,
        hasInstagram: state.profileSidebar.hasInstagram,
        hasFacebook: state.profileSidebar.hasFacebook,
        hasTwitter: state.profileSidebar.hasTwitter,
        isSearchPopupVisible: state.profileSidebar.isSearchPopupVisible,
        hasCampaignsFlip: state.organizations.selected?.hasCampaignsFeature,
        canManageSocialAccounts:
          state.organizations.selected?.canManageSocialAccounts,
        ownerEmail: state.organizations.selected?.ownerEmail,
        isCampaignsSelected: !!getMatch({
          pathname: state.router?.location?.pathname,
          route: campaignsPage.route,
        }),
        showUpgradeToProCta: state.organizations.selected?.showUpgradeToProCta,
      };
    },
    (dispatch, ownProps) => ({
      onProfileClick: profile => {
        if (shouldGoToProfile(profile, ownProps)) {
          dispatch(
            profileTabPages.goTo({
              profileId: profile.id,
              tabId: ownProps.tabId,
            })
          );
          dispatch(
            actions.selectProfile({
              profile,
            })
          );
        }
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
      onCampaignsButtonClick: () => {
        dispatch(campaignsPage.goTo());
      },
    })
  )(ProfileSidebar)
);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
