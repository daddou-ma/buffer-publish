import React from 'react';
import PropTypes from 'prop-types';
import styles from './css/BoardCreator.css';
import AppActionCreators from '../action-creators/AppActionCreators';
import { NotificationScopes } from '../AppConstants';
import NotificationContainer from '../components/NotificationContainer';
import Input from '../components/Input';
import NotificationActionCreators from '../action-creators/NotificationActionCreators';

class BoardCreator extends React.Component {
  static propTypes = {
    subprofiles: PropTypes.array,
    profile: PropTypes.object,
    visibleNotifications: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = this.getInitialBoardCreatorState();
  }

  onSubmit = e => {
    e.preventDefault();
    const notifications = this.props.visibleNotifications.filter(
      notif => notif.scope === NotificationScopes.BOARD_CREATION
    );
    for (const notification of notifications) {
      NotificationActionCreators.removeNotification(notification.id);
    }

    const boardName = this.state.boardName;
    const profileId = this.props.profile.id;

    AppActionCreators.createNewSubprofile(profileId, boardName);

    this.setState(this.getInitialBoardCreatorState());
  };

  onChange = e => {
    this.setState({
      boardName: e.target.value,
    });
  };

  getInitialBoardCreatorState = () => ({
    boardName: '',
  });

  render() {
    const isSubprofileCreationPending = this.props.profile.appState
      .isSubprofileCreationPending;
    const isBoardNameEmpty = this.state.boardName.length === 0;

    const isDisabled = isBoardNameEmpty || isSubprofileCreationPending;
    const submitButtonLabel = isSubprofileCreationPending
      ? 'Creating…'
      : 'Create';

    const submitButtonClassName = isDisabled
      ? styles.disabledCreateButton
      : styles.createBoardButton;

    const visibileNotificationsForProfile = this.props.visibleNotifications.filter(
      notif => notif.data.profileId === this.props.profile.id
    );

    return (
      <div className={styles.createNewBoard}>
        <form onSubmit={this.onSubmit} className={styles.createBoardForm}>
          <Input
            value={this.state.boardName}
            placeholder="New board name"
            className={styles.newBoardName}
            onChange={this.onChange}
          />
          <Input
            type="submit"
            value={submitButtonLabel}
            className={submitButtonClassName}
            disabled={isDisabled}
          />
        </form>
        <NotificationContainer
          visibleNotifications={visibileNotificationsForProfile}
          scope={NotificationScopes.BOARD_CREATION}
        />
      </div>
    );
  }
}

export default BoardCreator;
