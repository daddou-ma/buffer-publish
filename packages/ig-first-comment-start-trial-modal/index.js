import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions } from './reducer';
import InstagramFirstCommentStartTrialModal from './components/InstagramFirstCommentStartTrialModal';

export default connect(
  state => ({
    translations: state.i18n.translations['instagram-first-comment-start-trial-modal'],
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideInstagramFirstCommentStartTrialModal()),
    startTrial: () => { console.log('startTrial'); return dispatch(actions.handleStartProTrialClick()); },
  }),
)(InstagramFirstCommentStartTrialModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
