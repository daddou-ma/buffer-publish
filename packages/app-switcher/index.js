import { connect } from 'react-redux';

import AppSwitcher from './components/AppSwitcher';
import { actions } from './reducer';

export default connect(
  state => ({
    showGoBackToClassic: state.appSwitcher.showGoBackToClassic,
    submittingFeedback: state.appSwitcher.submittingFeedback,
    redirecting: state.appSwitcher.redirecting,
    showFeedbackModal: state.appSwitcher.showFeedbackModal,
    source: state.appSwitcher.source,
    translations: state.i18n.translations['app-switcher'],
    hidePrompt: state.appSidebar.user.showReturnToClassic,
  }),
  dispatch => ({
    closeFeedbackModal() {
      dispatch(
        actions.closeFeedbackModal({
          source: 'app-switcher',
        })
      );
    },
    displayFeedbackModal() {
      dispatch(
        actions.displayFeedbackModal({
          source: 'app-switcher',
        })
      );
    },
    sendFeedback({ feedback, source }) {
      dispatch(actions.sendFeedback({ feedback, source }));
    },
  })
)(AppSwitcher);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
