import { connect } from 'react-redux';
import Notifications from './components/Notifications';
import { actions } from './reducer';

export default connect(
  state => ({
    bufferEmpty: state.accountNotifications.bufferEmpty,
    bufferTips: state.accountNotifications.bufferTips,
    celebrations: state.accountNotifications.celebrations,
    updateSuccesses: state.accountNotifications.updateSuccesses,
    weeklyDigests: state.accountNotifications.weeklyDigests,
    updateFailures: state.accountNotifications.updateFailures,
    newContributions: state.accountNotifications.newContributions,
    postMovedBackToDrafts: state.accountNotifications.postMovedBackToDrafts,
  }),
  dispatch => ({
    onToggleClick: (newToggleValue, type) => {
      dispatch(
        actions.handleToggleClick({
          notifications: {
            [type]: newToggleValue,
          },
        })
      );
    },
  })
)(Notifications);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
