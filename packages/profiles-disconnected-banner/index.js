import { connect } from 'react-redux';
import { actions as profilesDisconnectedModalActions } from '@bufferapp/publish-profiles-disconnected-modal/reducer';
import ProfilesDisconnectedBanner from './components/ProfilesDisconnectedBanner';

export default connect(
  state => ({
    id: state.profileSidebar.selectedProfileId,
    service:
      state.profileSidebar.selectedProfile &&
      state.profileSidebar.selectedProfile.service,
    translations: state.i18n.translations['profiles-disconnected-banner'],
  }),
  dispatch => ({
    onReconnectProfileClick: ({ id, service }) => {
      dispatch(
        profilesDisconnectedModalActions.reconnectProfile({
          id,
          service,
        })
      );
    },
  })
)(ProfilesDisconnectedBanner);
