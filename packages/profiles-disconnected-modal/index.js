import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions } from './reducer';
import ProfilesDisconnectedModal from './components/ProfilesDisconnectedModal';

export default connect(
  state => {
    const disconnectedProfiles =
      state.profilesDisconnectedModal?.disconnectedProfiles;
    const organizations = state.organizations?.list;

    const profiles = disconnectedProfiles.reduce((accProfiles, profile) => {
      const matchingOrg =
        Array.isArray(organizations) &&
        organizations.find(org => profile.organizationId === org.id);

      return matchingOrg
        ? [...accProfiles, { ...profile, isAdmin: matchingOrg.isAdmin }]
        : accProfiles;
    }, []);
    return {
      ...state.profilesDisconnectedModal,
      disconnectedProfiles: profiles,
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
