import { connect } from 'react-redux';
import { actions as storyGroupActions } from '@bufferapp/publish-story-group-composer';
import { actions } from './reducer';
import PreviewPopover from './components/PreviewPopover';

export default connect(
  state => ({
    user: state.storyPreview.user,
    stories: state.storyPreview.stories,
    storyGroupId: state.storyPreview.storyGroupId,
    profileId: state.storyPreview.profileId,
    scheduledAt: state.storyPreview.scheduledAt,
  }),
  dispatch => ({
    onSaveNoteClick: ({ order, note, view }) => {
      if (view === 'queue') {
        dispatch(actions.handleSaveNoteClick({ order, note }));
      }
      if (view === 'composer') {
        dispatch(storyGroupActions.handleSaveStoryNote({ order, note }));
        dispatch(actions.handleSaveNoteComposer({ order, note }));
      }
    },
  }),
)(PreviewPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
