import { connect } from 'react-redux';
import { actions as profilesDisconnectedModalActions } from '@bufferapp/publish-profiles-disconnected-modal/reducer';
import ProfilesDisconnectedBanner from './components/ProfilesDisconnectedBanner';

export default connect(
  state => {
    let displayExtraMessage = false;
    const selectedProfile = state.profileSidebar?.selectedProfile;

    if (
      selectedProfile?.service === 'instagram' &&
      selectedProfile?.service_type === 'profile'
    ) {
      displayExtraMessage = true;
    }

    return {
      profileId: selectedProfile?.id,
      service: selectedProfile?.service,
      displayExtraMessage,
      canReconnectChannels: state.organizations.selected?.canReconnectChannels,
      ownerEmail: state.organizations.selected?.ownerEmail,
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
