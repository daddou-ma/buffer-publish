import { connect } from 'react-redux';

import ThirdParty from './components/Loader';

export default connect(state => {
  const { modals } = state;

  const modalsShowing =
    modals &&
    (modals.showProfilesDisconnectedModal ||
      modals.showSwitchPlanModal ||
      modals.showWelcomeModal ||
      modals.showInstagramFirstCommentModal ||
      modals.showWelcomePaidModal ||
      modals.showWelcomeB4BTrialModal ||
      modals.showInstagramDirectPostingModal ||
      modals.showStealProfileModal ||
      modals.showTrialCompleteModal ||
      modals.showInstagramFirstCommentProTrialModal ||
      modals.showCloseComposerConfirmationModal);
  return {
    appCues: state.thirdparty.appCues,
    intercom: state.thirdparty.intercom,
    helpScoutBeacon: state.thirdparty.helpScoutBeacon,
    modalsShowing,
    userId:
      state.appSidebar && state.appSidebar.user && state.appSidebar.user.id,
  };
})(ThirdParty);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
