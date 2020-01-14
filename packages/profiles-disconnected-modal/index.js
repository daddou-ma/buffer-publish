import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions } from './reducer';
import ProfilesDisconnectedModal from './components/ProfilesDisconnectedModal';

export default connect(
  state => ({
    translations: state.i18n.translations['profiles-disconnected-modal'],
    ...state.profilesDisconnectedModal,
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideProfilesDisconnectedModal()),
    reconnectProfile: ({ id, service }) =>
      dispatch(actions.reconnectProfile({ id, service })),
  })
)(ProfilesDisconnectedModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
