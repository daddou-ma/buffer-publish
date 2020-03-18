import { connect } from 'react-redux';
import { actions as profilesDisconnectedModalActions } from '@bufferapp/publish-profiles-disconnected-modal/reducer';
import ProfilesDisconnectedBanner from './components/ProfilesDisconnectedBanner';

export default connect(
  state => {
    let extraMessage = null;
    const selectedProfile = state.profileSidebar?.selectedProfile;
    const translations =
      state.i18n.translations['profiles-disconnected-banner'];

    if (
      selectedProfile?.service === 'instagram' &&
      selectedProfile?.service_type === 'profile'
    ) {
      extraMessage = translations?.extraMessage?.instagram;
    }

    return {
      profileId: selectedProfile?.id,
      service: selectedProfile?.service,
      translations,
      extraMessage,
    };
  },
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
