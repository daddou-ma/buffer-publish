import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';

import UpgradeModal from './components/UpgradeModal';
import { actions } from './reducer';

export default connect(
  state => ({
    cycle: state.upgradeModal.cycle,
    card: state.upgradeModal.card,
    dismissible: state.upgradeModal.dismissible,
    translations: state.i18n.translations['upgrade-modal'],
    validating: state.stripe.validating,
    isNonprofit: state.appSidebar.user.isNonprofit,
    hasExpiredProTrial: state.appSidebar.user.shouldShowProTrialExpiredModal,
  }),
  dispatch => ({
    storeValue: (id, value) => dispatch(actions.storeValue(id, value)),
    upgradePlan: () => dispatch(actions.upgrade()),
    selectCycle: cycle => dispatch(actions.selectCycle(cycle)),
    hideModal: () => dispatch(modalsActions.hideUpgradeModal()),
    cancelTrial: () => dispatch(actions.cancelTrial()),
    clearCardInfo: () => dispatch(actions.clearCardInfo()),
  }),
)(UpgradeModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
