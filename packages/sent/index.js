// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { actions as campaignListActions } from '@bufferapp/publish-campaigns-list';
import { formatPostLists } from '@bufferapp/publish-queue/util';
// load the presentational component
import { actions } from './reducer';
import SentPosts from './components/SentPosts';

// default export = container
export default connect(
  (state, ownProps) => {
    const { profileId } = ownProps;
    const currentProfile = state.sent.byProfileId[profileId];
    if (currentProfile) {
      const profileData = state.profileSidebar.profiles.find(
        p => p.id === profileId
      );

      return {
        header: currentProfile.header,
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        items: formatPostLists({
          isManager: profileData.isManager,
          weekStartsOnMonday: state.user.week_starts_monday,
          profileService: profileData.service,
          profileTimezone: profileData.timezone,
          scheduleSlotsEnabled: false,
          posts: currentProfile.posts,
          orderBy: 'due_at',
          sortOrder: 'desc',
        }),
        total: currentProfile.total,
        profileServiceType: profileData.service_type,
        profileService: profileData.service,
        showComposer: state.sent.showComposer,
        editMode: state.sent.editMode,
        isManager: state.profileSidebar.selectedProfile.isManager,
        isBusinessAccount: state.profileSidebar.selectedProfile.business,
        showAnalyzeBannerAfterFirstPost:
          state.profileSidebar.selectedProfile.shouldHideAdvancedAnalytics,
        isLockedProfile: state.profileSidebar.isLockedProfile,
        isDisconnectedProfile:
          state.profileSidebar.selectedProfile.isDisconnected,
        analyzeCrossSale: state.user.analyzeCrossSale,
        hasFirstCommentFlip: state.user.hasFirstCommentFeature,
        hasCampaignsFeature: state.user.hasCampaignsFeature,
        linkShortening: state.generalSettings.linkShortening,
        hasBitlyPosts: currentProfile.hasBitlyPosts,
        shouldDisplayBitly: !state?.productFeatures?.isFreeUser,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onShareAgainClick: ({ post }) => {
      dispatch(
        actions.handleShareAgainClick({
          post,
          profileId: ownProps.profileId,
        })
      );
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
    onCampaignTagClick: campaignId => {
      dispatch(
        actions.handleCampaignTagClick({
          campaignId,
        })
      );
    },
    fetchSentPosts: () => {
      dispatch(
        actions.fetchSentPosts({
          profileId: ownProps.profileId,
        })
      );
    },
    fetchCampaignsIfNeeded: () => {
      dispatch(campaignListActions.fetchCampaignsIfNeeded());
    },
  })
)(SentPosts);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
