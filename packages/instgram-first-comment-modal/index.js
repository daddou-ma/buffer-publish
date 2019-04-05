import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';


import InstagramFirstCommentModal from './components/InstagramFirstCommentModal';
import { bufferOrigins } from '@bufferapp/composer/composer/AppConstants';
import { getBaseURL } from './util';


export default connect(
  state => ({
    profile: state.profileSidebar.selectedProfile,
    appId: state.clientAccess && state.clientAccess.appId,
    translations: state.i18n.translations['instagram-first-comment-modal'],
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideInstagramFirstCommentModal()),
    canRequestMorePermission: (profileId) => {
      window.open(`https://${getBaseURL()}/oauth/instagram/${profileId}/reconnect/auth`);
      dispatch(modalsActions.hideInstagramFirstCommentModal());

    },
  }),
)(InstagramFirstCommentModal);
