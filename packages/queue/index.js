import { connect } from 'react-redux';

import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import { actions as generalSettingsActions } from '@bufferapp/publish-general-settings';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { openBillingWindow } from '@bufferapp/publish-tabs/utils';
import { actions } from './reducer';

import QueuedPosts from './components/QueuedPosts';

const formatPostLists = (isManager, posts) => {
  const orderedPosts = Object.values(posts).sort((a, b) => a.due_at - b.due_at);
  let lastHeader = null;
  return orderedPosts.reduce((acc, post, index) => {
    if (lastHeader !== post.day) {
      lastHeader = post.day;
      acc.push({
        queueItemType: 'header',
        text: post.day,
        id: `header-${index}`,
        isManager,
      });
    }
    acc.push({
      queueItemType: 'post',
      isManager,
      index,
      ...post,
    });
    return acc;
  }, []);
};

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
        postLists: formatPostLists(
          profileData.isManager,
          profileQueuePosts.posts,
        ),
        total: profileQueuePosts.total,
        enabledApplicationModes: state.queue.enabledApplicationModes,
        showComposer: state.queue.showComposer,
        environment: state.environment.environment,
        editMode: state.queue.editMode,
        editingPostId: state.queue.editingPostId,
        showCalendar: profileQueuePosts.showCalendar,
        numberOfPostsByDate: profileQueuePosts.numberOfPostsByDate,
        subprofiles: profileData.subprofiles || [],
        isInstagramProfile: profileData.type === 'instagram',
        isInstagramBusiness: profileData.isInstagramBusiness,
        paused: profileData.paused,
        isManager: profileData.isManager,
        isBusinessAccount: profileData.business,
        showInstagramModal: state.queue.showInstagramModal,
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
    onCalendarToggleClick: () => {
      dispatch(actions.handleCalendarToggle({ profileId: ownProps.profileId }));
    },
    onMiniCalendarMonthChange: (startDate, endDate) => {
      dispatch(actions.handleMiniCalendarMonthChange({
        profileId: ownProps.profileId,
        startDate,
        endDate,
      }));
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
          callbackAction: actions.handleOpenInstagramModal({
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
    onClickUpgrade: (plan) => {
      if (plan === 'free') {
        dispatch(modalsActions.showUpgradeModal({ source: 'locked_profile' }));
      } else if (plan === 'pro') {
        openBillingWindow();
      }
    },
  }),
)(QueuedPosts);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
