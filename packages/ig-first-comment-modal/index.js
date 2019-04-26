import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import { actionTypes } from '@bufferapp/publish-profile-sidebar';
import { getURL } from '@bufferapp/publish-formatters';

import InstagramFirstCommentModal from './components/InstagramFirstCommentModal';

export default connect(
  state => ({
    profile: state.profileSidebar.selectedProfile,
    appId: state.clientAccess && state.clientAccess.appId,
    translations: state.i18n.translations['instagram-first-comment-modal'],
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideInstagramFirstCommentModal()),
    loadFacebook: () => {
      (function (d, s, id) {
        if (d.getElementById(id)) return;
        const fjs = d.getElementsByTagName(s)[0];
        const js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    },
    launchRequestMorePermission: (profileId) => {
      const popup = window.open(`https://${getURL.getBaseURL()}/oauth/instagram/${profileId}/reconnect/auth`);

      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval);
          dispatch({
            type: actionTypes.SINGLE_PROFILE,
            profileId,
          });
          dispatch(modalsActions.hideInstagramFirstCommentModal());
        }
      }, 150);
    },
  }),
)(InstagramFirstCommentModal);
