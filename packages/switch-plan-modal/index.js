import { connect } from 'react-redux';
import { actions as modalsActions } from '@bufferapp/publish-modals/reducer';
import { actions as stripeActions } from '@bufferapp/stripe/reducer';

import SwitchPlanModal from './components/SwitchPlanModal';
import { actions } from './reducer';

export default connect(
  state => ({
    plan: state.switchPlanModal.plan,
    cycle: state.switchPlanModal.cycle,
    card: state.switchPlanModal.card,
    source: state.switchPlanModal.source,
    isPromo: state.switchPlanModal.isPromo,
    dismissible: state.switchPlanModal.dismissible,
    translations: state.i18n.translations['switch-plan-modal'],
    validating: state.stripe.validating,
    isNonprofit: state.user.isNonprofit,
    hasExpiredProTrial: state.user.shouldShowProTrialExpiredModal,
    setupIntentClientSecret: state.stripe.setupIntentClientSecret,
  }),
  dispatch => ({
    storeValue: (id, value) => dispatch(actions.storeValue(id, value)),
    selectCycle: cycle => dispatch(actions.selectCycle(cycle)),
    hideModal: () => dispatch(modalsActions.hideUpgradeModal()),
    cancelTrial: () => dispatch(actions.cancelTrial()),
    clearCardInfo: () => dispatch(actions.clearCardInfo()),
    handleCardSetupRequest: (stripe, setupIntentClientSecret, source, plan, cycle) =>
      dispatch(stripeActions.handleCardSetupRequest(stripe, setupIntentClientSecret, source, plan, cycle)),
  }),
)(SwitchPlanModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
