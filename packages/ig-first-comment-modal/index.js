import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';

import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actionTypes as profilesActionTypes } from '@bufferapp/publish-data-profiles/reducer';

import InstagramFirstCommentModal from './components/InstagramFirstCommentModal';

export default connect(
  state => {
    const profile = state.profileSidebar.selectedProfile;
    const firstCommentIds = state.modals && state.modals.firstCommentIds;
    let selectedProfiles = [profile];
    if (firstCommentIds) {
      selectedProfiles = state.profileSidebar.profiles.filter(p =>
        firstCommentIds.includes(p.id)
      );
    }

    return {
      profile: state.profileSidebar.selectedProfile,
      selectedProfiles,
      firstCommentIds,
      appId: state.clientAccess && state.clientAccess.appId,
      translations: state.i18n.translations['instagram-first-comment-modal'],
    };
  },
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideInstagramFirstCommentModal()),
    loadFacebook: () => {
      (function(d, s, id) {
        if (d.getElementById(id)) return;
        const fjs = d.getElementsByTagName(s)[0];
        const js = d.createElement(s);
        js.id = id;
        js.src = '//connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    },
    launchRequestMorePermission: profileId => {
      const popup = window.open(
        `https://${getURL.getBaseURL()}/oauth/instagram/${profileId}/reconnect/auth`
      );

      const interval = setInterval(() => {
        if (popup.closed) {
          clearInterval(interval);
          dispatch(
            profilesActionTypes.fetchSingleProfile({
              profileId,
            })
          );
          dispatch(modalsActions.hideInstagramFirstCommentModal());
        }
      }, 150);
    },
  })
)(InstagramFirstCommentModal);
