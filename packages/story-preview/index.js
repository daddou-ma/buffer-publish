import { connect } from 'react-redux';
import PreviewPopover from './components/PreviewPopover';

export default connect(
  state => ({

  }),
  dispatch => ({
    onOverlayClick: () => {
    },
    onSaveNoteClick: ({ note, storyId }) => {
      //dispatch(actions.handleSaveStoryNote({ note, storyId }));
    },
  }),
)(PreviewPopover);

// export reducer, { actions, actionTypes } from './reducer';
// export middleware from './middleware';
