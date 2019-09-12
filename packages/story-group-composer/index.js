import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import StoryGroupPopover from './components/StoryGroupPopover';

export default connect(
  (state) => {
    const { selectedProfileId } = state.profileSidebar;
    const currentProfile = state.stories.byProfileId[selectedProfileId];
    const { editingPostId } = state.stories;
    const editingStoryGroup = currentProfile.storyPosts[editingPostId];

    return {
      uses24hTime: state.appSidebar.user.uses_24h_time,
      timezone: state.profileSidebar.selectedProfile.timezone,
      weekStartsMonday: state.appSidebar.user.week_starts_monday,
      selectedProfile: state.profileSidebar.selectedProfile,
      translations: state.i18n.translations['story-group-composer'],
      isScheduleLoading: state.storyGroupComposer.isScheduleLoading,
      showDatePicker: state.storyGroupComposer.showDatePicker,
      draft: state.storyGroupComposer.draft,
      userData: state.appSidebar.user,
      editingPostId,
      editingStoryGroup,
    };
  },
  dispatch => ({
    onOverlayClick: () => {
      dispatch(modalsActions.showCloseComposerConfirmationModal());
    },
    onCreateStoryGroup: (scheduledAt) => {
      dispatch(actions.setScheduleLoading(true));
      dispatch(actions.handleSaveStoryGroup(scheduledAt));
    },
    onUpdateStoryGroup: ({ scheduledAt, stories, storyGroupId }) => {
      dispatch(actions.setScheduleLoading(true));
      dispatch(actions.handleUpdateStoryGroup({ scheduledAt, stories, storyGroupId }));
    },
    saveNote: ({ note, order }) => {
      dispatch(actions.handleSaveStoryNote({ note, order }));
      dispatch(actions.resetDraftState());
    },
    onSetShowDatePicker: (showDatePicker) => {
      dispatch(actions.setShowDatePicker(showDatePicker));
    },
    onComposerClick: (showDatePicker) => {
      if (showDatePicker) dispatch(actions.setShowDatePicker(false));
    },
    onCreateNewStoryCard: ({ id, uploaderInstance, file }) => {
      dispatch(actions.createNewStoryCard({ id, uploaderInstance, file }));
    },
  }),
)(StoryGroupPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
