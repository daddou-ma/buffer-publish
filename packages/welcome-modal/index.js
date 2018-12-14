import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import WelcomeModal from './components/WelcomeModal';

export default connect(
  state => ({
    translations: state.i18n.translations['welcome-modal'],
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideWelcomeModal()),
  }),
)(WelcomeModal);
