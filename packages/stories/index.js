import { connect } from 'react-redux';
import { formatPostLists } from '@bufferapp/publish-queue/util';
import { actions as previewActions } from '@bufferapp/publish-story-preview';
import { actions as storyGroupComposerActions } from '@bufferapp/publish-story-group-composer';

import { actions } from './reducer';
import StoryGroups from './components/StoryGroups';

export default connect(
  (state, ownProps) => {
    const { profileId } = ownProps;
    const currentProfile = state.stories.byProfileId[profileId];
    const profileData = state.profileSidebar.profiles.find(p => p.id === ownProps.profileId);

    if (currentProfile) {
      return {
        loading: currentProfile.loading,
        loadingMore: currentProfile.loadingMore,
        moreToLoad: currentProfile.moreToLoad,
        page: currentProfile.page,
        storyGroups: formatPostLists({
          isManager: profileData.isManager,
          posts: currentProfile.storyPosts,
          scheduleSlotsEnabled: true,
          isSingleSlot: true,
          profileTimezone: profileData.timezone,
          weekStartsOnMonday: state.appSidebar.user.week_starts_monday,
          weeksToShow: currentProfile.page + 1,
          hasTwentyFourHourTimeFormat: state.appSidebar.user.hasTwentyFourHourTimeFormat,
          profileService: profileData.service,
          orderBy: 'scheduledAt',
        }),
        showStoriesComposer: state.stories.showStoriesComposer,
        showStoryPreview: state.stories.showStoryPreview,
        editMode: state.stories.editMode,
        isBusinessAccount: profileData.business,
        userData: state.appSidebar.user,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onEmptySlotClick: (storyGroup) => {
      dispatch(actions.handleEmptySlotClick({
        emptySlotData: storyGroup,
        profileId: ownProps.profileId,
      }));
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onEditClick: (storyGroup) => {
      dispatch(actions.handleEditStoryGroupClick({
        storyGroup: storyGroup.post,
        profileId: ownProps.profileId,
      }));
    },
    handleCloseStoriesComposer: () => {
      dispatch(actions.handleCloseStoriesComposer());
    },
    onPreviewClick: (stories) => {
      dispatch(previewActions.handlePreviewClick(stories));
      dispatch(actions.handlePreviewClick());
    },
    onClosePreviewClick: () => {
      dispatch(actions.handleClosePreviewClick());
    },
    onDeleteConfirmClick: (storyGroup) => {
      dispatch(actions.handleDeleteStoryGroup({
        storyGroup,
        profileId: ownProps.profileId,
      }));
    },
    onShareNowClick: (storyGroup) => {
      dispatch(actions.handleShareNowClick({
        storyGroup: storyGroup.post,
        profileId: ownProps.profileId,
      }));
    },
  }),
)(StoryGroups);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
