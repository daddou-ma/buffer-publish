import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';

import WelcomePaidModal from './components/WelcomePaidModal';

export default connect(
  state => ({
    translations: state.i18n.translations['welcome-paid-modal'],
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideWelcomePaidModal()),
  })
)(WelcomePaidModal);
