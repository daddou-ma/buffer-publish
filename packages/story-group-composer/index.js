import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import StoryGroupPopover from './components/StoryGroupPopover';

export default connect(
  state => ({
    uses24hTime: state.appSidebar.user.uses_24h_time,
    timezone: state.profileSidebar.selectedProfile.timezone,
    weekStartsMonday: state.appSidebar.user.week_starts_monday,
    selectedProfile: state.profileSidebar.selectedProfile,
    translations: state.i18n.translations['story-group-composer'],
    isScheduleLoading: state.storyGroupComposer.isScheduleLoading,
  }),
  dispatch => ({
    onOverlayClick: () => {
      dispatch(modalsActions.showCloseComposerConfirmationModal());
    },
    onDateTimeSlotPickerSubmit: (scheduledAt) => {
      dispatch(actions.setScheduleLoading(true));
      dispatch(actions.handleSaveStoryGroup(scheduledAt));
    },
    onCreateStoryGroup: (scheduledAt) => {
      dispatch(actions.handleSaveStoryGroup(scheduledAt));
    },
    onUpdateStoryGroup: (storyGroupId, scheduledAt, stories) => {
      dispatch(actions.handleUpdateStoryGroup(storyGroupId, scheduledAt, stories));
    },
    saveNote: ({ note, order }) => {
      dispatch(actions.handleSaveStoryNote({ note, order }));
    },
  }),
)(StoryGroupPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
