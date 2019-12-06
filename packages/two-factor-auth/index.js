import { connect } from 'react-redux';
import TwoFactorAuth from './components/TwoFactorAuth';
import { actions } from './reducer';

export default connect(
  state => ({
    machineState: state.twoFactorAuth.machineState,
    isEnabled: state.twoFactorAuth.isEnabled,
    editMode: state.twoFactorAuth.editMode,
    method: state.twoFactorAuth.method,
    phoneNumber: state.twoFactorAuth.phoneNumber,
    recoveryCode: state.twoFactorAuth.recoveryCode,
    loading: state.twoFactorAuth.loading,
    error: state.twoFactorAuth.error,
    qrCode: state.twoFactorAuth.qrCode,
    updateMethod: state.twoFactorAuth.updateMethod,
    updatePhoneNumber: state.twoFactorAuth.updatePhoneNumber,
  }),
  dispatch => ({
    transition: (action, params) =>
      dispatch(actions.transition(action, params)),
    setPhoneNumber: value => dispatch(actions.setPhoneNumber(value)),
    submitPhoneNumber: () => dispatch(actions.submitPhoneNumber()),
    setupApp: () => dispatch(actions.setupApp()),
    submitCode: code => dispatch(actions.submitCode(code)),
    handleRecoveryCodeSelect: () => dispatch(actions.recoveryCodeSelected()),
  })
)(TwoFactorAuth);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
