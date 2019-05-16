import { actions as appSwitcherActions } from '@bufferapp/publish-app-switcher';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { generatePreferencePageRoute } from '@bufferapp/publish-routes';
import { actions as modalActions } from '@bufferapp/publish-modals';

import AppShell from './components/AppShell';

export default connect(
  state => ({
    user: state.appShell.user,
    showReturnToClassic: state.appShell.showReturnToClassic,
    showUpgradeToPro: state.appShell.showUpgradeToPro,
  }),
  dispatch => ({
    openPreferences() {
      dispatch(
        push(
          generatePreferencePageRoute({
            preferenceId: 'general',
          }),
        ),
      );
    },
    returnToClassic() {
      dispatch(
        appSwitcherActions.displayFeedbackModal({
          source: 'app_shell',
        }),
      );
    },
    upgradeToPro() {
      dispatch(modalActions.showUpgradeModal({ source: 'app_shell' }));
    },
  }),
)(AppShell);

export reducer from './reducer';
