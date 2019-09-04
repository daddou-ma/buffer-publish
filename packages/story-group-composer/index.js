import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import StoryGroupPopover from './components/StoryGroupPopover';

export default connect(
  state => ({
    uses24hTime: state.appSidebar.user.uses_24h_time,
    timezone: state.profileSidebar.selectedProfile.timezone,
    weekStartsMonday: state.appSidebar.user.week_starts_monday,
  }),
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
    onDeleteStoryGroup: (storyGroupId) => {
      dispatch(actions.handleDeleteStoryGroup(storyGroupId));
    },
  }),
)(StoryGroupPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
