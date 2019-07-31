import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions as queueActions } from '@bufferapp/publish-queue';
import { actions as draftsActions } from '@bufferapp/publish-drafts';
import { actions } from './reducer';

// load the presentational component
import CloseComposerConfirmationModal from './components/CloseComposerConfirmationModal';

export default connect(
  (state, ownProps) => ({
    translations: state.i18n.translations['close-composer-confirmation-modal'],
  }),
  (dispatch, ownProps) => ({
    onCloseComposerModal: () => dispatch(modalsActions.hideCloseComposerConfirmationModal()),
    onCloseComposerAndConfirmationModal: () => dispatch(actions.closeComposerAndConfirmationModal()),
  }),
)(CloseComposerConfirmationModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
