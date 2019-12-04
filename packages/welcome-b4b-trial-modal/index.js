import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';

import WelcomeB4BTrialModal from './components/WelcomeB4BTrialModal';

export default connect(
  state => ({
    translations: state.i18n.translations['welcome-b4b-trial-modal'],
  }),
  dispatch => ({
    hideModal: () => dispatch(modalsActions.hideWelcomeB4BTrialModal()),
  })
)(WelcomeB4BTrialModal);
