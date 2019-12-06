/**
 * Component that displays visible notifications, with the ability to only
 * pay attention to a subset of notification scopes.
 *
 * Its styling can be customized at call site using either props.className or
 * props.classNames: the first to only extend the container's classname with another
 * classname, the second to extend both the container's and the notifications'
 * classnames with a map of classnames (see propTypes for shape).
 *
 * This component accepts children, which will then be used as children of the
 * individual notifications the component displays.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { NotificationTypes } from '../AppConstants';
import Notification from '../components/Notification';
import styles from './css/NotificationContainer.css';

class NotificationContainer extends React.Component {
  static propTypes = {
    visibleNotifications: PropTypes.array.isRequired,
    scope: PropTypes.string,
    notScopes: PropTypes.array,
    type: PropTypes.string,
    notTypes: PropTypes.array,
    className: PropTypes.string,
    classNames: PropTypes.shape({
      container: PropTypes.string,
      notification: PropTypes.string,
      successNotification: PropTypes.string,
      errorNotification: PropTypes.string,
      notificationCloseButton: PropTypes.string,
    }),
    style: PropTypes.object,
    showCloseIcon: PropTypes.bool,
    children: PropTypes.node,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    scope: null,
    notScopes: [],
    type: null,
    notTypes: [],
    className: null,
    classNames: {
      container: null,
      notification: null,
      successNotification: null,
      errorNotification: null,
      notificationCloseButton: null,
    },
    style: {},
    showCloseIcon: false,
    onClick: () => {},
    onClose: () => {},
  };

  render() {
    const {
      scope,
      notScopes,
      type,
      notTypes,
      className,
      classNames,
      showCloseIcon,
      children,
    } = this.props;

    let { visibleNotifications: notificationsToDisplay } = this.props;

    if (scope !== null) {
      notificationsToDisplay = notificationsToDisplay.filter(
        notif => notif.scope === scope
      );
    }

    if (notScopes.length > 0) {
      notificationsToDisplay = notificationsToDisplay.filter(
        notif => !notScopes.includes(notif.scope)
      );
    }

    if (type !== null) {
      notificationsToDisplay = notificationsToDisplay.filter(
        notif => notif.type === type
      );
    }

    if (notTypes.length > 0) {
      notificationsToDisplay = notificationsToDisplay.filter(
        notif => !notTypes.includes(notif.type)
      );
    }

    if (notificationsToDisplay.length === 0) return null;

    const containerStyles = [
      styles.notificationContainer,
      classNames.container || className,
    ].join(' ');

    const notificationClassNameMap = {
      [NotificationTypes.ERROR]: [
        classNames.notification,
        classNames.errorNotification,
      ].join(' '),

      [NotificationTypes.SUCCESS]: [
        classNames.notification,
        classNames.successNotification,
      ].join(' '),

      [NotificationTypes.INFO]: [
        classNames.notification,
        classNames.infoNotification,
      ].join(' '),
    };

    return (
      <div
        className={containerStyles}
        onClick={this.props.onClick}
        style={this.props.style}
      >
        {notificationsToDisplay.map(notif => (
          <Notification
            id={notif.id}
            type={notif.type}
            message={notif.message}
            showCloseIcon={showCloseIcon}
            showSoftAndHardCloseOptions={notif.showSoftAndHardCloseOptions}
            onClose={this.props.onClose}
            classNames={{
              notification: notificationClassNameMap[notif.type],
              closeButton: classNames.notificationCloseButton,
            }}
            cta={notif.cta}
            key={notif.id}
          >
            {children}
          </Notification>
        ))}
      </div>
    );
  }
}

export default NotificationContainer;
