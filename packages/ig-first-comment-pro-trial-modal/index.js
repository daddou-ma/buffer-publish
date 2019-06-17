import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import InstagramFirstCommentProTrialModal from './components/InstagramFirstCommentProTrialModal';

export default connect(
  state => ({
    translations: state.i18n.translations['instagram-first-comment-start-trial-modal'],
    loading: state.igFirstCommentProTrialModal.loading,
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideInstagramFirstCommentProTrialModal()),
    startTrial: () => dispatch(actions.handleStartProTrialClick()),
  }),
)(InstagramFirstCommentProTrialModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
