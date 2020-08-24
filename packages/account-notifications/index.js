import { connect } from 'react-redux';
import Notifications from './components/Notifications';
import { actions } from './reducer';

export default connect(
  state => ({
    collaboration: state.accountNotifications.collaboration,
    queue: state.accountNotifications.queue,
    newsletter: state.accountNotifications.newsletter,
    milestones: state.accountNotifications.milestones,
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
