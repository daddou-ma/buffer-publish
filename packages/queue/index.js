import { connect } from 'react-redux';
import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar/reducer';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions as campaignListActions } from '@bufferapp/publish-campaigns-list';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { getURL } from '@bufferapp/publish-server/formatters/src';

import { actions } from './reducer';
import {
  formatPostLists,
  openCalendarWindow,
  isScheduleSlotsAvailable,
} from './util';
import QueuedPosts from './components/QueuedPosts';

export default connect(
  (state, ownProps) => {
    const { profileId } = ownProps;
    const queue = state.queue.byProfileId[profileId];
    const profileData = state.profileSidebar.profiles.find(
      p => p.id === ownProps.profileId
    );
    const { isLockedProfile } = state.profileSidebar;

    const queuePostsArray =
      queue &&
      queue.posts &&
      Object.keys(queue.posts).map(key => {
        return queue.posts[key];
      });

    const { days } = state.postingSchedule;
    const shouldDisplaySingleSlots =
      days.length > 0 &&
      days.every(day => day.times.length === 0 || day.paused);

    const pausedDays = days
      .filter(day => day.paused === true)
      .map(day => day.dayName);

    const hasAtLeastOneReminderPost =
      queuePostsArray &&
      queuePostsArray.some(
        post => post.postDetails && post.postDetails.isInstagramReminder
      );

    if (isLockedProfile) {
      return {
        loading: false,
        isLockedProfile,
      };
    }
    if (queue && profileData) {
      const { isDisconnected } = state.profileSidebar.selectedProfile;
      const isInstagramProfile = profileData.type === 'instagram';
      const shouldDisplayRetiringProfileBanner =
        isInstagramProfile && !profileData.isInstagramBusiness;

      return {
        preserveComposerStateOnClose: state.queue.preserveComposerStateOnClose,
        loading: queue.loading,
        loadingMore: queue.loadingMore,
        moreToLoad: queue.moreToLoad,
        page: queue.page,
        items: formatPostLists({
          isManager: profileData.isManager,
          posts: queue.posts,
          scheduleSlotsEnabled: true,
          schedules: profileData.schedules,
          profileTimezone: profileData.timezone,
          weekStartsOnMonday: state.user.week_starts_monday,
          weeksToShow: queue.page + 1,
          hasTwentyFourHourTimeFormat: state.user.hasTwentyFourHourTimeFormat,
          profileService: profileData.service,
          shouldDisplaySingleSlots,
          pausedDays,
        }),
        scheduleSlotsIsAvailable: isScheduleSlotsAvailable(
          profileData.schedules
        ),
        draggingEnabled: !profileData.paused,
        showEmptyQueueMessage: false, // @todo: Show this if they have no slots?
        showComposer: state.queue.showComposer,
        environment: state.environment.environment,
        editMode: state.queue.editMode,
        editingPostId: state.queue.editingPostId,
        subprofiles: profileData.subprofiles || [],
        isInstagramProfile,
        isInstagramBusiness: profileData.isInstagramBusiness,
        paused: profileData.paused,
        isManager: profileData.isManager,
        hasPushNotifications: profileData.hasPushNotifications,
        showInstagramDirectPostingModal:
          state.modals.showInstagramDirectPostingModal,
        isBusinessOnInstagram: state.queue.isBusinessOnInstagram,
        isInstagramLoading: state.queue.isInstagramLoading,
        hasFirstCommentFlip: state.user.hasFirstCommentFeature,
        hasCampaignsFeature: state.user.hasCampaignsFeature,
        hasCalendarFeature: state.organizations.selected.hasCalendarFeature,
        shouldDisplaySingleSlots,
        shouldDisplayDisconnectedBanner:
          !shouldDisplayRetiringProfileBanner && isDisconnected,
        shouldDisplayRetiringProfileBanner,
        shouldDisplayRemindersBanner:
          !shouldDisplayRetiringProfileBanner &&
          !isDisconnected &&
          !profileData.hasPushNotifications &&
          isInstagramProfile &&
          hasAtLeastOneReminderPost,
      };
    }
    return {
      items: [],
    };
  },

  (dispatch, ownProps) => ({
    onEditClick: post => {
      dispatch(
        actions.handleEditClick({
          post: post.post,
          profileId: ownProps.profileId,
        })
      );
    },
    onEmptySlotClick: post => {
      dispatch(
        actions.handleEmptySlotClick({
          emptySlotData: post,
          profileId: ownProps.profileId,
        })
      );
    },
    onDeleteConfirmClick: post => {
      dispatch(
        actions.handleDeleteConfirmClick({
          post: post.post,
          profileId: ownProps.profileId,
        })
      );
    },
    onRequeueClick: post => {
      dispatch(
        actions.handleRequeue({
          post: post.post,
          profileId: ownProps.profileId,
        })
      );
    },
    onCampaignTagClick: campaignId => {
      dispatch(
        actions.handleCampaignTagClick({
          campaignId,
        })
      );
    },
    onShareNowClick: post => {
      dispatch(
        actions.handleShareNowClick({
          post: post.post,
          profileId: ownProps.profileId,
        })
      );
    },
    onDropPost: (id, timestamp, day) => {
      dispatch(actions.onDropPost(id, timestamp, day, ownProps.profileId));
    },
    onSwapPosts: (postSource, postTarget) => {
      dispatch(actions.onSwapPosts(postSource, postTarget, ownProps.profileId));
    },
    onUnpauseClick: () => {
      dispatch(
        profileSidebarActions.onUnpauseClick({ profileId: ownProps.profileId })
      );
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
    onDirectPostingClick: () => {
      dispatch(
        dataFetchActions.fetch({
          name: 'checkInstagramBusiness',
          args: {
            profileId: ownProps.profileId,
            callbackAction: modalsActions.showInstagramDirectPostingModal({
              profileId: ownProps.profileId,
            }),
          },
        })
      );
    },
    onComposerOverlayClick: () => {
      dispatch(
        modalsActions.showCloseComposerConfirmationModal({ page: 'queue' })
      );
    },
    onCheckInstagramBusinessClick: () => {
      dispatch(
        dataFetchActions.fetch({
          name: 'checkInstagramBusiness',
          args: {
            profileId: ownProps.profileId,
            recheck: true,
          },
        })
      );
    },
    onHideInstagramModal: () => {
      dispatch(actions.handleHideInstagramModal());
    },
    onSetRemindersClick: ({ type }) => {
      let cta = '';
      if (type === 'banner') {
        cta = SEGMENT_NAMES.REMINDERS_BANNER;
      }
      if (type === 'post') {
        cta = SEGMENT_NAMES.REMINDERS_POST;
      }
      window.location.assign(
        `${getURL.getRemindersURL({
          profileId: ownProps.profileId,
          cta,
          nextUrl: `profile/${ownProps.profileId}/tab/queue`,
        })}`
      );
    },
    onCalendarClick: weekOrMonth => {
      if (weekOrMonth === 'week' || weekOrMonth === 'month') {
        openCalendarWindow(ownProps.profileId, weekOrMonth);
      }
    },
    fetchCampaignsIfNeeded: () => {
      dispatch(campaignListActions.fetchCampaignsIfNeeded());
    },
  })
)(QueuedPosts);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
