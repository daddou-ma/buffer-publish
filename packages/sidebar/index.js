import { connect } from 'react-redux';
import { actions as appSwitcherActions } from '@bufferapp/publish-app-switcher';

import Sidebar from './components/Sidebar';

export default connect(
  state => ({
    userFeatures: state.appSidebar.user.features,
  }),
  dispatch => ({
    onReturnToClassicClick() {
      dispatch(
        appSwitcherActions.displayFeedbackModal({
          source: 'publish_sidebar',
        })
      );
    },
  })
)(Sidebar);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
