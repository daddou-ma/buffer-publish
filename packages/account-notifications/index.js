import { connect } from 'react-redux';
import Notifications from './components/Notifications';
import { actions } from './reducer';

export default connect(
  state => ({
    bufferEmptyEnabled: state.appSidebar.user.hasEmailNotifications.bufferEmpty,
    bufferTipsEnabled: state.appSidebar.user.hasEmailNotifications.bufferTips,
    celebrationsEnabled: state.appSidebar.user.hasEmailNotifications.celebrations,
    updateSuccessesEnabled: state.appSidebar.user.hasEmailNotifications.updateSuccesses,
    weeklyDigestsEnabled: state.appSidebar.user.hasEmailNotifications.weeklyDigests,
    updateFailuresEnabled: state.appSidebar.user.hasEmailNotifications.updateFailures,
    newContributionsEnabled: state.appSidebar.user.hasEmailNotifications.newContributions,
    postMovedDraftsEnabled: state.appSidebar.user.hasEmailNotifications.postMovedBackToDrafts,
  }),
  dispatch => ({
    onToggleClick: (newToggleValue, type) => {
      dispatch(actions.handleToggleClick({
        notifications: {
          [type]: newToggleValue,
        },
      }));
    },
  }),
)(Notifications);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
