import { connect } from 'react-redux';

import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import { actions as generalSettingsActions } from '@bufferapp/publish-general-settings';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { trackAction } from '@bufferapp/publish-data-tracking';

import { actions } from './reducer';
import { formatPostLists, openCalendarWindow } from './util/';
import QueuedPosts from './components/QueuedPosts';

export default connect(
  (state, ownProps) => {
    const profileId = ownProps.profileId;
    const profileQueuePosts = state.queue.byProfileId[profileId];
    const profileData = state.profileSidebar.profiles.find(p => p.id === ownProps.profileId);
    const isLockedProfile = state.profileSidebar.isLockedProfile;

    if (isLockedProfile) {
      return {
        loading: false,
        isLockedProfile,
      };
    }
    if (profileQueuePosts && profileData) {
      return {
        loading: profileQueuePosts.loading,
        loadingMore: profileQueuePosts.loadingMore,
        moreToLoad: profileQueuePosts.moreToLoad,
        page: profileQueuePosts.page,
        postLists: formatPostLists({
          isManager: profileData.isManager,
          posts: profileQueuePosts.posts,
          scheduleSlotsEnabled: !state.appSidebar.user.is_free_user,
          schedules: profileData.schedules,
          profileTimezone: profileData.timezone,
          weekStartsOnMonday: state.appSidebar.user.week_starts_monday,
          hasTwentyFourHourTimeFormat: state.appSidebar.user.hasTwentyFourHourTimeFormat,
          profileService: profileData.service,
          hasDailyViewFlip: state.appSidebar.user.hasDailyViewFlip,
        }),
        draggingEnabled: !profileData.paused && state.appSidebar.user.is_free_user,
        showEmptyQueueMessage: profileQueuePosts.total <= 0 && state.appSidebar.user.is_free_user,
        enabledApplicationModes: state.queue.enabledApplicationModes,
        showComposer: state.queue.showComposer,
        environment: state.environment.environment,
        editMode: state.queue.editMode,
        editingPostId: state.queue.editingPostId,
        subprofiles: profileData.subprofiles || [],
        isInstagramProfile: profileData.type === 'instagram',
        isInstagramBusiness: profileData.isInstagramBusiness,
        paused: profileData.paused,
        isManager: profileData.isManager,
        isBusinessAccount: profileData.business,
        showInstagramDirectPostingModal: state.modals.showInstagramDirectPostingModal,
        isBusinessOnInstagram: state.queue.isBusinessOnInstagram,
        isInstagramLoading: state.queue.isInstagramLoading,
        hasInstagramFeatureFlip: state.appSidebar.user.features ? state.appSidebar.user.features.includes('new_ig_authentication') : false,
      };
    }
    return {};
  },

  (dispatch, ownProps) => ({
    onEditClick: (post) => {
      dispatch(actions.handleEditClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onEmptySlotClick: (post) => {
      dispatch(actions.handleEmptySlotClick({
        emptySlotData: post,
        profileId: ownProps.profileId,
      }));
    },
    onDeleteClick: (post) => {
      dispatch(actions.handleDeleteClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDeleteConfirmClick: (post) => {
      dispatch(actions.handleDeleteConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onCancelConfirmClick: (post) => {
      dispatch(actions.handleCancelConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onRequeueClick: (post) => {
      dispatch(actions.handleRequeue({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onShareNowClick: (post) => {
      dispatch(actions.handleShareNowClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClick: (post) => {
      dispatch(actions.handleImageClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClose: (post) => {
      dispatch(actions.handleImageClose({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClickNext: (post) => {
      dispatch(actions.handleImageClickNext({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClickPrev: (post) => {
      dispatch(actions.handleImageClickPrev({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDropPost: ({ dragIndex, hoverIndex, keyboardDirection, commit }) => {
      dispatch(actions.onDropPost({
        dragIndex,
        hoverIndex,
        keyboardDirection,
        commit,
        profileId: ownProps.profileId,
      }));
    },
    onUnpauseClick: () => {
      dispatch(profileSidebarActions.onUnpauseClick({ profileId: ownProps.profileId }));
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
    onSetUpDirectPostingClick: () => {
      dispatch(generalSettingsActions.handleSetUpDirectPostingClick({
        profileId: ownProps.profileId,
      }));
    },
    onDirectPostingClick: () => {
      dispatch(dataFetchActions.fetch({
        name: 'checkInstagramBusiness',
        args: {
          profileId: ownProps.profileId,
          callbackAction: modalsActions.showInstagramDirectPostingModal({
            profileId: ownProps.profileId,
          }),
        },
      }));
    },
    onCheckInstagramBusinessClick: () => {
      dispatch(dataFetchActions.fetch({
        name: 'checkInstagramBusiness',
        args: {
          profileId: ownProps.profileId,
          recheck: true,
        },
      }));
    },
    onHideInstagramModal: () => {
      dispatch(actions.handleHideInstagramModal());
    },
    onCalendarClick: (weekOrMonth, trackingAction) => {
      const openAfterTrack = () => {
        if (weekOrMonth === 'week' || weekOrMonth === 'month') {
          openCalendarWindow(ownProps.profileId, weekOrMonth);
        }
      };
      trackAction({ location: 'queue', action: trackingAction }, {
        success: openAfterTrack,
        error: openAfterTrack,
      });
    },
  }),
)(QueuedPosts);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
