import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions } from './reducer';
import ProfilesDisconnectedModal from './components/ProfilesDisconnectedModal';

export default connect(
  state => {
    const translations = state.i18n.translations['profiles-disconnected-modal'];
    let extraMessage = null;
    const disconnectedProfiles =
      state.profilesDisconnectedModal?.disconnectedProfiles;
    const instagramPersonalProfiles = disconnectedProfiles.filter(
      profile =>
        profile?.service === 'instagram' && profile?.service_type === 'profile'
    );
    if (instagramPersonalProfiles.length > 0) {
      extraMessage = translations?.extraMessage?.instagram;
    }
    return {
      translations: state.i18n.translations['profiles-disconnected-modal'],
      extraMessage,
      ...state.profilesDisconnectedModal,
    };
  },
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideProfilesDisconnectedModal()),
    reconnectProfile: ({ id, service }) =>
      dispatch(actions.reconnectProfile({ id, service })),
  })
)(ProfilesDisconnectedModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
