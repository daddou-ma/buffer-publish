import { connect } from 'react-redux';

import B4bTrialCompleteModal from './components/B4bTrialCompleteModal';
import { actions } from './reducer';

export default connect(
  state => ({
    translations: state.i18n.translations['b4b-trial-complete-modal'],
    hasExpiredBusinessTrial: state.appSidebar.user.shouldShowBusinessTrialExpiredModal,
  }),
  dispatch => ({
    cancelTrial: () => dispatch(actions.cancelTrial()),
  }),
)(B4bTrialCompleteModal);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
