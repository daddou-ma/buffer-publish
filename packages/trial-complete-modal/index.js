import { connect } from 'react-redux';

import TrialCompleteModal from './components/TrialCompleteModal';
import { actions } from './reducer';

export default connect(
  state => ({
    translations: state.i18n.translations['trial-complete-modal'],
    hasExpiredBusinessTrial: state.trialCompleteModal.hasExpiredBusinessTrial,
    hasExpiredProTrial: state.trialCompleteModal.hasExpiredProTrial,
    isPremiumBusiness: state.trialCompleteModal.isPremiumBusiness,
  }),
  dispatch => ({
    cancelTrial: () => dispatch(actions.cancelTrial()),
    completeAndUpgrade: () => dispatch(actions.completeAndUpgrade()),
  })
)(TrialCompleteModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
