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
      editingPostId,
      editingStoryGroup,
    };
  },
  dispatch => ({
    onOverlayClick: () => {
      dispatch(modalsActions.showCloseComposerConfirmationModal());
    },
    onDateTimeSlotPickerSubmit: (scheduledAt) => {
      dispatch(actions.handleSaveStoryGroup(scheduledAt));
    },
    onCreateStoryGroup: (scheduledAt) => {
      dispatch(actions.handleSaveStoryGroup(scheduledAt));
    },
    onUpdateStoryGroup: (storyGroupId, scheduledAt, stories) => {
      dispatch(actions.handleUpdateStoryGroup(storyGroupId, scheduledAt, stories));
    },
    saveNote: ({ note, storyId }) => {
      dispatch(actions.handleSaveStoryNote({ note, storyId }));
    },
  }),
)(StoryGroupPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
