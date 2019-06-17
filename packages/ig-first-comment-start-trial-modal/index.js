import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import InstagramFirstCommentStartTrialModal from './components/InstagramFirstCommentStartTrialModal';

export default connect(
  state => ({
    translations: state.i18n.translations['instagram-first-comment-start-trial-modal'],
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideInstagramFirstCommentStartTrialModal()),
  }),
)(InstagramFirstCommentStartTrialModal);
