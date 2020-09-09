import { connect } from 'react-redux';
import Notifications from './components/Notifications';
import { actions } from './reducer';

export default connect(
  state => ({
    collaboration: state.accountNotifications.collaborationNotifications,
    queue: state.accountNotifications.queueNotifications,
    newsletter: state.accountNotifications.newsletterNotifications,
    milestones: state.accountNotifications.milestonesNotifications,
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
