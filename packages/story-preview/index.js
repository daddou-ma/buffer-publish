import { connect } from 'react-redux';
import { actions as storyGroupActions } from '@bufferapp/publish-story-group-composer';
import { SEGMENT_NAMES } from '@bufferapp/publish-constants';
import { actions } from './reducer';
import PreviewPopover from './components/PreviewPopover';

export default connect(
  state => ({
    user: state.storyPreview.user,
    stories: state.storyPreview.stories,
    storyGroupId: state.storyPreview.storyGroupId,
    profileId: state.storyPreview.profileId,
    scheduledAt: state.storyPreview.scheduledAt,
    translations: state.i18n.translations['story-preview'],
  }),
  dispatch => ({
    onSaveNoteClick: ({ order, note, view }) => {
      if (view === 'queue') {
        dispatch(actions.trackNote({ order, note }));
        dispatch(actions.handleSaveNoteClick({ order, note }));
      }
      if (view === 'composer') {
        const cta = SEGMENT_NAMES.STORIES_PREVIEW_COMPOSER_ADD_NOTE;
        dispatch(storyGroupActions.trackNote({ cta, order, note }));
        dispatch(storyGroupActions.handleSaveStoryNote({ order, note }));
        dispatch(actions.handleSaveNoteComposer({ order, note }));
      }
    },
  })
)(PreviewPopover);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
