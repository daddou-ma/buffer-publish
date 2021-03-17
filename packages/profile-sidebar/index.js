import { connect } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { getURL } from '@bufferapp/publish-server/formatters';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import {
  getMatch,
  campaignsPage,
  profileTabPages,
  plansPage,
} from '@bufferapp/publish-routes';
import ProfileSidebar from './components/ProfileSidebar';
import { shouldGoToProfile, getConnectDirectURLs } from './utils';
import { actions } from './reducer';

const reorderProfilesByUnlocked = profiles =>
  // orders unlocked profiles first, followed by locked
  profiles.sort((a, b) => a.disabled - b.disabled);

export default hot(
  connect(
    (state, ownProps) => {
      const cta = 'publish-app-sidebar-addProfile-1';
      const { isLoadingGlobalAccount } = state.globalAccount;

      const { shouldRedirectToAccountChannels } = state.organizations.selected;

      const accountChannelsURL =
        shouldRedirectToAccountChannels && getURL.getAccountChannelsURL();

      const shouldHideLockedChannels =
        shouldRedirectToAccountChannels || isLoadingGlobalAccount;

      const profiles = shouldHideLockedChannels
        ? state.profileSidebar.profiles
        : reorderProfilesByUnlocked(state.profileSidebar.profiles);

      const reachedChannelLimit =
        state.organizations.selected?.profileLimit <=
        state.organizations.selected?.profilesCount;

      return {
        loading: state.profileSidebar.loading,
        selectedProfile: state.profileSidebar.selectedProfile,
        selectedProfileId: ownProps.profileId,
        profiles,
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
        reachedChannelLimit,
        connectDirectURLs: getConnectDirectURLs({
          cta,
          accountChannelsURL,
        }),
        manageChannelsURL:
          accountChannelsURL || getURL.getManageSocialAccountURL(),
        shouldHideLockedChannels,
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
      onSearchProfileChange: value => {
        dispatch(actions.handleSearchProfileChange({ value }));
      },
      onCampaignsButtonClick: () => {
        dispatch(campaignsPage.goTo());
      },
      onAddChannelUpgradeClick: () => {
        dispatch(
          analyticsActions.trackEvent('Upgrade Path Viewed', {
            upgradePathName: SEGMENT_NAMES.PROFILE_LIMIT_SIDEBAR_UPGRADE,
          })
        );
        dispatch(plansPage.goTo());
      },
    })
  )(ProfileSidebar)
);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
