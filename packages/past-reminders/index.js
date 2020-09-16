// component vs. container https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0
import { connect } from 'react-redux';
import { actions as previewActions } from '@bufferapp/publish-story-preview';
import { actions as campaignListActions } from '@bufferapp/publish-campaigns-list';
import { formatPostLists } from '@bufferapp/publish-queue/util';
// load the presentational component
import { actions } from './reducer';
import PastRemindersWrapper from './components/PastRemindersWrapper';
import { header, subHeader } from './components/PastRemindersPosts/postData';

export default connect(
  (state, ownProps) => {
    const { profileId } = ownProps;
    const currentProfile = state.pastReminders.byProfileId[profileId];
    const profileData = state.profileSidebar.profiles.find(
      p => p.id === ownProps.profileId
    );

    if (currentProfile) {
      return {
        header,
        subHeader,
        viewType: state.pastReminders.viewType,
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
        showComposer: state.pastReminders.showComposer,
        showStoriesComposer: state.pastReminders.showStoriesComposer,
        editMode: state.pastReminders.editMode,
        isManager: state.profileSidebar.selectedProfile.isManager,
        isLockedProfile: state.profileSidebar.isLockedProfile,
        isDisconnectedProfile:
          state.profileSidebar.selectedProfile.isDisconnected,
        userData: state.user,
        showStoryPreview: state.pastReminders.showStoryPreview,
        hasShareAgainFeature: state.organizations.selected.hasShareAgainFeature,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onShareAgainClick: ({ post }, viewType) => {
      if (viewType && viewType === 'stories') {
        dispatch(
          actions.handleShareStoryGroupAgain({
            post,
            profileId: ownProps.profileId,
          })
        );
      } else {
        dispatch(
          actions.handleShareAgainClick({
            post,
            profileId: ownProps.profileId,
          })
        );
      }
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
    handleCloseStoriesComposer: () => {
      dispatch(actions.handleCloseStoriesComposer());
    },
    onMobileClick: ({ post }, viewType) => {
      if (viewType && viewType === 'stories') {
        dispatch(
          actions.handleStoryGroupMobileClick({
            post,
            profileId: ownProps.profileId,
          })
        );
      } else {
        dispatch(
          actions.handleMobileClick({
            post,
          })
        );
      }
    },
    onToggleViewType: viewType => {
      dispatch(
        actions.handleToggleViewType({
          profileId: ownProps.profileId,
          viewType,
        })
      );
    },
    onPreviewClick: ({ stories, profileId, id, scheduledAt, serviceId }) => {
      dispatch(
        previewActions.handlePreviewClick({
          stories,
          profileId,
          id,
          scheduledAt,
        })
      );
      dispatch(actions.handlePreviewClick());
    },
    onClosePreviewClick: () => {
      dispatch(actions.handleClosePreviewClick());
    },
    fetchCampaignsIfNeeded: () => {
      dispatch(campaignListActions.fetchCampaignsIfNeeded());
    },
  })
)(PastRemindersWrapper);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
