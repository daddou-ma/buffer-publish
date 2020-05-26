import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
// load the presentational component
import StealProfileModal from './components/StealProfileModal';

export default connect(
  state => ({
    translations: state.i18n.translations['steal-profile-modal'],
    stealProfileUsername: state.modals.stealProfileUsername,
    email: state.user.email,
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideStealProfileModal()),
  })
)(StealProfileModal);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
