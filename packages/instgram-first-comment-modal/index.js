import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';


import InstagramFirstCommentModal from './components/InstagramFirstCommentModal';
import { bufferOrigins } from '@bufferapp/composer/composer/AppConstants';
import { getBaseURL } from './util';
import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';


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
    canRequestMorePermission: (profileId) => {
      const popup = window.open(`https://${getBaseURL()}/oauth/instagram/${profileId}/reconnect/auth`);

      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval);
          dispatch(dataFetchActions.fetch({
            name: 'single_profile',
            args: {
              profileId,
            },
          }));
          dispatch(modalsActions.hideInstagramFirstCommentModal());
        }
      }, 150);
    },
  }),
)(InstagramFirstCommentModal);
