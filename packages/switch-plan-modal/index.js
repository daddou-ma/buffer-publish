import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals';
import { actions as stripeActions } from '@bufferapp/stripe';

import SwitchPlanModal from './components/SwitchPlanModal';
import { actions } from './reducer';

export default connect(
  state => ({
    plan: state.switchPlanModal.plan,
    cycle: state.switchPlanModal.cycle,
    card: state.switchPlanModal.card,
    dismissible: state.switchPlanModal.dismissible,
    translations: state.i18n.translations['switch-plan-modal'],
    validating: state.stripe.validating,
    isNonprofit: state.appSidebar.user.isNonprofit,
    hasExpiredProTrial: state.appSidebar.user.shouldShowProTrialExpiredModal,
    setupIntentClientSecret: state.stripe.setupIntentClientSecret,
  }),
  dispatch => ({
    storeValue: (id, value) => dispatch(actions.storeValue(id, value)),
    upgradePlan: () => dispatch(actions.upgrade()),
    selectCycle: cycle => dispatch(actions.selectCycle(cycle)),
    hideModal: () => dispatch(modalsActions.hideUpgradeModal()),
    cancelTrial: () => dispatch(actions.cancelTrial()),
    clearCardInfo: () => dispatch(actions.clearCardInfo()),
    handleCardSetupRequest: () => dispatch(stripeActions.handleCardSetupRequest()),
    handleCardSetupSuccess: options => dispatch(stripeActions.handleCardSetupSuccess(options)),
    handleCardSetupError: error => dispatch(stripeActions.handleCardSetupError(error)),
  }),
)(SwitchPlanModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
