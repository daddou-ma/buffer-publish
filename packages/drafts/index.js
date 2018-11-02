import { connect } from 'react-redux';
import { getDateString, isInThePast } from '@bufferapp/publish-formatters';
import { actions } from './reducer';
import DraftList from './components/DraftList';

// TODO: move these to utils
const getPostActionString = ({ draft, profileTimezone, isPastDue, twentyFourHourTime }) => {
  if (draft.scheduled_at) {
    const dateString = getDateString(draft.scheduled_at, profileTimezone, {
      isPastDue,
      twentyFourHourTime,
    });
    return `This draft ${isPastDue ? 'was' : 'will be'} scheduled for ${dateString}${
      isPastDue ? '' : ' on approval'
    }.`;
  } else if (draft.shared_next) {
    return 'This draft will be added to the top of the queue on approval.';
  }

  return 'This draft will be added to the queue on approval.';
};

const getDraftDetails = ({ draft, profileTimezone, isPastDue, twentyFourHourTime }) => {
  const createdAt = draft.created_at;
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
    }),
    isRetweet: draft.retweet !== undefined,
  };
};

// Could export this to utils and then pull it in and pass tab depending on which package uses it
const formatPostLists = (profile, drafts, user) => {
  const profileTimezone = profile.timezone;
  const orderedDrafts = Object.values(drafts).sort((a, b) => a.createdAt - b.createdAt);
  const twentyFourHourTime = user.twentyfour_hour_time;

  return orderedDrafts.reduce((acc, draft, index) => {
    const isPastDue = isInThePast(draft.scheduled_at);
    acc.push({
      queueItemType: 'post',
      hasPermission: user.id === draft.user_id || profile.isManager,
      role: profile.organizationRole,
      manager: profile.isManager,
      draftDetails: getDraftDetails({
        draft,
        profileTimezone,
        isPastDue,
        twentyFourHourTime,
      }),
      view: 'drafts',
      index,
      ...draft,
    });
    return acc;
  }, []);
};

export default connect(
  (state, ownProps) => {
    const profileId = ownProps.profileId;
    const currentProfile = state.drafts.byProfileId[profileId];
    if (currentProfile) {
      return {
        manager: state.profileSidebar.selectedProfile.isManager,
        drafts: currentProfile.drafts,
        postLists: formatPostLists(
          state.profileSidebar.selectedProfile,
          currentProfile.drafts,
          state.appSidebar.user,
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
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onEditClick: (draft) => {
      dispatch(
        actions.handleEditClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        }),
      );
    },
    onDeleteClick: (draft) => {
      dispatch(
        actions.handleDeleteClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        }),
      );
    },
    onCancelConfirmClick: (draft) => {
      dispatch(
        actions.handleCancelConfirmClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        }),
      );
    },
    onDeleteConfirmClick: (draft) => {
      dispatch(
        actions.handleDeleteConfirmClick({
          draft: draft.draft,
          profileId: ownProps.profileId,
        }),
      );
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
  }),
)(DraftList);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
