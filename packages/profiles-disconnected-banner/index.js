import { connect } from 'react-redux';
import { actions as profilesDisconnectedModalActions } from '@bufferapp/publish-profiles-disconnected-modal/reducer';
import ProfilesDisconnectedBanner from './components/ProfilesDisconnectedBanner';

export default connect(
  state => {
    const selectedProfile = state.profileSidebar?.selectedProfile;

    return {
      profileId: selectedProfile?.id,
      service: selectedProfile?.service,
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
