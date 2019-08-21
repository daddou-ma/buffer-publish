import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import CreditCardForm from './components/CreditCardForm';
import { actions } from './reducer';


export default connect(
  state => {},
  dispatch => ({
    storeValue: (id, value) => dispatch(actions.storeValue(id, value)),
    upgradePlan: () => dispatch(actions.upgrade()),
    selectCycle: cycle => dispatch(actions.selectCycle(cycle)),
    hideModal: () => dispatch(modalsActions.hideUpgradeModal()),
    cancelTrial: () => dispatch(actions.cancelTrial()),
    clearCardInfo: () => dispatch(actions.clearCardInfo()),
  }),
)(CreditCardForm);

export reducer, { actions, actionTypes } from './reducer';
