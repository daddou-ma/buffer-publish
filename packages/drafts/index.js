import { connect } from 'react-redux';
import {
  getDateString,
  isInThePast,
  getURL,
} from '@bufferapp/publish-server/formatters';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';
import { actions as analyticsActions } from '@bufferapp/publish-analytics-middleware';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { plansPage } from '@bufferapp/publish-routes';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';

import { actions } from './reducer';
import DraftList from './components/DraftList';

// TODO: move these to utils
const getPostActionString = ({
  draft,
  profileTimezone,
  isPastDue,
  twentyFourHourTime,
  isDraftsView,
}) => {
  if (draft.scheduled_at) {
    const dateString = getDateString(draft.scheduled_at, profileTimezone, {
      isPastDue,
      twentyFourHourTime,
    });
    return `This ${isDraftsView ? 'draft' : 'post'} ${
      isPastDue ? 'was' : 'will be'
    }
      scheduled for ${dateString}${isPastDue ? '' : ' on approval'}.`;
  }
  if (draft.sharedNext) {
    return `This ${
      isDraftsView ? 'draft' : 'post'
    } will be added to the top of the queue on approval.`;
  }

  return `This ${
    isDraftsView ? 'draft' : 'post'
  } will be added to the queue on approval.`;
};

const getDraftDetails = ({
  draft,
  profileTimezone,
  isPastDue,
  twentyFourHourTime,
  isDraftsView,
}) => {
  const { createdAt } = draft;
  const servicesWithCommentFeature = ['instagram'];
  const createdAtString = getDateString(createdAt, profileTimezone, {
    createdAt,
    twentyFourHourTime,
  });
  let avatarUrl = '';
  if (draft.user) {
    avatarUrl = draft.user.avatar || draft.user.gravatar;
  }

  return {
    via: draft.via,
    creatorName: draft.user ? draft.user.name : '',
    email: draft.user ? draft.user.email : '',
    avatarUrl,
    createdAt: createdAtString,
    postAction: getPostActionString({
      draft,
      profileTimezone,
      isPastDue,
      twentyFourHourTime,
      isDraftsView,
    }),
    isRetweet: draft.retweet !== undefined,
    commentText: draft.commentText,
    hasCommentEnabled:
      servicesWithCommentFeature.indexOf(draft.profile_service) !== -1,
    shopgridLink: draft.shopgridLink,
  };
};

// Could export this to utils and then pull it in and pass tab depending on which package uses it
const formatPostLists = (profile, drafts, user, tabId) => {
  const profileTimezone = profile.timezone;
  const { isManager } = profile;
  const twentyFourHourTime = user.twentyfour_hour_time;
  const orderedDrafts = Object.values(drafts).sort(
    (a, b) => a.createdAt - b.createdAt
  );

  // Drafts tab only displays drafts that don't need approval.
  // Approval tabs only display drafts that need approval.
  const isDraftsView = tabId === 'drafts';
  const draftsList = orderedDrafts.filter(
    draft => draft.needsApproval !== isDraftsView
  );
  const typeOfTab = isDraftsView ? 'drafts' : 'approval';

  return draftsList.reduce((acc, draft, index) => {
    const isPastDue = isInThePast(draft.scheduled_at);
    acc.push({
      queueItemType: 'post',
      hasPermission:
        isManager || user.id === (draft.user ? draft.user.id : draft.id),
      role: profile.organizationRole,
      manager: isManager,
      draftDetails: getDraftDetails({
        draft,
        profileTimezone,
        isPastDue,
        twentyFourHourTime,
        isDraftsView,
      }),
      view: typeOfTab,
      index,
      ...draft,
    });
    return acc;
  }, []);
};

export default connect(
  (state, ownProps) => {
    const { profileId, tabId } = ownProps;
    const currentProfile = state.drafts.byProfileId[profileId];
    if (currentProfile) {
      const {
        isDisconnected,
        isManager,
      } = state.profileSidebar.selectedProfile;
      const {
        hasFirstCommentFeature,
        showStartBusinessTrialCta,
        hasDraftsFeature,
      } = state.organizations.selected || {};
      return {
        shouldResetComposerData: state.drafts.shouldResetComposerData,
        manager: isManager,
        drafts: currentProfile.drafts,
        postLists: formatPostLists(
          state.profileSidebar.selectedProfile,
          currentProfile.drafts,
          state.user,
          tabId
        ),
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        total: currentProfile.total,
        showComposer: state.drafts.showComposer,
        environment: state.environment.environment,
        editMode: state.drafts.editMode,
        editingPostId: state.drafts.editingPostId,
        isLockedProfile: state.profileSidebar.isLockedProfile,
        isDisconnectedProfile: isDisconnected,
        showStartBusinessTrialCta,
        hasFirstCommentFlip: hasFirstCommentFeature,
        showPaywall: !hasDraftsFeature,
        profileId: ownProps.profileId,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    fetchDrafts: ({ needsApproval }) => {
      dispatch(
        dataFetchActions.fetch({
          name: 'draftPosts',
          args: {
            profileId: ownProps.profileId,
            isFetchingMore: false,
            needsApproval,
            clear: true,
          },
        })
      );
    },
    onApproveClick: draft => {
      dispatch(
        actions.handleApproveClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        })
      );
    },
    onRequestApprovalClick: draft => {
      dispatch(
        actions.handleRequestApprovalClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
          needsApproval: true,
        })
      );
    },
    onMoveToDraftsClick: draft => {
      dispatch(
        actions.handleRequestApprovalClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
          needsApproval: false,
        })
      );
    },
    onRescheduleClick: draft => {
      dispatch(
        actions.handleRescheduleClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        })
      );
    },
    onEditClick: draft => {
      dispatch(
        actions.handleEditClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        })
      );
    },
    onDeleteConfirmClick: draft => {
      dispatch(
        actions.handleDeleteConfirmClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        })
      );
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
    onComposerOverlayClick: () => {
      dispatch(
        modalsActions.showCloseComposerConfirmationModal({
          page: ownProps.tabId || 'drafts',
        })
      );
    },
    onUpgradeButtonClick: () => {
      analyticsActions.trackEvent('Upgrade Path Viewed', {
        upgradePathName: SEGMENT_NAMES.UPGRADE_PATH_DRAFTS_FREE,
      });
      dispatch(plansPage.goTo());
    },
    onStartTrialClick: () => {
      window.location.assign(
        `${getURL.getStartTrialURL({
          trialType: 'small',
          cta: SEGMENT_NAMES.DRAFTS_SBP_TRIAL,
          nextUrl: 'https://publish.buffer.com',
        })}`
      );
    },
  })
)(DraftList);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
