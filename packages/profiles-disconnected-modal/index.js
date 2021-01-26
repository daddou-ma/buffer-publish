import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { getURL } from '@bufferapp/publish-server/formatters/src';
import { actions } from './reducer';
import ProfilesDisconnectedModal from './components/ProfilesDisconnectedModal';

export default connect(
  state => {
    const disconnectedProfiles =
      state.profilesDisconnectedModal?.disconnectedProfiles;
    const instagramPersonalProfiles = disconnectedProfiles.filter(
      profile =>
        profile?.service === 'instagram' && profile?.service_type === 'profile'
    );
    const organizations = state.organizations?.list;
    const { shouldRedirectToAccountChannels } = state.globalAccount;

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
      displayExtraMessage: instagramPersonalProfiles?.length > 0,
      disconnectedProfiles: profiles,
      shouldRedirectToAccountChannels,
    };
  },
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideProfilesDisconnectedModal()),
    reconnectProfile: ({ shouldRedirectToAccountChannels, id, service }) => {
      if (shouldRedirectToAccountChannels) {
        window.location.assign(getURL.getAccountChannelsURL());
      }
      dispatch(actions.reconnectProfile({ id, service }));
    },
  })
)(ProfilesDisconnectedModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
