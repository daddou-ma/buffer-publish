import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions } from './reducer';
import ProfilesDisconnectedModal from './components/ProfilesDisconnectedModal';

export default connect(
  state => {
    let displayExtraMessage = false;
    const disconnectedProfiles =
      state.profilesDisconnectedModal?.disconnectedProfiles;
    const instagramPersonalProfiles = disconnectedProfiles.filter(
      profile =>
        profile?.service === 'instagram' && profile?.service_type === 'profile'
    );
    if (instagramPersonalProfiles.length > 0) {
      displayExtraMessage = true;
    }
    const organizations = state.organizations?.list;

    const profiles = [];
    disconnectedProfiles.forEach(profile => {
      const matchingOrg = organizations.filter(
        org => profile.organizationId === org.id
      );
      profile.isAdmin = matchingOrg[0].isAdmin;
      profiles.push(profile);
    });
    return {
      displayExtraMessage,
      disconnectedProfiles: profiles,
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
