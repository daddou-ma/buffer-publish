import { connect } from 'react-redux';
import { actions as storyGroupActions } from '@bufferapp/publish-story-group-composer';
import PreviewPopover from './components/PreviewPopover';

export default connect(
  state => ({
    user: state.storyPreview.user,
    stories: state.storyPreview.stories,
  }),
  dispatch => ({
    onSaveNoteClick: ({ order, note }) => {
      dispatch(storyGroupActions.handleSaveStoryNote({ order, note }));
    },
  }),
)(PreviewPopover);

export reducer, { actions, actionTypes } from './reducer';
