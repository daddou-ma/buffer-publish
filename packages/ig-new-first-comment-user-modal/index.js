import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import InstagramNewFirstCommentUserModal from './components/InstagramNewFirstCommentUserModal';

export default connect(
  (state) => {
    return {
      translations: state.i18n.translations['instagram-new-first-comment-user-modal'],
    };
  },
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideInstagramNewFirstCommentUserModal()),
  }),
)(InstagramNewFirstCommentUserModal);
