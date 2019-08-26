import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import StoryGroupPopover from './components/StoryGroupPopover';

export default connect(
  state => ({}),
  dispatch => ({
    onOverlayClick: () => {
      // TO-DO: will need to add HIDE_COMPOSER logic in the stories queue once completed
      // We'll need to add the stories tab case in the close-composer-confirmation-modal middleware
      dispatch(modalsActions.showCloseComposerConfirmationModal());
    },
  }),
)(StoryGroupPopover);
