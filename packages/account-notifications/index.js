import { connect } from 'react-redux';
import Notifications from './components/Notifications';
import { actions } from './reducer';

export default connect(
  state => ({
    collaboration: state.accountNotifications.collaboration_notifications,
    queue: state.accountNotifications.queue_notifications,
    newsletter: state.accountNotifications.newsletter_notifications,
    milestones: state.accountNotifications.milestones_notifications,
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
